import React from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  Users, DollarSign, CalendarCheck, AlertTriangle, 
  ArrowUpRight, MessageSquare, Plus, Scissors, ShoppingBag, 
  Clock, ShieldCheck, QrCode, Sparkles, TrendingUp 
} from 'lucide-react';

export default function DashboardView({ onNavigate, onOpenAddMember, onOpenCheckIn }) {
  const { 
    metrics, currencyObj, gymProfile, invoices, 
    appointments, businessMode, whatsAppConfig, sendWhatsAppReminder 
  } = useGymData();

  const unpaidInvoices = invoices.filter(i => i.status === 'Unpaid');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner with Hybrid Autopilot Status */}
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
              ⚡ Hybrid Fitness & Beauty Platform Active
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            {gymProfile.name}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Domain: <strong style={{ color: 'var(--color-text)' }}>{gymProfile.customDomain}</strong> · WhatsApp Gateway: <strong style={{ color: 'var(--color-text)' }}>{whatsAppConfig.linkedNumber}</strong>
          </p>
        </div>

        {/* Quick action buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('appointments')} className="btn-primary" style={{ fontSize: '0.8125rem' }}>
            <Scissors size={15} /> Book Treatment
          </button>
          <button onClick={() => onNavigate('retailpos')} className="btn-secondary" style={{ fontSize: '0.8125rem' }}>
            <ShoppingBag size={15} /> Retail POS
          </button>
          <button onClick={onOpenAddMember} className="btn-secondary" style={{ fontSize: '0.8125rem' }}>
            <Plus size={15} /> Add Client
          </button>
          <button onClick={onOpenCheckIn} className="btn-secondary" style={{ fontSize: '0.8125rem' }}>
            <QrCode size={15} /> Check-In
          </button>
        </div>
      </div>

      {/* KPI Stats 4-Card Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '18px',
      }}>
        {/* Active Members & Salon Clients */}
        <div className="card card-interactive" onClick={() => onNavigate('members')} style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Active Members & Clients
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
              <ArrowUpRight size={14} /> +18 this week
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>
            86 Hybrid VIPs (Gym + Salon Package)
          </p>
        </div>

        {/* Revenue This Month (Gym + Salon + Retail Store) */}
        <div className="card card-interactive" onClick={() => onNavigate('invoices')} style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Total Revenue (Monthly)
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
              {currencyObj.symbol}{(metrics.totalRevenueMonth + 11480).toLocaleString()}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              <ArrowUpRight size={14} /> +32%
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>
            Gym: 60% · Salon Spa: 28% · Retail: 12%
          </p>
        </div>

        {/* Today's Salon Appointments */}
        <div className="card card-interactive" onClick={() => onNavigate('appointments')} style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Salon & Spa Today
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(255, 42, 133, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff2a85',
            }}>
              <Scissors size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ff2a85' }}>
              {appointments.length} booked
            </h3>
            <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
              Chairs active
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>
            2 HydraFacials · 1 Blowdry · 1 Massage
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
              Live
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>
            Workout floor & salon stations combined
          </p>
        </div>
      </div>

      {/* 2-Column: Salon Appointments Schedule & Unpaid Invoices */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
      }}>
        {/* Today's Salon & Spa Schedule */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                Today's Treatment Schedule
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Stylists, treatment chairs & aesthetic appointments
              </p>
            </div>
            <button onClick={() => onNavigate('appointments')} className="btn-ghost" style={{ fontSize: '0.75rem' }}>
              View Salon Desk
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {appointments.map(apt => (
              <div
                key={apt.id}
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
                    <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{apt.memberName}</span>
                    <span className={`badge badge-${apt.status === 'Completed' ? 'success' : apt.status === 'In Chair' ? 'primary' : 'warning'}`}>
                      {apt.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {apt.serviceName} · Stylist: <strong>{apt.stylist.split(' ')[0]}</strong>
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {apt.time}
                  </span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)' }}>
                    {currencyObj.symbol}{apt.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Follow-ups & Unpaid Invoices */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                Unpaid Invoices & Renewals
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
                  >
                    <MessageSquare size={13} color="var(--color-success)" />
                    {inv.reminderSent ? 'Reminded ✓' : 'Send WhatsApp'}
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
