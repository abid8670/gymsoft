import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import confetti from 'canvas-confetti';
import { 
  Users, UserPlus, ShieldCheck, Key, Phone, Mail, 
  DollarSign, Check, X, Scissors, Dumbbell, MessageSquare, 
  ExternalLink, Trash2, Edit2, Sparkles, Award, Lock, Eye 
} from 'lucide-react';

export default function StaffManagementView() {
  const { 
    staff, addStaffMember, deleteStaffMember, 
    approveStaffMember, rejectStaffMember, activeRole,
    gymProfile, businessMode, setActiveRole, 
    setCurrentView, currencyObj 
  } = useGymData();

  const [modalOpen, setModalOpen] = useState(false);
  const [filterRole, setFilterRole] = useState('all');

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('stylist'); // 'counter' | 'stylist' | 'trainer' | 'manager'
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('staff123');
  const [email, setEmail] = useState('');
  const [commissionRate, setCommissionRate] = useState(20);
  const [baseSalary, setBaseSalary] = useState(300);
  const [copiedId, setCopiedId] = useState(null);

  const rolesConfig = [
    { 
      id: 'counter', 
      label: 'Front Desk / Receptionist', 
      icon: '🖥️', 
      desc: 'Check-in terminal, retail POS store counter, and client enrollment.',
      permissions: ['Check-In Terminal', 'Retail POS', 'Add New Clients', 'Daily Invoices'] 
    },
    { 
      id: 'stylist', 
      label: 'Hair Stylist & Beautician', 
      icon: '💇', 
      desc: 'Salon appointment calendar, hair color cards & personal service commission.',
      permissions: ['Appointments Calendar', 'Client Consultation Cards', 'Commission Ledger'] 
    },
    { 
      id: 'trainer', 
      label: 'Fitness Trainer & Coach', 
      icon: '🏋️', 
      desc: 'Workout check-ins, personal training sessions & trainer split payroll.',
      permissions: ['Workout Check-Ins', 'PT Sessions Split', 'Trainer Commission Ledger'] 
    },
    { 
      id: 'manager', 
      label: 'General Branch Manager', 
      icon: '👔', 
      desc: 'Full operational control, attendance logs & inventory restock.',
      permissions: ['Full Operational Access', 'Activity Logs', 'Inventory POS', 'Staff Roster'] 
    },
  ];

  const handleCreateStaff = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const autoTitle = title.trim() || rolesConfig.find(r => r.id === role)?.label;
    addStaffMember({
      name: name.trim(),
      role: role,
      title: autoTitle,
      phone: phone.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@${gymProfile.slug || 'club'}.com`,
      password: password.trim() || 'staff123',
      commissionRate: Number(commissionRate) || 0,
      baseSalary: Number(baseSalary) || 0,
    });

    try {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      }
    } catch (e) { }

    setName('');
    setTitle('');
    setPhone('');
    setPassword('staff123');
    setEmail('');
    setModalOpen(false);
  };

  const copyCredentials = (s) => {
    const text = `ZenithSoft Staff Login:\nBusiness: ${gymProfile.name}\nName: ${s.name} (${s.role.toUpperCase()})\nLogin Phone: ${s.phone}\nPassword: ${s.password || 'staff123'}\nPortal: http://localhost:5173/`;
    navigator.clipboard?.writeText(text);
    setCopiedId(s.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const simulateStaffLogin = (s) => {
    if (s.status === 'pending_approval') {
      alert(`⚠️ Login Blocked: ${s.name}'s account is currently PENDING SUPER ADMIN APPROVAL.\n\nSuper Admin must approve and activate this account before the staff member can log in.`);
      return;
    }
    if (s.status === 'rejected') {
      alert(`⚠️ Access Denied: This staff account was rejected by Super Admin.`);
      return;
    }
    setActiveRole(s.role);
    setCurrentView(s.role === 'stylist' ? 'appointments' : s.role === 'counter' ? 'checkin' : 'dashboard');
  };

  const filteredStaff = filterRole === 'all' 
    ? staff 
    : staff.filter(s => s.role === filterRole);

  const pendingApprovalsCount = staff.filter(s => s.status === 'pending_approval').length;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-primary">
              👑 Owner Administration & Staff Logins
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Protected by Super Admin Governance
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>
            Staff Logins & Role Management
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Apne Salon Stylists, Gym Trainers aur Reception Counter ke logins banayein. Har login Super Admin se approve hone ke baad active hota hai.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 22px', fontSize: '0.9375rem', fontWeight: 800 }}
        >
          <UserPlus size={18} /> + Create New Staff Login
        </button>
      </div>

      {/* Super Admin Approval Notice Banner */}
      <div style={{
        padding: '12px 18px',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        fontSize: '0.8125rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.25rem' }}>🛡️</span>
          <div>
            <strong style={{ color: '#f59e0b' }}>Super Admin Approval Required:</strong>
            <span style={{ color: 'var(--color-text-muted)', marginLeft: '6px' }}>
              Jab owner naya employee login banata hai, wo tab tak login nahi kar sakta jab tak Super Admin use verify aur approve na kare.
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge" style={{ backgroundColor: '#f59e0b', color: '#000', fontWeight: 800 }}>
            {pendingApprovalsCount} Pending Super Admin Approval
          </span>
          {activeRole !== 'superadmin' && (
            <button
              onClick={() => setActiveRole('superadmin')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-primary)',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.75rem',
                textDecoration: 'underline',
              }}
            >
              Switch to Super Admin to Approve
            </button>
          )}
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '12px',
      }}>
        {[
          { id: 'all', label: 'All Staff Members', count: staff.length },
          { id: 'stylist', label: '💇 Hair Stylists & Beauticians', count: staff.filter(s => s.role === 'stylist').length },
          { id: 'trainer', label: '🏋️ Fitness Trainers & Coaches', count: staff.filter(s => s.role === 'trainer').length },
          { id: 'counter', label: '🖥️ Front Desk Receptionists', count: staff.filter(s => s.role === 'counter').length },
          { id: 'manager', label: '👔 Branch Managers', count: staff.filter(s => s.role === 'manager').length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterRole(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)',
              backgroundColor: filterRole === tab.id ? 'var(--color-primary)' : 'var(--color-surface)',
              color: filterRole === tab.id ? 'var(--color-on-primary)' : 'var(--color-text)',
              fontWeight: filterRole === tab.id ? 800 : 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{tab.label}</span>
            <span style={{
              backgroundColor: filterRole === tab.id ? 'rgba(0,0,0,0.2)' : 'var(--color-surface-raised)',
              padding: '2px 7px',
              borderRadius: '999px',
              fontSize: '0.6875rem',
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Staff Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '20px',
      }}>
        {filteredStaff.map((member) => {
          const roleMeta = rolesConfig.find(r => r.id === member.role) || rolesConfig[0];
          return (
            <div
              key={member.id}
              className="card"
              style={{
                padding: '22px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Card Top: Avatar, Role Badge, Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-surface-raised)',
                      border: '2px solid var(--color-border-glow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                    }}>
                      {roleMeta.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text)' }}>
                        {member.name}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {member.title || roleMeta.label}
                      </p>
                    </div>
                  </div>

                  {member.status === 'pending_approval' ? (
                    <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)', fontSize: '0.6875rem' }}>
                      🟡 Pending Super Admin
                    </span>
                  ) : member.status === 'rejected' ? (
                    <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: 'var(--color-danger)', border: '1px solid var(--color-danger)', fontSize: '0.6875rem' }}>
                      🔴 Rejected
                    </span>
                  ) : (
                    <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>
                      🟢 Active
                    </span>
                  )}
                </div>

                {/* Login Credentials Box */}
                <div style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  marginBottom: '14px',
                  fontSize: '0.75rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Login ID / Phone:</span>
                    <strong style={{ color: 'var(--color-text)', fontFamily: 'monospace' }}>{member.phone}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Password:</span>
                    <strong style={{ color: 'var(--color-primary)', fontFamily: 'monospace' }}>{member.password || 'staff123'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Commission Rate:</span>
                    <strong>{member.commissionRate}% per service</strong>
                  </div>
                </div>

                {/* Permissions Tag List */}
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-faint)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Allowed Portal Capabilities:
                  </p>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {roleMeta.permissions.map((p, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.6875rem',
                          backgroundColor: 'var(--color-surface-soft)',
                          color: 'var(--color-text-muted)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        ✓ {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '14px',
              }}>
                <button
                  onClick={() => copyCredentials(member)}
                  className="btn-secondary"
                  style={{
                    fontSize: '0.75rem',
                    padding: '8px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Key size={13} /> {copiedId === member.id ? 'Copied! ✓' : 'Copy Login'}
                </button>

                <a
                  href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi ${member.name}! Here are your staff login credentials for ${gymProfile.name}:\nPhone: ${member.phone}\nPassword: ${member.password || 'staff123'}\nLogin at: http://localhost:5173/`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{
                    fontSize: '0.75rem',
                    padding: '8px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    color: '#25d366',
                    textDecoration: 'none',
                  }}
                >
                  <MessageSquare size={13} /> WhatsApp
                </a>

                {/* Actions: If Pending, show Super Admin Approve/Reject buttons */}
                {member.status === 'pending_approval' ? (
                  <div style={{ gridColumn: 'span 2', display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button
                      onClick={() => approveStaffMember(member.id)}
                      className="btn-primary"
                      style={{
                        flex: 1,
                        fontSize: '0.75rem',
                        padding: '8px',
                        backgroundColor: '#10b981',
                        color: '#fff',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                      }}
                      title="Super Admin Approve"
                    >
                      <Check size={14} /> Approve & Activate (Super Admin)
                    </button>
                    <button
                      onClick={() => rejectStaffMember(member.id)}
                      className="btn-secondary"
                      style={{
                        padding: '8px 12px',
                        fontSize: '0.75rem',
                        color: 'var(--color-danger)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                      }}
                      title="Reject Account"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => simulateStaffLogin(member)}
                    className="btn-primary"
                    style={{
                      gridColumn: 'span 2',
                      fontSize: '0.75rem',
                      padding: '8px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <Eye size={14} /> Simulate Login as {member.name.split(' ')[0]}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE STAFF MODAL */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 100,
        }}>
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '520px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: 'var(--color-surface)',
              border: '1.5px solid var(--color-border-glow)',
              boxShadow: 'var(--shadow-float)',
              borderRadius: 'var(--radius-lg)',
              padding: 0,
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--color-surface-raised)',
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  Create New Staff Login
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Staff member ka role aur password set karein
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateStaff} style={{ padding: '24px' }}>
              {/* Select Role */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                  Assign Role (Staff Ki Zimmedari) *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {rolesConfig.map(r => (
                    <div
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: `1.5px solid ${role === r.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        backgroundColor: role === r.id ? 'var(--color-primary-light)' : 'var(--color-surface-raised)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{r.icon}</span>
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 800 }}>{r.label.split('/')[0]}</div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>{r.permissions[0]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff Full Name & Job Title */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Staff Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Natasha Sheikh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', fontSize: '0.875rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Master Colorist / Pro PT"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              {/* Phone (Login Username) & Password */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Mobile / Login ID *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', fontSize: '0.875rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Login Password *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="staff123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              {/* Commission % & Base Salary */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Commission Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', fontSize: '0.875rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Base Salary ({currencyObj.symbol} / month)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.9375rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Check size={18} /> Save & Activate Staff Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
