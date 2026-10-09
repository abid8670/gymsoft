import React from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  Users, DollarSign, CalendarCheck, AlertTriangle, 
  ArrowUpRight, ArrowDownRight, MessageSquare, Plus,
  CreditCard, TrendingUp, ShieldCheck, QrCode
} from 'lucide-react';

export default function DashboardView({ onNavigate, onOpenAddMember, onOpenCheckIn }) {
  const { metrics, currencyObj, gymProfile, invoices, members, whatsAppConfig, sendWhatsAppReminder } = useGymData();

  const unpaidInvoices = invoices.filter(i => i.status === 'Unpaid');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner with Gym Autopilot Status */}
      <div 
        className="card"
        style={{
          padding: '24px 28px',
          background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-raised) 100%)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              boxShadow: '0 0 12px var(--color-primary)',
            }}></span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Autopilot Running Smoothly
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            {gymProfile.name}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Domain: <strong style={{ color: 'var(--color-text)' }}>{gymProfile.customDomain}</strong> · WhatsApp: <strong style={{ color: 'var(--color-text)' }}>{whatsAppConfig.linkedNumber}</strong>
          </p>
        </div>

        {/* Quick action buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={onOpenAddMember} className="btn-primary" style={{ fontSize: '0.875rem' }}>
            <Plus size={16} /> Add Member
          </button>
          <button onClick={onOpenCheckIn} className="btn-secondary" style={{ fontSize: '0.875rem' }}>
            <QrCode size={16} /> Check In Desk
          </button>
        </div>
      </div>

      {/* KPI Stats 4-Card Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '18px',
      }}>
        {/* Active Members */}
        <div className="card card-interactive" onClick={() => onNavigate('members')} style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Active Members
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
            }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {metrics.activeMembersCount + 242}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              <ArrowUpRight size={14} /> +12 this week
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>
            {metrics.expiringMembersCount} expiring within 3 days
          </p>
        </div>

        {/* Revenue This Month */}
        <div className="card card-interactive" onClick={() => onNavigate('invoices')} style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Collected This Month
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(var(--color-success-rgb), 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-success)',
            }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {currencyObj.symbol}{(metrics.totalRevenueMonth + 9200).toLocaleString()}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              <ArrowUpRight size={14} /> +18%
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>
            Net profit: {currencyObj.symbol}{(metrics.netProfit + 3200).toLocaleString()}
          </p>
        </div>

        {/* Unpaid Invoices */}
        <div className="card card-interactive" onClick={() => onNavigate('invoices')} style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Unpaid Dues
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(var(--color-warning-rgb), 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-warning)',
            }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--color-warning)' }}>
              {metrics.unpaidInvoicesCount}
            </h3>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              ({currencyObj.symbol}{metrics.unpaidAmount})
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>
            Automated WhatsApp reminders active
          </p>
        </div>

        {/* Live Check-ins Today */}
        <div className="card card-interactive" onClick={() => onNavigate('checkin')} style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Check-ins Today
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(var(--color-tech-rgb), 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-tech)',
            }}>
              <CalendarCheck size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {metrics.checkInsToday}
            </h3>
            <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
              Live floor
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>
            Peak hours: 06:30 PM - 09:00 PM
          </p>
        </div>
      </div>

      {/* 2-Column: Revenue Chart & Unpaid Invoices Follow-up */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
      }}>
        {/* Revenue 12-Week Chart */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                Weekly Revenue (Last 12 Weeks)
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Consistent membership renewals & personal training sales
              </p>
            </div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-success)' }}>
              +24% vs Prev Quarter
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '8px',
            height: '160px',
            paddingTop: '20px',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '8px',
          }}>
            {[
              { week: 'W1', height: 45, val: '$1,850' },
              { week: 'W2', height: 52, val: '$2,100' },
              { week: 'W3', height: 48, val: '$1,950' },
              { week: 'W4', height: 60, val: '$2,450' },
              { week: 'W5', height: 58, val: '$2,300' },
              { week: 'W6', height: 72, val: '$2,890' },
              { week: 'W7', height: 65, val: '$2,600' },
              { week: 'W8', height: 80, val: '$3,200' },
              { week: 'W9', height: 75, val: '$3,050' },
              { week: 'W10', height: 88, val: '$3,500' },
              { week: 'W11', height: 82, val: '$3,300' },
              { week: 'W12', height: 96, val: '$3,920', current: true },
            ].map((bar, i) => (
              <div 
                key={i} 
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}
                title={`${bar.week}: ${bar.val}`}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${bar.height}%`,
                    backgroundColor: bar.current ? 'var(--color-primary)' : 'rgba(var(--color-primary-rgb), 0.35)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.3s ease',
                    boxShadow: bar.current ? '0 0 15px var(--color-primary-glow)' : 'none',
                  }}
                />
                <span style={{ fontSize: '0.6875rem', color: bar.current ? 'var(--color-primary)' : 'var(--color-text-faint)', marginTop: '6px', fontWeight: bar.current ? 700 : 500 }}>
                  {bar.week}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            <span>Average weekly run rate: <strong>$2,950</strong></span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Week 12 is at peak!</span>
          </div>
        </div>

        {/* Immediate Follow-ups & Unpaid Invoices */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                Unpaid Invoices Follow-Up
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                1-Click WhatsApp payment reminders
              </p>
            </div>
            <button onClick={() => onNavigate('invoices')} className="btn-ghost" style={{ fontSize: '0.75rem' }}>
              View All Invoices
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {unpaidInvoices.map((inv) => (
              <div
                key={inv.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                      {inv.memberName}
                    </span>
                    <span className="badge badge-warning" style={{ fontSize: '0.6875rem' }}>
                      Due {inv.dueDate}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {inv.planName} · {currencyObj.symbol}{inv.amount}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => sendWhatsAppReminder(inv.id)}
                    className="btn-secondary"
                    style={{
                      fontSize: '0.75rem',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                    title="Send WhatsApp payment reminder directly from your gym number"
                  >
                    <MessageSquare size={13} color="var(--color-success)" />
                    {inv.reminderSent ? 'Reminded ✓' : 'Send Reminder'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
