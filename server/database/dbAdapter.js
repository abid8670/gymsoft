import pg from 'pg';
import mysql from 'mysql2/promise';
import path from 'node:path';
import fs from 'node:fs';

const { Pool: PgPool } = pg;

class MultiDbAdapter {
  constructor() {
    this.type = 'sqlite'; // 'sqlite' | 'mysql' | 'postgres' | 'neon_postgres'
    this.sqliteDb = null;
    this.pgPool = null;
    this.mysqlPool = null;
    this.initialized = false;
  }

  detectDbType(connectionUrl = process.env.DATABASE_URL, explicitType = process.env.DB_TYPE) {
    if (explicitType) {
      const lower = explicitType.toLowerCase().trim();
      if (lower === 'mysql') return 'mysql';
      if (lower === 'postgres' || lower === 'postgresql' || lower === 'neon') {
        return connectionUrl?.includes('neon.tech') ? 'neon_postgres' : 'postgres';
      }
      if (lower === 'sqlite') return 'sqlite';
    }

    if (connectionUrl) {
      const trimmed = connectionUrl.trim().toLowerCase();
      if (trimmed.startsWith('postgres://') || trimmed.startsWith('postgresql://')) {
        return trimmed.includes('neon.tech') ? 'neon_postgres' : 'postgres';
      }
      if (trimmed.startsWith('mysql://')) {
        return 'mysql';
      }
    }

    return 'sqlite';
  }

