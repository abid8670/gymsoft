import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  QrCode, Search, UserCheck, AlertTriangle, CheckCircle2, 
  Clock, ShieldAlert, Sparkles, Flame, UserPlus 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckInTerminal({ onOpenAddMember }) {
  const { members, checkins, recordCheckIn } = useGymData();
  const [searchTerm, setSearchTerm] = useState('');
  const [lastCheckedMember, setLastCheckedMember] = useState(null);

  const matchedMembers = searchTerm.trim() === ''
    ? members.slice(0, 4)
    : members.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.phone.includes(searchTerm)
      );

  const handleCheckIn = (member) => {
    if (member.status === 'expired') {
      alert(`⚠️ Cannot check in: ${member.name}'s membership expired on ${member.expiryDate}. Please renew payment first.`);
      return;
    }

    recordCheckIn(member.id, 'Counter Kiosk');
    setLastCheckedMember(member);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) { }

    setTimeout(() => {
      setLastCheckedMember(null);
    }, 4000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Front Desk Terminal Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              boxShadow: '0 0 10px var(--color-primary)',
            }}></span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Front Desk Kiosk Active
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Check-In & Attendance Terminal
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Instant barcode / name check-in. Zero paper registers.
          </p>
        </div>

        <button onClick={onOpenAddMember} className="btn-primary" style={{ fontSize: '0.875rem' }}>
          <UserPlus size={16} /> Register Walk-In
        </button>
      </div>

      {/* Main Kiosk Area: Left check-in pad, Right live attendance timeline */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
      }}>
        {/* Check-In Bar & Matching Member Cards */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px' }}>
            Search Member to Check In
          </h3>

          <div style={{ position: 'relative', marginBottom: '18px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              placeholder="Type member name, phone or scan QR barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '42px', fontSize: '1rem', height: '48px' }}
              autoFocus
            />
          </div>

          {/* Verification Notification Toast */}
          {lastCheckedMember && (
            <div style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(var(--color-success-rgb), 0.15)',
              border: '1.5px solid var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '18px',
              animation: 'float 0.3s ease-out',
            }}>
              <CheckCircle2 size={24} color="var(--color-success)" />
              <div>
                <p style={{ fontWeight: 800, color: 'var(--color-text)' }}>
                  {lastCheckedMember.name} Verified!
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Streak: {lastCheckedMember.streakDays + 1} days · Plan: {lastCheckedMember.planName}
                </p>
              </div>
            </div>
          )}

          {/* Members list for check in */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {matchedMembers.map((m) => {
              const isExpired = m.status === 'expired';
              return (
                <div
                  key={m.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-surface-raised)',
                    border: `1px solid ${isExpired ? 'rgba(var(--color-danger-rgb), 0.3)' : 'var(--color-border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={m.avatar}
                      alt={m.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{m.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {m.planName} · Expires: <span style={{ color: isExpired ? 'var(--color-danger)' : 'inherit', fontWeight: isExpired ? 700 : 500 }}>{m.expiryDate}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCheckIn(m)}
                    className={isExpired ? "btn-secondary" : "btn-primary"}
                    style={{
                      fontSize: '0.8125rem',
                      padding: '8px 14px',
                      backgroundColor: isExpired ? 'var(--color-surface-soft)' : undefined,
                      color: isExpired ? 'var(--color-danger)' : undefined,
                    }}
                  >
                    {isExpired ? 'Expired ⚠️' : 'Tap In ✓'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Attendance Feed Today */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              Today's Live Check-In Feed
            </h3>
            <span className="badge badge-primary">
              {checkins.length + 82} athletes trained
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
            {checkins.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                  }}>
                    {item.memberName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{item.memberName}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {item.plan} · Method: {item.method}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {item.time}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>
                    Session: {item.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
