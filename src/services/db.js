/**
 * ZenithSoft Centralized Database Service (db.js)
 * High-performance, robust, persistent storage layer for multi-tenant SaaS.
 * Manages Users, Sessions, Multi-Club Directory, Staff Credentials & Approvals,
 * Clients, Appointments, Invoices, Retail Inventory, Expenses, and Audit Logs.
 */

const DB_PREFIX = 'zenith_db_';

const KEYS = {
  SESSION: `${DB_PREFIX}session`,
  USERS: `${DB_PREFIX}users`,
  CLUBS: `${DB_PREFIX}clubs`,
  STAFF: `${DB_PREFIX}staff`,
  MEMBERS: `${DB_PREFIX}members`,
  PLANS: `${DB_PREFIX}plans`,
  SERVICES: `${DB_PREFIX}services`,
  APPOINTMENTS: `${DB_PREFIX}appointments`,
  PRODUCTS: `${DB_PREFIX}products`,
  INVOICES: `${DB_PREFIX}invoices`,
  CHECKINS: `${DB_PREFIX}checkins`,
  EXPENSES: `${DB_PREFIX}expenses`,
  LOGS: `${DB_PREFIX}activity_logs`,
  PROFILE: `${DB_PREFIX}club_profile`,
  BUSINESS_MODE: `${DB_PREFIX}business_mode`,
  WHATSAPP: `${DB_PREFIX}whatsapp_config`,
  INITIALIZED: `${DB_PREFIX}initialized_v2`,
};

// ================= INITIAL SEED DATA =================

export const SEED_USERS = [
  {
    id: 'usr-superadmin',
    name: 'Chief Super Admin (SaaS HQ)',
    email: 'admin@zenithsoft.cloud',
    username: 'admin',
    phone: '+92 300 0000000',
    password: 'admin',
    businessName: 'ZenithSoft Global SaaS HQ',
    businessType: 'hybrid',
    city: 'Global Headquarters',
    currency: 'USD',
    isTrial: false,
    isSuperAdmin: true,
    plan: 'Super Admin Master Access',
    role: 'superadmin',
    createdAt: '2026-09-01',
  },
  {
    id: 'usr-owner-1',
    name: 'Malik Zeeshan (Owner)',
    email: 'owner@zenithwellness.fit',
    phone: '+92 300 8472910',
    password: '123',
    businessName: 'Zenith Glow & Fitness Club',
    businessType: 'hybrid',
    city: 'Lahore',
    currency: 'USD',
    isTrial: true,
    trialDaysLeft: 30,
    plan: '1-Month Free Starter',
    role: 'owner',
    createdAt: '2026-10-01',
  },
  {
    id: 'usr-owner-2',
    name: 'Sara Khan (Salon Owner)',
    email: 'salon@zenith.com',
    phone: '+92 321 8847120',
    password: '123',
    businessName: 'Luxe Glow Beauty Salon & Spa',
    businessType: 'salon',
    city: 'Karachi',
    currency: 'USD',
    isTrial: true,
    trialDaysLeft: 24,
    plan: '1-Month Free Starter',
    role: 'owner',
    createdAt: '2026-09-18',
  },
  {
    id: 'usr-owner-3',
    name: 'Tariq Mehmood (Gym Owner)',
    email: 'gym@zenith.com',
    phone: '+92 300 4567891',
    password: '123',
    businessName: 'Iron & Muscle Fitness Gym',
    businessType: 'gym',
    city: 'Islamabad',
    currency: 'USD',
    isTrial: false,
    plan: 'Pro Lifetime ($1/client)',
    role: 'owner',
    createdAt: '2026-08-10',
  },
];

