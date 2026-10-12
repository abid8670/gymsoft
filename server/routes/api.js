import express from 'express';
import dbAdapter from '../database/dbAdapter.js';

const router = express.Router();

// ----------------- HEALTH & DB STATUS -----------------
router.get('/health', async (req, res) => {
  try {
    const health = await dbAdapter.getHealth();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...health,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Dynamic DB Switch / Test endpoint
router.post('/db/test-connect', async (req, res) => {
  const { connectionUrl, dbType } = req.body;
  try {
    const detected = dbAdapter.detectDbType(connectionUrl, dbType);
    res.json({
      success: true,
      detectedEngine: detected,
      message: `Database connection string validated for engine: ${detected.toUpperCase()}`
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ----------------- AUTHENTICATION -----------------
router.post('/auth/login', async (req, res) => {
  const { identifier, password, role } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ success: false, message: 'Identifier and password are required.' });
  }

  const clean = identifier.trim().toLowerCase();

  try {
    // 1. Check Super Admin & Owners in `users`
    const users = await dbAdapter.findAll('users');
    const matchedUser = users.find(u => {
      const matchEmail = u.email && u.email.toLowerCase() === clean;
      const matchUsername = u.username && u.username.toLowerCase() === clean;
      const matchPhone = u.phone && u.phone.includes(clean);
      return matchEmail || matchUsername || matchPhone;
    });

    if (matchedUser && matchedUser.password === password) {
      return res.json({
        success: true,
        user: matchedUser,
        activeRole: matchedUser.role || 'owner',
      });
    }

    // 2. Check Staff in `staff`
    const staffList = await dbAdapter.findAll('staff');
    const matchedStaff = staffList.find(s => {
      const matchEmail = s.email && s.email.toLowerCase() === clean;
      const matchPhone = s.phone && s.phone.includes(clean);
      return matchEmail || matchPhone;
    });

    if (matchedStaff && matchedStaff.password === password) {
      if (matchedStaff.status === 'pending_approval') {
        return res.status(403).json({
          success: false,
          message: 'Account pending Super Admin authorization. Please wait for approval.',
        });
      }
      return res.json({
        success: true,
        user: matchedStaff,
        activeRole: matchedStaff.role || 'stylist',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Please verify your username/email/phone and password.',
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/auth/register', async (req, res) => {
  const userData = req.body;
  try {
    const newId = userData.id || `usr-${Date.now()}`;
    const user = {
      id: newId,
      name: userData.name || 'New Club Owner',
      email: userData.email || '',
      username: userData.username || userData.email || '',
      phone: userData.phone || '',
      password: userData.password || '123456',
      business_name: userData.businessName || 'Zenith Wellness Club',
      business_type: userData.businessType || 'hybrid',
      city: userData.city || 'Lahore',
      currency: userData.currency || 'USD',
      is_trial: 1,
      is_superadmin: 0,
      trial_days_left: 30,
      plan: userData.plan || '1-Month Free Starter',
      role: 'owner',
      created_at: new Date().toISOString(),
    };

    await dbAdapter.insert('users', user);

    // Also register the club
    const club = {
      id: `club-${Date.now()}`,
      name: user.business_name,
      type: user.business_type,
      city: user.city,
      location: userData.location || 'Main Boulevard',
      owner_name: user.name,
      owner_phone: user.phone,
      active_members: 0,
      monthly_revenue: 0,
      status: 'trial',
      plan: user.plan,
      trial_days_left: 30,
      joined_date: new Date().toISOString().split('T')[0],
    };
    await dbAdapter.insert('clubs', club);

    res.json({ success: true, user, club });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------- USERS -----------------
router.get('/users', async (req, res) => {
  try {
    const users = await dbAdapter.findAll('users');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/users/:id/password', async (req, res) => {
  const { newPassword } = req.body;
  try {
    await dbAdapter.update('users', req.params.id, { password: newPassword });
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------- CLUBS -----------------
router.get('/clubs', async (req, res) => {
  try {
    const clubs = await dbAdapter.findAll('clubs');
    res.json({ success: true, clubs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/clubs', async (req, res) => {
  try {
    const clubData = req.body;
    const club = {
      id: clubData.id || `club-${Date.now()}`,
      name: clubData.name,
      type: clubData.type || 'hybrid',
      city: clubData.city || '',
      location: clubData.location || '',
      owner_name: clubData.ownerName || '',
      owner_phone: clubData.ownerPhone || '',
      active_members: clubData.activeMembers || 0,
      monthly_revenue: clubData.monthlyRevenue || 0,
      status: clubData.status || 'trial',
      plan: clubData.plan || '1-Month Free Starter',
      trial_days_left: clubData.trialDaysLeft ?? 30,
      joined_date: clubData.joinedDate || new Date().toISOString().split('T')[0],
    };
    await dbAdapter.insert('clubs', club);
    res.json({ success: true, club });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/clubs/:id', async (req, res) => {
  try {
    const updated = await dbAdapter.update('clubs', req.params.id, req.body);
    res.json({ success: true, club: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/clubs/:id', async (req, res) => {
  try {
    await dbAdapter.delete('clubs', req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------- STAFF -----------------
router.get('/staff', async (req, res) => {
  try {
    const staff = await dbAdapter.findAll('staff');
    res.json({ success: true, staff });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/staff', async (req, res) => {
  try {
    const s = req.body;
    const staffMember = {
      id: s.id || `st-${Date.now()}`,
      name: s.name,
      role: s.role || 'stylist',
      title: s.title || '',
      phone: s.phone || '',
      email: s.email || '',
      password: s.password || 'staff123',
      club_name: s.clubName || s.club_name || '',
      base_salary: s.baseSalary || s.base_salary || 0,
      commission_rate: s.commissionRate || s.commission_rate || 0,
      services_completed: s.servicesCompleted || 0,
      commission_earned: s.commissionEarned || 0,
      rating: s.rating || 5.0,
      status: s.status || 'pending_approval',
      approved_by: s.approvedBy || null,
      created_at: s.createdAt || new Date().toISOString().split('T')[0],
    };
    await dbAdapter.insert('staff', staffMember);
    res.json({ success: true, staff: staffMember });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/staff/:id/approve', async (req, res) => {
  try {
    const updated = await dbAdapter.update('staff', req.params.id, {
      status: 'active',
      approved_by: 'Super Admin',
    });
    res.json({ success: true, staff: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/staff/:id/reject', async (req, res) => {
  try {
    const updated = await dbAdapter.update('staff', req.params.id, {
      status: 'rejected',
      approved_by: 'Rejected by Super Admin',
    });
    res.json({ success: true, staff: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/staff/:id/password', async (req, res) => {
  try {
    const updated = await dbAdapter.update('staff', req.params.id, { password: req.body.newPassword });
    res.json({ success: true, staff: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/staff/:id', async (req, res) => {
  try {
    await dbAdapter.delete('staff', req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------- MEMBERS -----------------
router.get('/members', async (req, res) => {
  try {
    const members = await dbAdapter.findAll('members');
    res.json({ success: true, members });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/members', async (req, res) => {
  try {
    const m = req.body;
    const member = {
      id: m.id || `mem-${Date.now()}`,
      name: m.name,
      phone: m.phone || '',
      email: m.email || '',
      plan: m.plan || 'Monthly Standard',
      status: m.status || 'Active',
      join_date: m.joinDate || m.join_date || new Date().toISOString().split('T')[0],
      expiry_date: m.expiryDate || m.expiry_date || '',
      photo: m.photo || '',
      gender: m.gender || 'Unspecified',
      club_id: m.clubId || m.club_id || 'club-1',
      created_at: new Date().toISOString(),
    };
    await dbAdapter.insert('members', member);
    res.json({ success: true, member });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/members/:id', async (req, res) => {
  try {
    const updated = await dbAdapter.update('members', req.params.id, req.body);
    res.json({ success: true, member: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/members/:id', async (req, res) => {
  try {
    await dbAdapter.delete('members', req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------- APPOINTMENTS -----------------
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await dbAdapter.findAll('appointments');
    res.json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/appointments', async (req, res) => {
  try {
    const a = req.body;
    const appointment = {
      id: a.id || `apt-${Date.now()}`,
      client_name: a.clientName || a.client_name,
      client_phone: a.clientPhone || a.client_phone || '',
      service_name: a.serviceName || a.service_name,
      stylist_name: a.stylistName || a.stylist_name,
      date: a.date,
      time: a.time,
      status: a.status || 'Confirmed',
      price: a.price || 0,
      notes: a.notes || '',
      club_id: a.clubId || a.club_id || 'club-1',
    };
    await dbAdapter.insert('appointments', appointment);
    res.json({ success: true, appointment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------- INVOICES -----------------
router.get('/invoices', async (req, res) => {
  try {
    const invoices = await dbAdapter.findAll('invoices');
    res.json({ success: true, invoices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/invoices', async (req, res) => {
  try {
    const inv = req.body;
    const invoice = {
      id: inv.id || `inv-${Date.now()}`,
      invoice_number: inv.invoiceNumber || inv.invoice_number || `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      member_name: inv.memberName || inv.member_name,
      plan: inv.plan || '',
      amount: inv.amount || 0,
      discount: inv.discount || 0,
      net_amount: inv.netAmount || inv.net_amount || (inv.amount - (inv.discount || 0)),
      payment_method: inv.paymentMethod || inv.payment_method || 'Cash',
      date: inv.date || new Date().toISOString().split('T')[0],
      status: inv.status || 'Paid',
      club_id: inv.clubId || inv.club_id || 'club-1',
    };
    await dbAdapter.insert('invoices', invoice);
    res.json({ success: true, invoice });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------- PRODUCTS / RETAIL -----------------
router.get('/products', async (req, res) => {
  try {
    const products = await dbAdapter.findAll('products');
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/products', async (req, res) => {
  try {
    const p = req.body;
    const product = {
      id: p.id || `prod-${Date.now()}`,
      name: p.name,
      category: p.category || 'Retail',
      price: p.price || 0,
      cost: p.cost || 0,
      stock: p.stock || 0,
      sku: p.sku || '',
      barcode: p.barcode || '',
      club_id: p.clubId || p.club_id || 'club-1',
    };
    await dbAdapter.insert('products', product);
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------- EXPENSES -----------------
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await dbAdapter.findAll('expenses');
    res.json({ success: true, expenses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/expenses', async (req, res) => {
  try {
    const e = req.body;
    const expense = {
      id: e.id || `exp-${Date.now()}`,
      title: e.title,
      category: e.category || 'Operations',
      amount: e.amount || 0,
      date: e.date || new Date().toISOString().split('T')[0],
      payment_method: e.paymentMethod || e.payment_method || 'Cash',
      notes: e.notes || '',
      club_id: e.clubId || e.club_id || 'club-1',
    };
    await dbAdapter.insert('expenses', expense);
    res.json({ success: true, expense });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------- ACTIVITY LOGS -----------------
router.get('/logs', async (req, res) => {
  try {
    const logs = await dbAdapter.findAll('activity_logs', '', [], 'timestamp DESC');
    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/logs', async (req, res) => {
  try {
    const l = req.body;
    const log = {
      id: l.id || `log-${Date.now()}`,
      type: l.type || 'info',
      title: l.title || 'Activity',
      detail: l.detail || '',
      actor: l.actor || 'System',
      timestamp: new Date().toISOString(),
    };
    await dbAdapter.insert('activity_logs', log);
    res.json({ success: true, log });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
