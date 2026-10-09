import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { Bell, LogIn, Flame, Timer, CheckCircle, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MemberAppMockup({ member, onCheckInSuccess, onDownloadInvoice }) {
  const { recordCheckIn, currencyObj } = useGymData();
  const [justCheckedIn, setJustCheckedIn] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);

  const activeMember = member || {
    id: 'm1',
    name: 'Ayesha Malik',
    planName: 'Gold VIP Plan',
    streakDays: 14,
    avgVisitMinutes: 72,
    expiryDate: '1 Nov 2026',
    status: 'active',
  };

  const handleTapCheckIn = (e) => {
    e.stopPropagation();
    setJustCheckedIn(true);
    recordCheckIn(activeMember.id, 'App 1-Tap');

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c6f432', '#00f0ff', '#10b981', '#ffffff']
      });
    } catch (err) {
      console.log(err);
    }

    if (onCheckInSuccess) onCheckInSuccess();

    setTimeout(() => {
      setJustCheckedIn(false);
    }, 3000);
  };

  // Generate a realistic 16-week activity heatmap
  const weeks = 16;
  const daysPerWeek = 7;
  // Deterministic seed pattern so it looks organic like a real athlete's heatmap
  const heatmapData = [];
  for (let w = 0; w < weeks; w++) {
    const weekDays = [];
    for (let d = 0; d < daysPerWeek; d++) {
      const idx = w * 7 + d;
      const isWeekend = d === 5 || d === 6;
      let level = 0;
      if (!isWeekend && (idx % 3 === 0 || idx % 5 === 1 || idx % 2 === 0)) {
        level = (idx % 4) + 1;
      } else if (isWeekend && idx % 4 === 2) {
        level = 2;
      }
      weekDays.push({
        dayIdx: idx,
        level: level, // 0 to 4
        date: `Day -${112 - idx}`,
        duration: level > 0 ? `${45 + (level * 15)} mins` : 'Rest day',
      });
    }
    heatmapData.push(weekDays);
  }

  const getCellColor = (level) => {
    if (level === 0) return 'var(--color-surface-soft)';
    if (level === 1) return 'rgba(var(--color-primary-rgb), 0.25)';
    if (level === 2) return 'rgba(var(--color-primary-rgb), 0.5)';
    if (level === 3) return 'rgba(var(--color-primary-rgb), 0.75)';
    return 'var(--color-primary)';
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '340px', margin: '0 auto' }}>
      {/* Smartphone frame */}
      <div 
        style={{
          borderRadius: '44px',
          border: '10px solid #1a1e27',
          backgroundColor: '#07090e',
          boxShadow: 'var(--shadow-float), 0 0 50px -10px var(--color-primary-glow)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Dynamic Island / Speaker Notch */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90px',
          height: '22px',
          backgroundColor: '#000000',
          borderRadius: '20px',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '12px',
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#131b26' }}></span>
        </div>

        {/* Screen Content */}
        <div style={{
          padding: '42px 16px 20px 16px',
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          minHeight: '580px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {/* Top greeting */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', fontWeight: 500 }}>
                  Good morning
                </p>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                  {activeMember.name.split(' ')[0]} 👋
                </h4>
              </div>
              <div style={{
                position: 'relative',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface-raised)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
              }}>
                <Bell size={18} />
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                }}></span>
              </div>
            </div>

            {/* Check-In Button (Hero Action) */}
            <div style={{ textAlign: 'center', margin: '22px 0 16px 0', position: 'relative' }}>
              {/* Outer pulsing wave */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                animation: 'pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
                pointerEvents: 'none',
              }}></div>

              <button
                onClick={handleTapCheckIn}
                style={{
                  position: 'relative',
                  width: '112px',
                  height: '112px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  cursor: 'pointer',
                  boxShadow: '0 12px 35px -5px var(--color-primary-glow)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: justCheckedIn ? 'scale(0.95)' : 'scale(1)',
                }}
              >
                {justCheckedIn ? (
                  <>
                    <CheckCircle size={32} strokeWidth={2.5} />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 800, marginTop: '4px' }}>
                      Verified!
                    </span>
                  </>
                ) : (
                  <>
                    <LogIn size={30} strokeWidth={2.5} />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 800, marginTop: '4px', letterSpacing: '-0.01em' }}>
                      Tap to In
                    </span>
                  </>
                )}
              </button>

              <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                {justCheckedIn ? 'Check-in recorded on front desk!' : 'One tap GPS / QR gym check-in'}
              </p>
            </div>

            {/* Stats: Streak & Avg duration */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <div style={{
                backgroundColor: 'var(--color-surface-raised)',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f59e0b', fontSize: '0.75rem', fontWeight: 700 }}>
                  <Flame size={15} /> Streak
                </div>
                <p style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '2px', fontFamily: 'var(--font-display)' }}>
                  {activeMember.streakDays} <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>days</span>
                </p>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>Personal best: 24</p>
              </div>

              <div style={{
                backgroundColor: 'var(--color-surface-raised)',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-tech)', fontSize: '0.75rem', fontWeight: 700 }}>
                  <Timer size={15} /> Avg Visit
                </div>
                <p style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '2px', fontFamily: 'var(--font-display)' }}>
                  {activeMember.avgVisitMinutes} <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>min</span>
                </p>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>Weekly target met</p>
              </div>
            </div>

            {/* 365-Day Activity Heatmap */}
            <div style={{
              backgroundColor: 'var(--color-surface-raised)',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              marginBottom: '12px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Training Heatmap
                </span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                  142 sessions
                </span>
              </div>

              {/* Grid of squares */}
              <div style={{
                display: 'flex',
                gap: '3px',
                overflowX: 'auto',
                paddingBottom: '4px',
              }}>
                {heatmapData.map((week, wIdx) => (
                  <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {week.map((day) => (
                      <div
                        key={day.dayIdx}
                        className="heatmap-cell"
                        style={{
                          backgroundColor: getCellColor(day.level),
                          cursor: 'pointer',
                        }}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        title={`${day.date}: ${day.duration}`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Tooltip / Status line */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>
                  {hoveredDay ? `${hoveredDay.duration}` : 'Last 16 weeks check-ins'}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-text-faint)', marginRight: '3px' }}>Less</span>
                  {[0, 1, 2, 3, 4].map(lvl => (
                    <span
                      key={lvl}
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '1.5px',
                        backgroundColor: getCellColor(lvl)
                      }}
                    />
                  ))}
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-text-faint)', marginLeft: '3px' }}>More</span>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Plan & PDF Invoice download */}
          <div style={{
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(var(--color-primary-rgb), 0.3)',
            backgroundColor: 'var(--color-primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <p style={{ fontSize: '0.72rem', color: 'var(--color-text-faint)' }}>Active Membership</p>
              <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text)' }}>
                {activeMember.planName}
              </p>
              <p style={{ fontSize: '0.6875rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                Renews {activeMember.expiryDate}
              </p>
            </div>

            <button
              onClick={onDownloadInvoice}
              className="btn-ghost"
              style={{
                fontSize: '0.75rem',
                padding: '6px 10px',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid var(--color-border)',
                fontWeight: 600,
              }}
              title="Download official branded PDF invoice"
            >
              <Download size={13} />
              PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