export const SEED_CLUBS = [
  {
    id: 'club-1',
    name: 'Zenith Glow & Fitness Club',
    type: 'hybrid',
    city: 'Lahore',
    location: 'Gulberg III, Main Boulevard',
    ownerName: 'Malik Zeeshan',
    ownerPhone: '+92 300 8472910',
    activeMembers: 320,
    monthlyRevenue: 12800,
    status: 'trial',
    plan: '1-Month Free Starter',
    trialDaysLeft: 30,
    joinedDate: '2026-10-01',
  },
  {
    id: 'club-2',
    name: 'Luxe Beauty Lounge & Spa',
    type: 'salon',
    city: 'Karachi',
    location: 'Clifton Block 4',
    ownerName: 'Sara Khan',
    ownerPhone: '+92 321 8847120',
    activeMembers: 195,
    monthlyRevenue: 9800,
    status: 'trial',
    plan: '1-Month Free Starter',
    trialDaysLeft: 24,
    joinedDate: '2026-09-18',
  },
  {
    id: 'club-3',
    name: 'Iron & Muscle Fitness Gym',
    type: 'gym',
    city: 'Islamabad',
    location: 'F-7/2, Markaz',
    ownerName: 'Tariq Mehmood',
    ownerPhone: '+92 300 4567891',
    activeMembers: 240,
    monthlyRevenue: 8500,
    status: 'pro',
    plan: 'Pro Lifetime ($1/client)',
    trialDaysLeft: null,
    joinedDate: '2026-08-10',
  },
];

export const SEED_STAFF = [
  {
    id: 'st-1',
    name: 'Natasha (Master Stylist)',
    role: 'stylist',
    title: 'Senior Hair Stylist',
    phone: '+92 321 4455667',
    email: 'natasha@zenith.com',
    password: 'staff123',
    clubName: 'Zenith Glow & Fitness Club',
    baseSalary: 600,
    commissionRate: 20,
    servicesCompletedThisMonth: 42,
    commissionEarned: 294,
    rating: 4.9,
    status: 'active',
    approvedBy: 'Super Admin',
    createdAt: '2026-10-01',
  },
  {
    id: 'st-2',
    name: 'Farhan Ali (Pro PT)',
    role: 'trainer',
    title: 'Head Fitness Coach',
    phone: '+92 300 9988776',
    email: 'farhan@zenith.com',
    password: 'staff123',
    clubName: 'Zenith Glow & Fitness Club',
    baseSalary: 750,
    commissionRate: 25,
    servicesCompletedThisMonth: 34,
    commissionEarned: 850,
    rating: 4.9,
    status: 'active',
    approvedBy: 'Super Admin',
    createdAt: '2026-10-02',
  },
  {
    id: 'st-3',
    name: 'Dr. Hina (Skin Specialist)',
    role: 'stylist',
    title: 'Aesthetician / HydraFacial',
    phone: '+92 333 1122334',
    email: 'hina@zenith.com',
    password: 'staff123',
    clubName: 'Luxe Beauty Lounge & Spa',
    baseSalary: 650,
    commissionRate: 25,
    servicesCompletedThisMonth: 38,
    commissionEarned: 570,
    rating: 5.0,
    status: 'active',
    approvedBy: 'Super Admin',
    createdAt: '2026-10-03',
  },
  {
    id: 'st-4',
    name: 'Zeeshan Qureshi',
    role: 'counter',
    title: 'Front Desk Receptionist',
    phone: '+92 301 7766554',
    email: 'zeeshan@zenith.com',
    password: 'staff123',
    clubName: 'Zenith Glow & Fitness Club',
    baseSalary: 400,
    commissionRate: 5,
    servicesCompletedThisMonth: 0,
    commissionEarned: 0,
    rating: 4.8,
    status: 'pending_approval',
    approvedBy: null,
    createdAt: '2026-10-09',
  },
  {
    id: 'st-5',
    name: 'Komal Rizvi',
    role: 'stylist',
    title: 'Junior Hair Stylist',
    phone: '+92 345 6677889',
    email: 'komal@luxe.com',
    password: 'staff123',
    clubName: 'Luxe Beauty Lounge & Spa',
    baseSalary: 350,
    commissionRate: 15,
    servicesCompletedThisMonth: 0,
    commissionEarned: 0,
    rating: 4.7,
    status: 'pending_approval',
    approvedBy: null,
    createdAt: '2026-10-10',
  },
];

// Helper for safe JSON read
function safeRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`[DB] Error parsing key ${key}:`, err);
    return fallback;
  }
}

// Helper for safe JSON write
function safeWrite(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(`[DB] Error writing key ${key}:`, err);
    return false;
  }
}

/**
 * Initialize Database Collections if first run or upgraded
 */
