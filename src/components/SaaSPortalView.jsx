import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import confetti from 'canvas-confetti';
import { 
  Building2, Plus, ArrowRight, ShieldCheck, Phone, 
  MapPin, Users, DollarSign, Sparkles, Check, X, 
  ExternalLink, Search, Filter, Scissors, Dumbbell, Zap,
  Clock, CheckCircle2, AlertTriangle, Key, Trash2, Mail,
  Lock, Eye, EyeOff
} from 'lucide-react';

export default function SaaSPortalView() {
  const { 
    registeredClubs, registerNewClub, switchActiveClub, deleteClub, updateClubStatus,
    staff, approveStaffMember, rejectStaffMember,
    registeredUsers, changeUserPassword, changeStaffPassword,
    gymProfile, currencyObj, activeRole, setActiveRole 
  } = useGymData();

  const [activeTab, setActiveTab] = useState('clubs'); // 'clubs' | 'approvals' | 'passwords'
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Password Management States
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [targetAccount, setTargetAccount] = useState(null);
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [userFilter, setUserFilter] = useState('all'); // 'all' | 'owners' | 'staff'
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [passwordSuccessAlert, setPasswordSuccessAlert] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState('salon'); // 'salon' | 'gym' | 'hybrid'
  const [city, setCity] = useState('Lahore');
  const [location, setLocation] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');

  const handleRegisterClub = (e) => {
    e.preventDefault();
    if (!name.trim() || !ownerName.trim() || !ownerPhone.trim()) return;

    registerNewClub({
      name: name.trim(),
      type: type,
      city: city.trim() || 'Lahore',
      location: location.trim() || `${city} Main Boulevard`,
      ownerName: ownerName.trim(),
      ownerPhone: ownerPhone.trim(),
    });

    try {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
      }
    } catch (e) { }

    setName('');
    setLocation('');
    setOwnerName('');
    setOwnerPhone('');
    setModalOpen(false);
  };

  const filteredClubs = registeredClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          club.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          club.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || club.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const pendingStaff = staff.filter(s => s.status === 'pending_approval');
  const activeStaff = staff.filter(s => s.status === 'active');

  const totalMembersAllClubs = registeredClubs.reduce((acc, c) => acc + (c.activeMembers || 0), 0) + 480;
  const totalSaaSRevenue = totalMembersAllClubs * 1; // $1 per member

  const handleApproveAllPending = () => {
    pendingStaff.forEach(s => approveStaffMember(s.id));
    try {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
      }
    } catch (e) { }
  };

  const superAdminUser = registeredUsers?.find(u => u.role === 'superadmin') || {
    id: 'usr-superadmin',
    name: 'Chief Super Admin (SaaS HQ)',
    email: 'admin@zenithsoft.cloud',
    username: 'admin',
    phone: '+92 300 0000000',
    password: 'admin',
    role: 'superadmin',
  };

  const allAccounts = [
    // Super Admin Master Account
    {
      id: superAdminUser.id,
      name: superAdminUser.name,
      role: 'superadmin',
      roleBadge: '🛡️ Super Admin',
      clubName: 'ZenithSoft Global SaaS HQ',
      identifier: `${superAdminUser.username || 'admin'} · ${superAdminUser.email}`,
      email: superAdminUser.email,
      phone: superAdminUser.phone,
      username: superAdminUser.username || 'admin',
      password: superAdminUser.password || 'admin',
      isStaff: false,
    },
    // Registered Club Owners
    ...(registeredUsers || []).filter(u => u.role !== 'superadmin').map(u => ({
      id: u.id,
      name: u.name,
      role: 'owner',
      roleBadge: '👑 Club Owner',
      clubName: u.businessName || 'Wellness Club',
      identifier: u.email || u.phone,
      email: u.email,
      phone: u.phone,
      password: u.password || '123',
      isStaff: false,
    })),
    // Staff Members Across All Clubs
    ...(staff || []).map(s => ({
      id: s.id,
      name: s.name,
      role: s.role,
      roleBadge: s.role === 'stylist' ? '💇 Stylist' : s.role === 'trainer' ? '🏋️ Trainer' : '🖥️ Front Desk',
      clubName: s.clubName || gymProfile.name,
      identifier: s.email || s.phone,
      email: s.email,
      phone: s.phone,
      password: s.password || 'staff123',
      status: s.status,
      isStaff: true,
    })),
  ];

  const filteredAccounts = allAccounts.filter(acc => {
    const term = (userSearchTerm || '').toLowerCase();
    const matchesSearch = acc.name.toLowerCase().includes(term) ||
                          (acc.identifier && acc.identifier.toLowerCase().includes(term)) ||
                          (acc.clubName && acc.clubName.toLowerCase().includes(term));
    if (!matchesSearch) return false;
    if (userFilter === 'owners') return acc.role === 'owner';
    if (userFilter === 'staff') return acc.isStaff;
    return true;
  });

  const handleOpenSuperAdminPassword = () => {
    setTargetAccount({
      id: superAdminUser.id,
      name: superAdminUser.name,
      role: 'superadmin',
      roleBadge: '🛡️ Super Admin Master',
      clubName: 'ZenithSoft Global SaaS HQ',
      identifier: `Username: ${superAdminUser.username || 'admin'} · Email: ${superAdminUser.email}`,
      currentPassword: superAdminUser.password || 'admin',
      isStaff: false,
    });
    setNewPasswordValue('');
    setShowPasswordText(false);
    setPasswordSuccessAlert('');
    setPasswordModalOpen(true);
  };

  const handleOpenPasswordForClubOwner = (club) => {
    const ownerUser = registeredUsers?.find(u => 
      (u.name && u.name.toLowerCase() === club.ownerName.toLowerCase()) || 
      (u.phone && club.ownerPhone && u.phone.includes(club.ownerPhone.replace(/[^0-9]/g, '')))
    ) || {
      id: `usr-${club.id}`,
      name: club.ownerName,
      email: `${club.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      phone: club.ownerPhone,
      password: '123',
      role: 'owner',
    };

    setTargetAccount({
      id: ownerUser.id,
      name: `${club.ownerName} (${club.name})`,
      role: 'owner',
      roleBadge: '👑 Club Owner',
      clubName: club.name,
      identifier: ownerUser.email || club.ownerPhone,
      currentPassword: ownerUser.password || '123',
      isStaff: false,
    });
    setNewPasswordValue('');
    setShowPasswordText(false);
    setPasswordSuccessAlert('');
    setPasswordModalOpen(true);
  };

  const handleOpenPasswordForStaff = (staffMember) => {
    setTargetAccount({
      id: staffMember.id,
      name: staffMember.name,
      role: staffMember.role,
      roleBadge: staffMember.role === 'stylist' ? '💇 Stylist' : staffMember.role === 'trainer' ? '🏋️ Trainer' : '🖥️ Front Desk',
      clubName: staffMember.clubName || gymProfile.name,
      identifier: staffMember.email || staffMember.phone,
      currentPassword: staffMember.password || 'staff123',
      isStaff: true,
    });
    setNewPasswordValue('');
    setShowPasswordText(false);
    setPasswordSuccessAlert('');
    setPasswordModalOpen(true);
  };

  const handleOpenPasswordForAccount = (acc) => {
    setTargetAccount(acc);
    setNewPasswordValue('');
    setShowPasswordText(false);
    setPasswordSuccessAlert('');
    setPasswordModalOpen(true);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!targetAccount || !newPasswordValue.trim()) return;

    const val = newPasswordValue.trim();
    if (targetAccount.isStaff) {
      changeStaffPassword(targetAccount.id, val);
    } else {
      changeUserPassword(targetAccount.id, val);
    }

    try {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 65, spread: 60, origin: { y: 0.5 } });
      }
    } catch (err) { }

    setPasswordSuccessAlert(`Password for "${targetAccount.name}" updated successfully to "${val}"!`);
    setTimeout(() => {
      setPasswordModalOpen(false);
      setPasswordSuccessAlert('');
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* SaaS Admin Header */}
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
              🛡️ Super Admin Master Governance Hub
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Multi-Tenant Gym & Salon Operating System
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>
            Super Admin & Multi-Club SaaS Portal
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Super Admin has full control: approve employee accounts created by owners, register new gyms & salons, and monitor all multi-tenant clubs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {activeRole !== 'superadmin' && (
            <button
              onClick={() => setActiveRole('superadmin')}
              className="btn-secondary"
              style={{ fontSize: '0.8125rem', fontWeight: 700 }}
            >
              🛡️ Switch to Super Admin Mode
            </button>
          )}
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', fontSize: '0.875rem', fontWeight: 800 }}
          >
            <Plus size={18} /> + Add New Gym or Salon
          </button>
        </div>
      </div>

      {/* Main Mode Tabs: Clubs vs Staff Approvals vs Passwords */}
      <div style={{
        display: 'flex',
        gap: '8px',
        backgroundColor: 'var(--color-surface-raised)',
        padding: '5px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
        marginBottom: '24px',
        maxWidth: '760px',
      }}>
        <button
          onClick={() => setActiveTab('clubs')}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 'var(--radius-xs)',
            border: 'none',
            backgroundColor: activeTab === 'clubs' ? 'var(--color-surface)' : 'transparent',
            color: activeTab === 'clubs' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            fontWeight: activeTab === 'clubs' ? 800 : 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            boxShadow: activeTab === 'clubs' ? 'var(--shadow-sm)' : 'none',
          }}
        >
          <Building2 size={15} />
          <span>Registered Clubs ({registeredClubs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('approvals')}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 'var(--radius-xs)',
            border: 'none',
            backgroundColor: activeTab === 'approvals' ? 'var(--color-surface)' : 'transparent',
            color: activeTab === 'approvals' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            fontWeight: activeTab === 'approvals' ? 800 : 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            boxShadow: activeTab === 'approvals' ? 'var(--shadow-sm)' : 'none',
          }}
        >
          <ShieldCheck size={15} />
          <span>Staff Queue</span>
          {pendingStaff.length > 0 && (
            <span style={{
              backgroundColor: '#f59e0b',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.6875rem',
              padding: '1px 6px',
              borderRadius: '999px',
            }}>
              {pendingStaff.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('passwords')}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 'var(--radius-xs)',
            border: 'none',
            backgroundColor: activeTab === 'passwords' ? 'var(--color-surface)' : 'transparent',
            color: activeTab === 'passwords' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            fontWeight: activeTab === 'passwords' ? 800 : 600,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            boxShadow: activeTab === 'passwords' ? 'var(--shadow-sm)' : 'none',
          }}
        >
          <Key size={15} />
          <span>Users & Passwords ({allAccounts.length})</span>
        </button>
      </div>

      {/* ================= TAB 1: CLUBS DIRECTORY ================= */}
      {activeTab === 'clubs' && (
        <>
          {/* SaaS Master Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}>
            {/* Total Registered Clubs */}
            <div className="card" style={{ padding: '20px', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Registered Clubs</span>
                <Building2 size={20} color="var(--color-primary)" />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-display)', margin: 0 }}>
                {registeredClubs.length}
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700, marginTop: '4px', display: 'block' }}>
                ✓ Salons, Gyms & Spas
              </span>
            </div>

            {/* Total Clients Across All Clubs */}
            <div className="card" style={{ padding: '20px', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Members Managed</span>
                <Users size={20} color="var(--color-primary)" />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-display)', margin: 0 }}>
                {totalMembersAllClubs.toLocaleString()}
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
                Active workout & salon clients
              </span>
            </div>

            {/* Total SaaS Recurring Billing */}
            <div className="card" style={{ padding: '20px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>SaaS Revenue (@ $1/client)</span>
                <DollarSign size={20} color="var(--color-primary)" />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'var(--font-display)', margin: 0 }}>
                ${totalSaaSRevenue.toLocaleString()} <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>/ mo</span>
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700, marginTop: '4px', display: 'block' }}>
                ★ Super Admin MRR
              </span>
            </div>

            {/* Pending Staff Approvals Badge */}
            <div className="card" style={{ padding: '20px', backgroundColor: 'var(--color-surface)', border: pendingStaff.length > 0 ? '1px solid #f59e0b' : '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Staff Approvals Pending</span>
                <ShieldCheck size={20} color="#f59e0b" />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 900, color: pendingStaff.length > 0 ? '#f59e0b' : 'var(--color-text)', fontFamily: 'var(--font-display)', margin: 0 }}>
                {pendingStaff.length}
              </h3>
              <button
                onClick={() => setActiveTab('approvals')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                  marginTop: '4px',
                  textDecoration: 'underline',
                }}
              >
                View Approval Queue →
              </button>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}>
            {/* Search */}
            <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search gym, salon, owner, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
                style={{ width: '100%', paddingLeft: '36px', fontSize: '0.875rem' }}
              />
            </div>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'all', label: 'All Businesses' },
                { id: 'salon', label: '💅 Salons' },
                { id: 'gym', label: '🏋️ Gyms' },
                { id: 'hybrid', label: '⚡ Hybrid' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: filterType === f.id ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: filterType === f.id ? 'var(--color-on-primary)' : 'var(--color-text-muted)',
                    fontWeight: filterType === f.id ? 800 : 600,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clubs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '20px',
          }}>
            {filteredClubs.map(club => {
              const isCurrentlyActive = gymProfile.name === club.name;
              return (
                <div
                  key={club.id}
                  className="card"
                  style={{
                    padding: '24px',
                    backgroundColor: 'var(--color-surface)',
                    border: isCurrentlyActive ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    boxShadow: isCurrentlyActive ? '0 0 25px -8px var(--color-primary-glow)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Header: Icon, Name, Category Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          backgroundColor: 'var(--color-surface-raised)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                        }}>
                          {club.type === 'salon' ? '💅' : club.type === 'gym' ? '🏋️' : '⚡'}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                            {club.name}
                          </h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                            <MapPin size={12} /> {club.location || club.city}
                          </div>
                        </div>
                      </div>

                      {isCurrentlyActive ? (
                        <span className="badge badge-primary" style={{ fontSize: '0.6875rem', fontWeight: 800 }}>
                          ● Active Now
                        </span>
                      ) : club.status === 'pro' ? (
                        <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>
                          Pro Paid
                        </span>
                      ) : (
                        <span className="badge badge-warning" style={{ fontSize: '0.6875rem' }}>
                          1-Mo Trial ({club.trialDaysLeft || 30}d left)
                        </span>
                      )}
                    </div>

                    {/* Owner & Contact */}
                    <div style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      marginBottom: '16px',
                      fontSize: '0.8125rem',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Owner / Founder:</span>
                        <strong style={{ color: 'var(--color-text)' }}>{club.ownerName}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>WhatsApp Contact:</span>
                        <strong>{club.ownerPhone}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Active Clients:</span>
                        <strong style={{ color: 'var(--color-primary)' }}>{club.activeMembers} members</strong>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => switchActiveClub(club.id)}
                      disabled={isCurrentlyActive}
                      className={isCurrentlyActive ? 'btn-secondary' : 'btn-primary'}
                      style={{
                        flex: 1,
                        fontSize: '0.8125rem',
                        padding: '10px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        opacity: isCurrentlyActive ? 0.7 : 1,
                      }}
                    >
                      {isCurrentlyActive ? (
                        'Managing This Club'
                      ) : (
                        <>
                          <Zap size={14} /> Switch to this Club
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleOpenPasswordForClubOwner(club)}
                      className="btn-secondary"
                      style={{
                        padding: '10px 12px',
                        color: 'var(--color-primary)',
                        border: '1px solid rgba(var(--color-primary-rgb), 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78125rem',
                        fontWeight: 700,
                      }}
                      title="Super Admin: Change Owner Password"
                    >
                      <Key size={14} /> Password
                    </button>

                    <button
                      onClick={() => deleteClub(club.id)}
                      className="btn-secondary"
                      style={{
                        padding: '10px 12px',
                        color: 'var(--color-danger)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                      }}
                      title="Super Admin: Delete Club"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ================= TAB 2: SUPER ADMIN STAFF APPROVALS QUEUE ================= */}
      {activeTab === 'approvals' && (
        <div>
          {/* Header Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>
                Staff Logins Awaiting Super Admin Activation
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
                When gym or salon owners create accounts for their receptionists, stylists, or coaches, they must be approved here before staff can log in.
              </p>
            </div>

            {pendingStaff.length > 0 && (
              <button
                onClick={handleApproveAllPending}
                className="btn-primary"
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  backgroundColor: '#10b981',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Check size={16} /> Approve All Pending Accounts ({pendingStaff.length})
              </button>
            )}
          </div>

          {/* Pending Staff Cards */}
          {pendingStaff.length === 0 ? (
            <div className="card" style={{ padding: '40px', textAlign: 'center', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <CheckCircle2 size={30} />
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px' }}>All Staff Logins Approved!</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', maxWidth: '460px', margin: '0 auto' }}>
                There are no employee accounts pending Super Admin verification right now. When an owner adds new staff, it will appear here instantly.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {pendingStaff.map(member => (
                <div
                  key={member.id}
                  className="card"
                  style={{
                    padding: '20px 24px',
                    backgroundColor: 'var(--color-surface)',
                    border: '1.5px solid #f59e0b',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      color: '#f59e0b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                    }}>
                      {member.role === 'stylist' ? '💇' : member.role === 'trainer' ? '🏋️' : '🖥️'}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>
                          {member.name}
                        </h4>
                        <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', fontSize: '0.6875rem' }}>
                          🟡 Pending Approval
                        </span>
                      </div>
                      <p style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)', margin: '3px 0 0 0' }}>
                        Role: <strong>{member.title || member.role.toUpperCase()}</strong> · Business: <strong>{member.clubName || gymProfile.name}</strong> · Phone: <strong>{member.phone}</strong>
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleOpenPasswordForStaff(member)}
                      className="btn-secondary"
                      style={{
                        padding: '10px 14px',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        border: '1px solid rgba(var(--color-primary-rgb), 0.3)',
                        color: 'var(--color-primary)',
                      }}
                      title="Super Admin: Set/Change Password"
                    >
                      <Key size={14} /> Password
                    </button>
                    <button
                      onClick={() => approveStaffMember(member.id)}
                      className="btn-primary"
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#10b981',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '0.8125rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Check size={16} /> Approve & Activate
                    </button>
                    <button
                      onClick={() => rejectStaffMember(member.id)}
                      className="btn-secondary"
                      style={{
                        padding: '10px 16px',
                        color: 'var(--color-danger)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                      }}
                    >
                      <X size={16} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active Staff Roster Across Clubs */}
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>
            Active Verified Staff ({activeStaff.length})
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
          }}>
            {activeStaff.map(member => (
              <div
                key={member.id}
                className="card"
                style={{ padding: '16px 20px', backgroundColor: 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <h5 style={{ fontWeight: 800, fontSize: '0.9375rem', margin: 0 }}>{member.name}</h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
                    {member.title} · {member.clubName || gymProfile.name}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleOpenPasswordForStaff(member)}
                    className="btn-secondary"
                    style={{
                      padding: '5px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      border: '1px solid rgba(var(--color-primary-rgb), 0.3)',
                      color: 'var(--color-primary)',
                    }}
                    title="Change Staff Password"
                  >
                    <Key size={13} /> Password
                  </button>
                  <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>
                    ✓ Approved
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: USERS & PASSWORDS MASTER CONTROL ================= */}
      {activeTab === 'passwords' && (
        <div>
          {/* Super Admin Master Credentials Banner */}
          <div className="card" style={{
            padding: '24px 28px',
            backgroundColor: 'var(--color-surface)',
            border: '2px solid #7c3aed',
            boxShadow: '0 10px 30px -10px rgba(124, 58, 237, 0.3)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '32px',
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, var(--color-surface) 100%)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  boxShadow: '0 8px 20px -4px rgba(124, 58, 237, 0.5)',
                }}>
                  🛡️
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge badge-primary" style={{ background: '#7c3aed', color: '#fff', fontWeight: 800 }}>
                      Super Admin Master Account
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700 }}>
                      ● Master Authority Active
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, margin: '0 0 4px 0' }}>
                    {superAdminUser.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                    <span>Username: <strong style={{ color: 'var(--color-text)' }}>admin</strong></span>
                    <span>Email: <strong style={{ color: 'var(--color-text)' }}>{superAdminUser.email}</strong></span>
                    <span>Current Password: <strong style={{ color: '#a78bfa', letterSpacing: '0.08em', backgroundColor: 'rgba(124, 58, 237, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                      {superAdminUser.password || 'admin'}
                    </strong></span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleOpenSuperAdminPassword}
                className="btn-primary"
                style={{
                  padding: '12px 20px',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)',
                }}
              >
                <Key size={16} /> Change My Admin Password
              </button>
            </div>
          </div>

          {/* All Users & Staff Password Management Directory */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0 }}>
                  System Accounts & Password Control
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
                  Super Admin has authority to change or reset passwords for ANY club owner or employee below.
                </p>
              </div>

              {/* Filter Tabs */}
              <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--color-surface-raised)', padding: '3px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                {[
                  { id: 'all', label: `All (${allAccounts.length})` },
                  { id: 'owners', label: `Club Owners (${allAccounts.filter(a => a.role === 'owner').length})` },
                  { id: 'staff', label: `Staff (${allAccounts.filter(a => a.isStaff).length})` },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setUserFilter(f.id)}
                    style={{
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: userFilter === f.id ? 'var(--color-surface)' : 'transparent',
                      color: userFilter === f.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      fontWeight: userFilter === f.id ? 800 : 600,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: '18px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search user by name, email, phone, role, or club..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className="input-field"
                style={{ width: '100%', paddingLeft: '36px', fontSize: '0.875rem' }}
              />
            </div>

            {/* Accounts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
              {filteredAccounts.map(acc => {
                const isSuper = acc.role === 'superadmin';
                return (
                  <div
                    key={acc.id}
                    className="card card-interactive"
                    style={{
                      padding: '18px 20px',
                      backgroundColor: 'var(--color-surface)',
                      border: isSuper ? '1.5px solid #7c3aed' : '1px solid var(--color-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <span className="badge" style={{
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            backgroundColor: isSuper ? '#7c3aed' : acc.role === 'owner' ? 'var(--color-primary)' : 'var(--color-surface-raised)',
                            color: isSuper || acc.role === 'owner' ? '#fff' : 'var(--color-text)',
                            marginBottom: '4px',
                            display: 'inline-block',
                          }}>
                            {acc.roleBadge}
                          </span>
                          <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '2px 0 0 0' }}>
                            {acc.name}
                          </h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            {acc.clubName}
                          </span>
                        </div>

                        {acc.status && (
                          <span className={`badge badge-${acc.status === 'active' ? 'success' : acc.status === 'pending_approval' ? 'warning' : 'danger'}`} style={{ fontSize: '0.625rem' }}>
                            {acc.status === 'active' ? 'Active' : acc.status === 'pending_approval' ? 'Pending' : 'Rejected'}
                          </span>
                        )}
                      </div>

                      {/* Login Details & Current Password */}
                      <div style={{
                        padding: '10px 12px',
                        backgroundColor: 'var(--color-surface-raised)',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.78125rem',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ color: 'var(--color-text-muted)' }}>Login ID:</span>
                          <strong style={{ color: 'var(--color-text)' }}>{acc.identifier}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--color-text-muted)' }}>Current Password:</span>
                          <span style={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'var(--color-primary)',
                            backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
                            padding: '1px 6px',
                            borderRadius: '3px',
                          }}>
                            {acc.password}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenPasswordForAccount(acc)}
                      className="btn-primary"
                      style={{
                        width: '100%',
                        padding: '9px',
                        fontSize: '0.8125rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        background: isSuper ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : undefined,
                      }}
                    >
                      <Key size={14} /> Change {isSuper ? 'Admin' : acc.name.split(' ')[0]} Password
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= SUPER ADMIN CHANGE PASSWORD MODAL ================= */}
      {passwordModalOpen && targetAccount && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.78)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 90,
          padding: '20px',
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: '480px',
            backgroundColor: 'var(--color-surface)',
            border: '2px solid var(--color-primary)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            borderRadius: 'var(--radius-lg)',
            padding: '26px',
            position: 'relative',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} /> Super Admin Security Control
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0 }}>
                  Change Account Password
                </h3>
              </div>
              <button
                onClick={() => setPasswordModalOpen(false)}
                className="btn-ghost"
                style={{ padding: '6px', borderRadius: '50%' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Target Account Summary Banner */}
            <div style={{
              padding: '14px',
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '18px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 800 }}>{targetAccount.name}</span>
                <span className="badge" style={{ fontSize: '0.6875rem', fontWeight: 800, backgroundColor: targetAccount.role === 'superadmin' ? '#7c3aed' : 'var(--color-primary)', color: '#fff' }}>
                  {targetAccount.roleBadge || targetAccount.role.toUpperCase()}
                </span>
              </div>
              <div style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                Login ID: <strong style={{ color: 'var(--color-text)' }}>{targetAccount.identifier}</strong>
              </div>
              <div style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)' }}>
                Current Password: <strong style={{ color: 'var(--color-primary)', fontFamily: 'monospace' }}>{targetAccount.currentPassword}</strong>
              </div>
            </div>

            {/* Success Message Alert */}
            {passwordSuccessAlert && (
              <div style={{
                padding: '12px 14px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                borderRadius: 'var(--radius-sm)',
                color: '#10b981',
                fontSize: '0.8125rem',
                fontWeight: 700,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <CheckCircle2 size={18} />
                <span>{passwordSuccessAlert}</span>
              </div>
            )}

            {/* Change Password Form */}
            <form onSubmit={handleSavePassword}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text)', display: 'block', marginBottom: '6px' }}>
                  Naya Password Enter Karein (New Password) *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPasswordText ? 'text' : 'password'}
                    required
                    autoFocus
                    placeholder="e.g. admin, 123456, pass2026"
                    value={newPasswordValue}
                    onChange={(e) => setNewPasswordValue(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', paddingRight: '40px', fontSize: '0.9375rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-muted)',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    {showPasswordText ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Quick Presets */}
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  Quick 1-Click Suggestions:
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[
                    targetAccount.role === 'superadmin' ? 'admin' : '123456',
                    'pass2026',
                    'super786',
                    'zenith123',
                  ].map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setNewPasswordValue(preset)}
                      className="badge"
                      style={{
                        cursor: 'pointer',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-surface-raised)',
                        color: 'var(--color-text)',
                        fontSize: '0.75rem',
                      }}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newPasswordValue.trim()}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    padding: '12px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Lock size={16} /> Save New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= REGISTER NEW CLUB MODAL ================= */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 80,
          padding: '20px',
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: '520px',
            backgroundColor: 'var(--color-surface)',
            border: '1.5px solid var(--color-border-glow)',
            boxShadow: 'var(--shadow-float)',
            padding: '28px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '4px' }}>Super Admin</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0 }}>Register New Gym or Salon</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="btn-ghost"
                style={{ padding: '6px', borderRadius: '50%' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRegisterClub} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Business Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {[
                    { id: 'salon', label: '💅 Luxury Salon' },
                    { id: 'gym', label: '🏋️ Fitness Gym' },
                    { id: 'hybrid', label: '⚡ Hybrid Club' },
                  ].map(bt => (
                    <button
                      key={bt.id}
                      type="button"
                      onClick={() => setType(bt.id)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: 'var(--radius-sm)',
                        border: type === bt.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        backgroundColor: type === bt.id ? 'var(--color-primary-light)' : 'var(--color-surface-raised)',
                        color: type === bt.id ? 'var(--color-primary)' : 'var(--color-text)',
                        fontWeight: 700,
                        fontSize: '0.78125rem',
                        cursor: 'pointer',
                      }}
                    >
                      {bt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Club / Salon Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Glow Spa or Iron Beast Gym"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karachi, Lahore, Dubai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-field"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Branch Location</label>
                  <input
                    type="text"
                    placeholder="e.g. DHA Phase 5"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-field"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Owner / Founder Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sara Malik"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="input-field"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Owner WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    className="input-field"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: '12px', fontWeight: 800 }}
                >
                  Confirm & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
