import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useGymData } from '../context/GymDataContext';
import { 
  Palette, Sun, Moon, Zap, Menu, X, Users, 
  ChevronDown, LayoutDashboard, CalendarCheck, Receipt, 
  MessageSquare, Globe, Building2, DollarSign, FileText, 
  Download, Smartphone, UserCircle2 
} from 'lucide-react';

export default function Navbar({ onOpenThemeModal }) {
  const { mode, toggleMode, primaryColor } = useTheme();
  const { 
    currentView, setCurrentView, activeRole, setActiveRole, 
    gymProfile 
  } = useGymData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles = [
    { id: 'owner', label: 'Gym Owner', icon: '👑', desc: 'Full financial & admin control' },
    { id: 'counter', label: 'Front Desk', icon: '🖥️', desc: 'Fast check-ins & fee counter' },
    { id: 'trainer', label: 'Trainer / Coach', icon: '🏋️', desc: 'Athlete attendance & notes' },
    { id: 'member', label: 'Member App', icon: '📱', desc: 'Personal check-in pass & streaks' },
  ];

  const appNavItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'checkin', label: 'Check-In Kiosk', icon: CalendarCheck },
    { id: 'invoices', label: 'Invoices', icon: Receipt },
    { id: 'whatsapp', label: 'WhatsApp Hub', icon: MessageSquare },
    { id: 'website', label: 'Gym Website', icon: Globe },
    { id: 'directory', label: 'Gyms Directory', icon: Building2 },
    { id: 'expenses', label: 'P&L / Profit', icon: DollarSign },
    { id: 'logs', label: 'Audit Logs', icon: FileText },
    { id: 'export', label: 'Export Data', icon: Download },
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
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
              transition: 'transform 0.2s ease',
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
              Gym<span style={{ color: 'var(--color-primary)' }}>Management</span>Soft
            </span>
          </button>

          {/* Quick Mode Switcher Pill */}
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
              Marketing Site
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
              22-Slide Deck
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
              Live App Demo ⚡
            </button>
          </div>
        </div>

        {/* Center / Portal Navigation (When in SaaS App mode) */}
        {!isLandingOrDeck && (
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', maxWidth: '480px', padding: '0 8px' }}>
            {appNavItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: isActive ? 'var(--color-surface-raised)' : 'transparent',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Multi-Role Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="btn-secondary"
              style={{
                fontSize: '0.78125rem',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: 'var(--radius-full)',
              }}
              title="Switch user role: Owner, Front Desk, Trainer, Member"
            >
              <span>{roles.find(r => r.id === activeRole)?.icon}</span>
              <span className="desktop-only">{roles.find(r => r.id === activeRole)?.label}</span>
              <ChevronDown size={13} />
            </button>

            {roleDropdownOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '230px',
                  padding: '6px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border-strong)',
                  boxShadow: 'var(--shadow-float)',
                  zIndex: 60,
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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

          {/* Theme Palette Customizer Button (Volt/Cyan/Rose/Picker) */}
          <button
            onClick={onOpenThemeModal}
            style={{
              padding: '7px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-raised)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: 'var(--color-text)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              boxShadow: '0 0 15px -3px var(--color-primary-glow)',
            }}
            title="Custom Theme & Color Presets"
          >
            <span style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: primaryColor,
              boxShadow: `0 0 8px ${primaryColor}`,
            }}></span>
            <Palette size={15} color="var(--color-primary)" />
            <span className="desktop-only" style={{ fontSize: '0.75rem' }}>Theme</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleMode}
            className="btn-ghost"
            style={{ padding: '8px', borderRadius: '50%' }}
            title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {mode === 'dark' ? <Sun size={17} color="var(--color-primary)" /> : <Moon size={17} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-only btn-ghost"
            style={{ padding: '8px' }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Public Views
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
                className="btn-secondary"
                style={{ fontSize: '0.8125rem', padding: '10px' }}
              >
                Marketing Home
              </button>
              <button
                onClick={() => { setCurrentView('deck'); setMobileMenuOpen(false); }}
                className="btn-secondary"
                style={{ fontSize: '0.8125rem', padding: '10px' }}
              >
                22-Slide Deck
              </button>
            </div>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Gym Management Modules
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
                      gap: '10px',
                    }}
                  >
                    <Icon size={18} />
                    {item.label}
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