export function initDatabase() {
  const isInitialized = localStorage.getItem(KEYS.INITIALIZED);
  if (!isInitialized) {
    if (!localStorage.getItem(KEYS.USERS)) {
      safeWrite(KEYS.USERS, SEED_USERS);
    }
    if (!localStorage.getItem(KEYS.CLUBS)) {
      safeWrite(KEYS.CLUBS, SEED_CLUBS);
    }
    if (!localStorage.getItem(KEYS.STAFF)) {
      safeWrite(KEYS.STAFF, SEED_STAFF);
    }
    localStorage.setItem(KEYS.INITIALIZED, 'true');
    console.log('[Zenith DB] Database initialized with production seed collections.');
  }

  // Ensure superadmin in stored USERS has username: 'admin' and valid password
  const currentUsers = safeRead(KEYS.USERS, []);
  if (Array.isArray(currentUsers) && currentUsers.length > 0) {
    let updated = false;
    const syncedUsers = currentUsers.map(u => {
      if (u.role === 'superadmin' || u.id === 'usr-superadmin') {
        if (u.username !== 'admin' || !u.password) {
          updated = true;
          return { ...u, username: 'admin', password: u.password || 'admin' };
        }
      }
      return u;
    });
    if (updated) {
      safeWrite(KEYS.USERS, syncedUsers);
    }
  }
}

// Ensure database initialization happens immediately upon import
initDatabase();

