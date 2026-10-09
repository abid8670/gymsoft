import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useGymData } from '../context/GymDataContext';
import { 
  Palette, Sun, Moon, Zap, Menu, X, Users, 
  ChevronDown, LayoutDashboard, CalendarCheck, Receipt, 
  MessageSquare, Globe, Building2, DollarSign, FileText, 
  Download, ShoppingBag, Scissors, Award, Sparkles, HeartHandshake 
} from 'lucide-react';

export default function Navbar({ onOpenThemeModal }) {
  const { mode, toggleMode, primaryColor } = useTheme();
  const { 
    currentView, setCurrentView, activeRole, setActiveRole, 
    businessMode, setBusinessMode, gymProfile 
  } = useGymData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);

  const roles = [
    { id: 'owner', label: 'Owner / Founder', icon: '👑', desc: 'Full financial & admin control' },
    { id: 'counter', label: 'Front Desk / Reception', icon: '🖥️', desc: 'Fast check-ins & POS counter' },
    { id: 'trainer', label: 'Trainer / Stylist', icon: '💇', desc: 'Client sessions & commission ledger' },
    { id: 'member', label: 'Client / Member App', icon: '📱', desc: 'Pass, appointments & workout streaks' },
  ];

  const businessModes = [
    { id: 'hybrid', label: '⚡ Hybrid (Gym + Salon & Spa)', desc: 'Fitness + Beauty & Wellness Club' },
    { id: 'gym', label: '🏋️ Pure Gym & Fitness', desc: 'Weights, cardio, classes & memberships' },
    { id: 'salon', label: '💅 Luxury Salon & Spa', desc: 'Hair, aesthetics, facials & massages' },
  ];

  const appNavItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Scissors, badge: 'Salon' },
    { id: 'retailpos', label: 'Retail POS', icon: ShoppingBag, badge: 'Store' },
    { id: 'members', label: 'Clients & Roster', icon: Users },
    { id: 'checkin', label: 'Check-In Desk', icon: CalendarCheck },
    { id: 'commissions', label: 'Commissions', icon: Award, badge: 'Payroll' },
    { id: 'clientcards', label: 'Client Cards', icon: FileText, badge: 'Formulas' },
    { id: 'invoices', label: 'Invoices', icon: Receipt },
    { id: 'whatsapp', label: 'WhatsApp Hub', icon: MessageSquare },
    { id: 'website', label: 'Club Website', icon: Globe },
    { id: 'expenses', label: 'P&L / Profit', icon: DollarSign },
  ];

  const isLandingOrDeck = currentView === 'landing' || currentView === 'deck';

  return (
    <header className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--color-border)',
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div className="container-wide" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        {/* Brand Logo & Business Mode Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setCurrentView('landing')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: 0,
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '11px',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.25rem',
              boxShadow: '0 0 20px var(--color-primary-glow)',
            }}>
              ⚡
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.18rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
            }}>
              Zenith<span style={{ color: 'var(--color-primary)' }}>Soft</span>
            </span>
          </button>

          {/* Quick Business Personality Selector */}
          <div className="desktop-only" style={{ position: 'relative' }}>
            <button
              onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <span>{businessModes.find(b => b.id === businessMode)?.label.split(' ')[0]}</span>
              <span style={{ color: 'var(--color-primary)' }}>{businessMode.toUpperCase()}</span>
              <ChevronDown size={12} />
            </button>

            {businessDropdownOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  top: '110%',
                  left: 0,
                  width: '260px',
                  padding: '6px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border-strong)',
                  boxShadow: 'var(--shadow-float)',
                  zIndex: 60,
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-faint)', textTransform: 'uppercase' }}>
                  Select Business Personality
                </div>
                {businessModes.map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setBusinessMode(b.id);
                      setBusinessDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-xs)',
                      border: 'none',
                      backgroundColor: businessMode === b.id ? 'var(--color-primary-light)' : 'transparent',
                      color: businessMode === b.id ? 'var(--color-primary)' : 'var(--color-text)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      fontWeight: businessMode === b.id ? 700 : 500,
                    }}
                  >
                    <p style={{ fontWeight: 700 }}>{b.label}</p>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>{b.desc}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Nav Switcher Pill */}
          <div className="desktop-only" style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--color-surface-raised)', padding: '3px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setCurrentView('landing')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: currentView === 'landing' ? 'var(--color-surface)' : 'transparent',
                color: currentView === 'landing' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              Public Site
            </button>
            <button
              onClick={() => setCurrentView('deck')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: currentView === 'deck' ? 'var(--color-surface)' : 'transparent',
                color: currentView === 'deck' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              Deck (Hybrid)
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: !isLandingOrDeck ? 'var(--color-primary)' : 'transparent',
                color: !isLandingOrDeck ? 'var(--color-on-primary)' : 'var(--color-text-muted)',
                fontWeight: 800,
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              Launch Platform ⚡
            </button>
          </div>
        </div>

        {/* Center / Portal Navigation (When in SaaS App mode) */}
        {!isLandingOrDeck && (
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', maxWidth: '440px', padding: '0 4px' }}>
            {appNavItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: isActive ? 'var(--color-surface-raised)' : 'transparent',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.78125rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Icon size={14} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Actions: Role Selector, Color Customizer, Dark Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Multi-Role Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="btn-secondary"
              style={{
                fontSize: '0.75rem',
                padding: '5px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              <span>{roles.find(r => r.id === activeRole)?.icon}</span>
              <span className="desktop-only">{roles.find(r => r.id === activeRole)?.label.split(' ')[0]}</span>
              <ChevronDown size={12} />
            </button>

            {roleDropdownOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '240px',
                  padding: '6px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border-strong)',
                  boxShadow: 'var(--shadow-float)',
                  zIndex: 60,
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-faint)', textTransform: 'uppercase' }}>
                  Switch Active Portal Role
                </div>
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setActiveRole(r.id);
                      setRoleDropdownOpen(false);
                      if (r.id === 'member') setCurrentView('landing');
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-xs)',
                      border: 'none',
                      backgroundColor: activeRole === r.id ? 'var(--color-surface-raised)' : 'transparent',
                      color: activeRole === r.id ? 'var(--color-primary)' : 'var(--color-text)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.8125rem',
                      fontWeight: activeRole === r.id ? 700 : 500,
                    }}
                  >
                    <span>{r.icon}</span>
                    <div>
                      <p style={{ lineHeight: 1.2 }}>{r.label}</p>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>{r.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Customizer Button */}
          <button
            onClick={onOpenThemeModal}
            style={{
              padding: '6px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-raised)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: 'var(--color-text)',
              fontSize: '0.75rem',
              fontWeight: 600,
              boxShadow: '0 0 15px -3px var(--color-primary-glow)',
            }}
          >
            <span style={{
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              backgroundColor: primaryColor,
              boxShadow: `0 0 8px ${primaryColor}`,
            }}></span>
            <Palette size={14} color="var(--color-primary)" />
            <span className="desktop-only">Theme</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleMode}
            className="btn-ghost"
            style={{ padding: '7px', borderRadius: '50%' }}
          >
            {mode === 'dark' ? <Sun size={16} color="var(--color-primary)" /> : <Moon size={16} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-only btn-ghost"
            style={{ padding: '6px' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 'var(--header-height)',
          insetInline: 0,
          bottom: 0,
          backgroundColor: 'var(--color-bg)',
          zIndex: 45,
          padding: '20px',
          overflowY: 'auto',
          borderTop: '1px solid var(--color-border)',
        }}>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-faint)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Select Modules
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {appNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setCurrentView(item.id); setMobileMenuOpen(false); }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: isActive ? 'var(--color-primary-light)' : 'var(--color-surface)',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                      textAlign: 'left',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={18} />
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
