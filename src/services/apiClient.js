/**
 * ZenithSoft API Client
 * Seamlessly interfaces with Multi-DB Backend (Neon PostgreSQL, MySQL, SQLite)
 * with graceful fallback to browser localStorage if offline.
 */

const API_BASE = '/api';

export const apiClient = {
  isAvailable: false,
  activeEngine: 'localStorage', // 'sqlite' | 'mysql' | 'neon_postgres' | 'postgres' | 'localStorage'

  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        this.isAvailable = true;
        this.activeEngine = data.dbType || 'connected';
        return { available: true, ...data };
      }
    } catch {
      this.isAvailable = false;
      this.activeEngine = 'localStorage';
    }
    return { available: false, dbType: 'localStorage' };
  },

  async login(identifier, password, role = 'owner') {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password, role }),
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: err.message, fallback: true };
    }
  },

  async register(userData) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: err.message, fallback: true };
    }
  },

  async getClubs() {
    try {
      const res = await fetch(`${API_BASE}/clubs`);
      const data = await res.json();
      return data.clubs || [];
    } catch {
      return null;
    }
  },

  async addClub(clubData) {
    try {
      const res = await fetch(`${API_BASE}/clubs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clubData),
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  async getStaff() {
    try {
      const res = await fetch(`${API_BASE}/staff`);
      const data = await res.json();
      return data.staff || [];
    } catch {
      return null;
    }
  },

  async addStaff(staffData) {
    try {
      const res = await fetch(`${API_BASE}/staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staffData),
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  async approveStaff(staffId) {
    try {
      const res = await fetch(`${API_BASE}/staff/${staffId}/approve`, { method: 'PUT' });
      return await res.json();
    } catch {
      return null;
    }
  },

  async rejectStaff(staffId) {
    try {
      const res = await fetch(`${API_BASE}/staff/${staffId}/reject`, { method: 'PUT' });
      return await res.json();
    } catch {
      return null;
    }
  },

  async deleteStaff(staffId) {
    try {
      const res = await fetch(`${API_BASE}/staff/${staffId}`, { method: 'DELETE' });
      return await res.json();
    } catch {
      return null;
    }
  },

  async getMembers() {
    try {
      const res = await fetch(`${API_BASE}/members`);
      const data = await res.json();
      return data.members || [];
    } catch {
      return null;
    }
  },

  async addMember(memberData) {
    try {
      const res = await fetch(`${API_BASE}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData),
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  async getAppointments() {
    try {
      const res = await fetch(`${API_BASE}/appointments`);
      const data = await res.json();
      return data.appointments || [];
    } catch {
      return null;
    }
  },

  async addAppointment(appointmentData) {
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  async getInvoices() {
    try {
      const res = await fetch(`${API_BASE}/invoices`);
      const data = await res.json();
      return data.invoices || [];
    } catch {
      return null;
    }
  },

  async addInvoice(invoiceData) {
    try {
      const res = await fetch(`${API_BASE}/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  async getProducts() {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      return data.products || [];
    } catch {
      return null;
    }
  },

  async addProduct(productData) {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  async getExpenses() {
    try {
      const res = await fetch(`${API_BASE}/expenses`);
      const data = await res.json();
      return data.expenses || [];
    } catch {
      return null;
    }
  },

  async addExpense(expenseData) {
    try {
      const res = await fetch(`${API_BASE}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  async getLogs() {
    try {
      const res = await fetch(`${API_BASE}/logs`);
      const data = await res.json();
      return data.logs || [];
    } catch {
      return null;
    }
  },

  async addLog(type, title, detail, actor = 'System') {
    try {
      const res = await fetch(`${API_BASE}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, title, detail, actor }),
      });
      return await res.json();
    } catch {
      return null;
    }
  },
};

export default apiClient;