export const db = {
  // ================= SESSION & AUTH =================
  getSession: () => {
    return safeRead(KEYS.SESSION, { user: null, view: 'landing', activeRole: 'owner' });
  },

  setSession: (user, view = 'dashboard', activeRole = 'owner') => {
    const session = {
      user: user || null,
      view: user ? view : 'landing',
      activeRole: user ? (user.role || activeRole) : 'owner',
      lastActive: Date.now(),
    };
    safeWrite(KEYS.SESSION, session);
    // Legacy support for backward compatibility if any component reads this
    if (user) {
      safeWrite('gymsoft_current_user', user);
    } else {
      localStorage.removeItem('gymsoft_current_user');
    }
    return session;
  },

  updateSessionView: (view) => {
    const session = db.getSession();
    if (session && session.user) {
      session.view = view;
      session.lastActive = Date.now();
      safeWrite(KEYS.SESSION, session);
    }
  },

  updateSessionRole: (role) => {
    const session = db.getSession();
    if (session) {
      session.activeRole = role;
      safeWrite(KEYS.SESSION, session);
    }
  },

  clearSession: () => {
    const emptySession = { user: null, view: 'landing', activeRole: 'owner' };
    safeWrite(KEYS.SESSION, emptySession);
    localStorage.removeItem('gymsoft_current_user');
    return emptySession;
  },

  // ================= USERS =================
  getUsers: () => safeRead(KEYS.USERS, SEED_USERS),
  
  saveUsers: (users) => safeWrite(KEYS.USERS, users),

  findUserByIdentifier: (identifier) => {
    if (!identifier) return null;
    const clean = identifier.trim().toLowerCase();
    const cleanDigits = clean.replace(/[^0-9]/g, '');
    const users = db.getUsers();
    return users.find(u => {
      const usernameMatch = u.username && u.username.toLowerCase() === clean;
      const emailMatch = u.email && u.email.toLowerCase() === clean;
      const phoneMatch = cleanDigits && u.phone && u.phone.replace(/[^0-9]/g, '').includes(cleanDigits);
      return usernameMatch || emailMatch || phoneMatch;
    });
  },

  addUser: (userData) => {
    const users = db.getUsers();
    const newUser = {
      id: userData.id || `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...userData,
    };
    users.unshift(newUser);
    db.saveUsers(users);
    return newUser;
  },

  // ================= CLUBS =================
  getClubs: () => safeRead(KEYS.CLUBS, SEED_CLUBS),
  
  saveClubs: (clubs) => safeWrite(KEYS.CLUBS, clubs),

  addClub: (clubData) => {
    const clubs = db.getClubs();
    const newClub = {
      id: clubData.id || `club-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      activeMembers: 0,
      monthlyRevenue: 0,
      status: 'trial',
      plan: '1-Month Free Starter',
      trialDaysLeft: 30,
      ...clubData,
    };
    clubs.unshift(newClub);
    db.saveClubs(clubs);
    return newClub;
  },

  updateClub: (clubId, updates) => {
    const clubs = db.getClubs().map(c => c.id === clubId ? { ...c, ...updates } : c);
    db.saveClubs(clubs);
    return clubs;
  },

  deleteClub: (clubId) => {
    const clubs = db.getClubs().filter(c => c.id !== clubId);
    db.saveClubs(clubs);
    return clubs;
  },

  // ================= STAFF =================
  getStaff: () => safeRead(KEYS.STAFF, SEED_STAFF),

  saveStaff: (staffList) => safeWrite(KEYS.STAFF, staffList),

  addStaff: (staffData) => {
    const staffList = db.getStaff();
    const newStaff = {
      id: staffData.id || `st-${Date.now()}`,
      status: 'pending_approval',
      active: false,
      approvedBy: null,
      createdAt: new Date().toISOString().split('T')[0],
      rating: 5.0,
      servicesCompletedThisMonth: 0,
      commissionEarned: 0,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      ...staffData,
    };
    staffList.unshift(newStaff);
    db.saveStaff(staffList);
    return newStaff;
  },

  approveStaff: (staffId) => {
    const staffList = db.getStaff().map(s => {
      if (s.id === staffId) {
        return {
          ...s,
          status: 'active',
          active: true,
          approvedBy: 'Super Admin',
          approvedAt: new Date().toISOString().split('T')[0],
        };
      }
      return s;
    });
    db.saveStaff(staffList);
    return staffList;
  },

  rejectStaff: (staffId) => {
    const staffList = db.getStaff().map(s => {
      if (s.id === staffId) {
        return {
          ...s,
          status: 'rejected',
          active: false,
          approvedBy: 'Rejected by Super Admin',
          rejectedAt: new Date().toISOString().split('T')[0],
        };
      }
      return s;
    });
    db.saveStaff(staffList);
    return staffList;
  },

  deleteStaff: (staffId) => {
    const staffList = db.getStaff().filter(s => s.id !== staffId);
    db.saveStaff(staffList);
    return staffList;
  },

  updateStaffPassword: (staffId, newPassword) => {
    const staffList = db.getStaff().map(s => {
      if (s.id === staffId) {
        return { ...s, password: newPassword };
      }
      return s;
    });
    db.saveStaff(staffList);

    const session = db.getSession();
    if (session && session.user && session.user.id === staffId) {
      session.user.password = newPassword;
      db.setSession(session.user, session.view, session.activeRole);
    }
    return staffList;
  },

  updateUserPassword: (userId, newPassword) => {
    const users = db.getUsers().map(u => {
      if (u.id === userId || (userId === 'usr-superadmin' && u.role === 'superadmin')) {
        return { ...u, password: newPassword };
      }
      return u;
    });
    db.saveUsers(users);

    const session = db.getSession();
    if (session && session.user && (session.user.id === userId || (userId === 'usr-superadmin' && session.user.role === 'superadmin'))) {
      session.user.password = newPassword;
      db.setSession(session.user, session.view, session.activeRole);
    }
    return users;
  },

  // ================= ACTIVITY LOGS =================
  getLogs: () => safeRead(KEYS.LOGS, []),

  saveLogs: (logs) => safeWrite(KEYS.LOGS, logs),

  addLog: (type, title, detail, actor = 'System') => {
    const logs = db.getLogs();
    const newLog = {
      id: `l-${Date.now()}`,
      type,
      title,
      detail,
      actor,
      time: 'Just now',
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    db.saveLogs(logs.slice(0, 100)); // Keep latest 100 logs
    return newLog;
  },

  // ================= RESET DATABASE =================
  resetToSeed: () => {
    safeWrite(KEYS.USERS, SEED_USERS);
    safeWrite(KEYS.CLUBS, SEED_CLUBS);
    safeWrite(KEYS.STAFF, SEED_STAFF);
    safeWrite(KEYS.SESSION, { user: null, view: 'landing', activeRole: 'owner' });
    localStorage.removeItem('gymsoft_current_user');
    localStorage.removeItem('gymsoft_staff_list');
    localStorage.removeItem('gymsoft_registered_clubs');
    console.log('[Zenith DB] Database reset to seed data.');
    return true;
  },
};

export default db;