  async connect(connectionUrl = process.env.DATABASE_URL, explicitType = process.env.DB_TYPE) {
    this.type = this.detectDbType(connectionUrl, explicitType);
    console.log(`[MultiDB] Initializing database engine: ${this.type.toUpperCase()}`);

    if (this.type === 'neon_postgres' || this.type === 'postgres') {
      try {
        const isNeon = this.type === 'neon_postgres' || (connectionUrl && connectionUrl.includes('neon.tech'));
        this.pgPool = new PgPool({
          connectionString: connectionUrl,
          ssl: isNeon || connectionUrl?.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
          max: 10,
          idleTimeoutMillis: 30000,
        });

        // Test connection
        const client = await this.pgPool.connect();
        const res = await client.query('SELECT NOW() AS current_time');
        client.release();
        console.log(`[MultiDB] PostgreSQL/Neon connected successfully at: ${res.rows[0].current_time}`);
      } catch (err) {
        console.error(`[MultiDB] Failed to connect to PostgreSQL/Neon:`, err.message);
        console.warn(`[MultiDB] Falling back to SQLite local storage.`);
        this.type = 'sqlite';
      }
    }

    if (this.type === 'mysql') {
      try {
        this.mysqlPool = mysql.createPool({
          uri: connectionUrl,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });

        // Test connection
        const [rows] = await this.mysqlPool.query('SELECT NOW() AS current_time');
        console.log(`[MultiDB] MySQL connected successfully at: ${rows[0].current_time}`);
      } catch (err) {
        console.error(`[MultiDB] Failed to connect to MySQL:`, err.message);
        console.warn(`[MultiDB] Falling back to SQLite local storage.`);
        this.type = 'sqlite';
      }
    }

    if (this.type === 'sqlite') {
      const sqlitePath = process.env.SQLITE_FILE || path.join(process.cwd(), 'gymsoft.db');
      const dir = path.dirname(sqlitePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const { DatabaseSync } = await import('node:sqlite');
      this.sqliteDb = new DatabaseSync(sqlitePath);
      console.log(`[MultiDB] Local SQLite connected file: ${sqlitePath}`);
    }

    await this.initSchema();
    this.initialized = true;
    return this.type;
  }

  // Translates standard '?' placeholders to PostgreSQL '$1, $2, ...'
  formatQuery(sql) {
    if (this.type === 'postgres' || this.type === 'neon_postgres') {
      let index = 1;
      return sql.replace(/\?/g, () => `$${index++}`);
    }
    return sql;
  }

  async query(sql, params = []) {
    const formattedSql = this.formatQuery(sql);

    if (this.type === 'postgres' || this.type === 'neon_postgres') {
      const res = await this.pgPool.query(formattedSql, params);
      return res.rows;
    }

    if (this.type === 'mysql') {
      const [rows] = await this.mysqlPool.query(formattedSql, params);
      return rows;
    }

    // SQLite
    const stmt = this.sqliteDb.prepare(formattedSql);
    return stmt.all(...params);
  }

  async execute(sql, params = []) {
    const formattedSql = this.formatQuery(sql);

    if (this.type === 'postgres' || this.type === 'neon_postgres') {
      const res = await this.pgPool.query(formattedSql, params);
      return { rowCount: res.rowCount };
    }

    if (this.type === 'mysql') {
      const [result] = await this.mysqlPool.execute(formattedSql, params);
      return { affectedRows: result.affectedRows, insertId: result.insertId };
    }

    // SQLite
    const stmt = this.sqliteDb.prepare(formattedSql);
    return stmt.run(...params);
  }

  // Generic DB Helper: Find by Table and Condition
  async findAll(table, whereClause = '', params = [], orderBy = '') {
    let sql = `SELECT * FROM ${table}`;
    if (whereClause) sql += ` WHERE ${whereClause}`;
    if (orderBy) sql += ` ORDER BY ${orderBy}`;
    return this.query(sql, params);
  }

  async findById(table, id) {
    const rows = await this.query(`SELECT * FROM ${table} WHERE id = ? LIMIT 1`, [id]);
    return rows && rows.length > 0 ? rows[0] : null;
  }

  async insert(table, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
    await this.execute(sql, values);
    return data;
  }

  async update(table, id, data) {
    const keys = Object.keys(data).filter(k => k !== 'id');
    const values = keys.map(k => data[k]);
    values.push(id);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const sql = `UPDATE ${table} SET ${setClause} WHERE id = ?`;
    await this.execute(sql, values);
    return this.findById(table, id);
  }

  async delete(table, id) {
    await this.execute(`DELETE FROM ${table} WHERE id = ?`, [id]);
    return true;
  }

  // Schema creation across SQLite, MySQL, and PostgreSQL
  async initSchema() {
    const isPg = this.type === 'postgres' || this.type === 'neon_postgres';
    const isMysql = this.type === 'mysql';

    const textType = isMysql ? 'TEXT' : 'TEXT';
    const idType = isMysql ? 'VARCHAR(128) PRIMARY KEY' : (isPg ? 'VARCHAR(128) PRIMARY KEY' : 'TEXT PRIMARY KEY');
    const realType = isMysql ? 'DOUBLE' : (isPg ? 'DOUBLE PRECISION' : 'REAL');
    const intType = isMysql ? 'INT' : (isPg ? 'INTEGER' : 'INTEGER');
    const boolType = isMysql ? 'TINYINT(1)' : (isPg ? 'BOOLEAN' : 'INTEGER');

    const tables = [
      `CREATE TABLE IF NOT EXISTS users (
        id ${idType},
        name ${textType},
        email ${textType},
        username ${textType},
        phone ${textType},
        password ${textType},
        business_name ${textType},
        business_type ${textType},
        city ${textType},
        currency ${textType},
        is_trial ${boolType},
        is_superadmin ${boolType},
        trial_days_left ${intType},
        plan ${textType},
        role ${textType},
        created_at ${textType}
      )`,

      `CREATE TABLE IF NOT EXISTS clubs (
        id ${idType},
        name ${textType},
        type ${textType},
        city ${textType},
        location ${textType},
        owner_name ${textType},
        owner_phone ${textType},
        active_members ${intType},
        monthly_revenue ${realType},
        status ${textType},
        plan ${textType},
        trial_days_left ${intType},
        joined_date ${textType}
      )`,

      `CREATE TABLE IF NOT EXISTS staff (
        id ${idType},
        name ${textType},
        role ${textType},
        title ${textType},
        phone ${textType},
        email ${textType},
        password ${textType},
        club_name ${textType},
        base_salary ${realType},
        commission_rate ${realType},
        services_completed ${intType},
        commission_earned ${realType},
        rating ${realType},
        status ${textType},
        approved_by ${textType},
        created_at ${textType}
      )`,

      `CREATE TABLE IF NOT EXISTS members (
        id ${idType},
        name ${textType},
        phone ${textType},
        email ${textType},
        plan ${textType},
        status ${textType},
        join_date ${textType},
        expiry_date ${textType},
        photo ${textType},
        gender ${textType},
        club_id ${textType},
        created_at ${textType}
      )`,

      `CREATE TABLE IF NOT EXISTS appointments (
        id ${idType},
        client_name ${textType},
        client_phone ${textType},
        service_name ${textType},
        stylist_name ${textType},
        date ${textType},
        time ${textType},
        status ${textType},
        price ${realType},
        notes ${textType},
        club_id ${textType}
      )`,

      `CREATE TABLE IF NOT EXISTS invoices (
        id ${idType},
        invoice_number ${textType},
        member_name ${textType},
        plan ${textType},
        amount ${realType},
        discount ${realType},
        net_amount ${realType},
        payment_method ${textType},
        date ${textType},
        status ${textType},
        club_id ${textType}
      )`,

      `CREATE TABLE IF NOT EXISTS products (
        id ${idType},
        name ${textType},
        category ${textType},
        price ${realType},
        cost ${realType},
        stock ${intType},
        sku ${textType},
        barcode ${textType},
        club_id ${textType}
      )`,

      `CREATE TABLE IF NOT EXISTS expenses (
        id ${idType},
        title ${textType},
        category ${textType},
        amount ${realType},
        date ${textType},
        payment_method ${textType},
        notes ${textType},
        club_id ${textType}
      )`,

      `CREATE TABLE IF NOT EXISTS activity_logs (
        id ${idType},
        type ${textType},
        title ${textType},
        detail ${textType},
        actor ${textType},
        timestamp ${textType}
      )`,

      `CREATE TABLE IF NOT EXISTS system_settings (
        setting_key ${idType},
        setting_value ${textType},
        updated_at ${textType}
      )`
    ];

    for (const sql of tables) {
      if (this.type === 'postgres' || this.type === 'neon_postgres') {
        await this.pgPool.query(sql);
      } else if (this.type === 'mysql') {
        await this.mysqlPool.query(sql);
      } else {
        this.sqliteDb.exec(sql);
      }
    }

    await this.seedInitialData();
  }

  async seedInitialData() {
    const existingUsers = await this.query('SELECT id FROM users WHERE role = ? LIMIT 1', ['superadmin']);
    if (!existingUsers || existingUsers.length === 0) {
      console.log(`[MultiDB] Seeding default Super Admin and Starter Clubs into ${this.type}...`);
      
      await this.insert('users', {
        id: 'usr-superadmin',
        name: 'Chief Super Admin (SaaS HQ)',
        email: 'admin@zenithsoft.cloud',
        username: 'admin',
        phone: '+92 300 0000000',
        password: 'admin',
        business_name: 'ZenithSoft Global SaaS HQ',
        business_type: 'hybrid',
        city: 'Global Headquarters',
        currency: 'USD',
        is_trial: 0,
        is_superadmin: 1,
        trial_days_left: 0,
        plan: 'Super Admin Master Access',
        role: 'superadmin',
        created_at: new Date().toISOString(),
      });

      await this.insert('clubs', {
        id: 'club-1',
        name: 'Zenith Glow & Fitness Club',
        type: 'hybrid',
        city: 'Lahore',
        location: 'Gulberg III, Main Boulevard',
        owner_name: 'Malik Zeeshan',
        owner_phone: '+92 300 8472910',
        active_members: 320,
        monthly_revenue: 12800,
        status: 'trial',
        plan: '1-Month Free Starter',
        trial_days_left: 30,
        joined_date: new Date().toISOString().split('T')[0],
      });

      await this.insert('clubs', {
        id: 'club-2',
        name: 'Luxe Beauty Lounge & Spa',
        type: 'salon',
        city: 'Karachi',
        location: 'Clifton Block 4',
        owner_name: 'Sara Khan',
        owner_phone: '+92 321 8847120',
        active_members: 195,
        monthly_revenue: 9800,
        status: 'trial',
        plan: '1-Month Free Starter',
        trial_days_left: 24,
        joined_date: new Date().toISOString().split('T')[0],
      });

      await this.insert('staff', {
        id: 'st-1',
        name: 'Natasha (Master Stylist)',
        role: 'stylist',
        title: 'Senior Hair Stylist',
        phone: '+92 321 4455667',
        email: 'natasha@zenith.com',
        password: 'staff123',
        club_name: 'Zenith Glow & Fitness Club',
        base_salary: 600,
        commission_rate: 20,
        services_completed: 42,
        commission_earned: 294,
        rating: 4.9,
        status: 'active',
        approved_by: 'Super Admin',
        created_at: new Date().toISOString().split('T')[0],
      });

      await this.insert('staff', {
        id: 'st-2',
        name: 'Farhan Ali (Pro PT)',
        role: 'trainer',
        title: 'Head Fitness Coach',
        phone: '+92 300 9988776',
        email: 'farhan@zenith.com',
        password: 'staff123',
        club_name: 'Zenith Glow & Fitness Club',
        base_salary: 750,
        commission_rate: 25,
        services_completed: 34,
        commission_earned: 850,
        rating: 4.9,
        status: 'active',
        approved_by: 'Super Admin',
        created_at: new Date().toISOString().split('T')[0],
      });

      console.log(`[MultiDB] Seed completed for ${this.type}.`);
    }
  }

  async getHealth() {
    const startTime = Date.now();
    let pingOk = false;
    let error = null;

    try {
      if (this.type === 'postgres' || this.type === 'neon_postgres') {
        await this.pgPool.query('SELECT 1');
      } else if (this.type === 'mysql') {
        await this.mysqlPool.query('SELECT 1');
      } else if (this.type === 'sqlite') {
        this.sqliteDb.prepare('SELECT 1').all();
      }
      pingOk = true;
    } catch (e) {
      error = e.message;
    }

    return {
      status: pingOk ? 'healthy' : 'degraded',
      dbType: this.type,
      pingMs: Date.now() - startTime,
      databaseUrlConfigured: Boolean(process.env.DATABASE_URL),
      error,
    };
  }
}

export const dbAdapter = new MultiDbAdapter();
export default dbAdapter;
