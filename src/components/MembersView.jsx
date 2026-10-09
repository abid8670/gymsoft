import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  Search, Plus, Filter, MessageSquare, Check, Flame, 
  Calendar, Phone, Mail, UserCheck, RefreshCw, LayoutGrid, List
} from 'lucide-react';

export default function MembersView({ onOpenAddMember, onSelectMemberForApp }) {
  const { members, currencyObj, recordCheckIn, setMembers, addLog } = useGymData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [renewSuccessId, setRenewSuccessId] = useState(null);

  // Filter members
  const filteredMembers = members.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.planName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' || m.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleRenew = (member) => {
    // Extend expiry by 30 days and mark active
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    const dateStr = nextMonth.toISOString().split('T')[0];

    setMembers(prev => prev.map(m => {
      if (m.id === member.id) {
        return {
          ...m,
          status: 'active',
          expiryDate: dateStr,
        };
      }
      return m;
    }));

    setRenewSuccessId(member.id);
    addLog('payment', 'Membership Renewed', `${member.name} renewed ${member.planName} for 30 days`, 'Front Desk');

    setTimeout(() => {
      setRenewSuccessId(null);
    }, 2500);
  };

  return (
    <div>
      {/* Top Header & Search Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Members Directory ({members.length})
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Manage athlete roster, check-in streaks, renewals and WhatsApp notices
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Grid / Table View toggle */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--color-surface-raised)',
            padding: '3px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
          }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? 'var(--color-surface)' : 'transparent',
                border: 'none',
                color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                padding: '6px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Gallery Grid"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                background: viewMode === 'table' ? 'var(--color-surface)' : 'transparent',
                border: 'none',
                color: viewMode === 'table' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                padding: '6px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Table Roster"
            >
              <List size={16} />
            </button>
          </div>

          <button onClick={onOpenAddMember} className="btn-primary">
            <Plus size={16} /> Add Member
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        {/* Search */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search member by name, phone or plan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '38px' }}
          />
        </div>

        {/* Status Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Members' },
            { id: 'active', label: 'Active' },
            { id: 'expiring', label: 'Expiring Soon' },
            { id: 'expired', label: 'Expired' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${statusFilter === f.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: statusFilter === f.id ? 'var(--color-primary-light)' : 'var(--color-surface)',
                color: statusFilter === f.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Members Grid View (Gallery Mode matching Slide 12) */}
      {viewMode === 'grid' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {filteredMembers.map((member) => {
            const isRenewed = renewSuccessId === member.id;
            return (
              <div
                key={member.id}
                className="card card-interactive"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {/* Top row with photo, name, status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid var(--color-border)',
                      }}
                    />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {member.name}
                        </h4>
                        <span className={`badge badge-${member.status === 'active' ? 'success' : member.status === 'expiring' ? 'warning' : 'danger'}`}>
                          {member.status}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        {member.planName} · {currencyObj.symbol}{member.price}/mo
                      </p>
                    </div>
                  </div>

                  {/* Contact details */}
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={13} color="var(--color-text-faint)" />
                      <span>{member.phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={13} color="var(--color-text-faint)" />
                      <span>Expires: <strong style={{ color: member.status === 'expired' ? 'var(--color-danger)' : 'var(--color-text)' }}>{member.expiryDate}</strong></span>
                    </div>
                  </div>

                  {/* Streaks & Visits badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-surface-raised)',
                    marginBottom: '16px',
                    fontSize: '0.75rem',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 700 }}>
                      <Flame size={14} /> {member.streakDays} Day Streak
                    </span>
                    <span style={{ color: 'var(--color-text-muted)' }}>
                      {member.totalVisits} Total Visits
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '14px' }}>
                  <button
                    onClick={() => recordCheckIn(member.id, 'Counter Verification')}
                    className="btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '6px 10px' }}
                  >
                    <UserCheck size={14} /> Check In
                  </button>

                  <button
                    onClick={() => handleRenew(member)}
                    className="btn-primary"
                    style={{ fontSize: '0.75rem', padding: '6px 10px' }}
                  >
                    {isRenewed ? 'Renewed ✓' : 'Renew Plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table Roster View */
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Plan & Dues</th>
                <th>Status</th>
                <th>Phone</th>
                <th>Expires</th>
                <th>Streak</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={member.avatar}
                        alt={member.name}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <p style={{ fontWeight: 700 }}>{member.name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)' }}>{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p style={{ fontWeight: 600 }}>{member.planName}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)' }}>{currencyObj.symbol}{member.price}</p>
                  </td>
                  <td>
                    <span className={`badge badge-${member.status === 'active' ? 'success' : member.status === 'expiring' ? 'warning' : 'danger'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>{member.phone}</td>
                  <td style={{ fontWeight: 600 }}>{member.expiryDate}</td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 700, fontSize: '0.8125rem' }}>
                      <Flame size={14} /> {member.streakDays}d
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => recordCheckIn(member.id, 'Counter')}
                        className="btn-secondary"
                        style={{ fontSize: '0.6875rem', padding: '4px 8px' }}
                      >
                        Check-in
                      </button>
                      <button
                        onClick={() => handleRenew(member)}
                        className="btn-primary"
                        style={{ fontSize: '0.6875rem', padding: '4px 8px' }}
                      >
                        Renew
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
