import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useGymData } from '../context/GymDataContext';
import apiClient from '../services/apiClient';
import { 
  Palette, Sun, Moon, Zap, Menu, X, Users, 
  ChevronDown, LayoutDashboard, CalendarCheck, Receipt, 
  MessageSquare, Globe, Building2, DollarSign, FileText, 
  ShoppingBag, Scissors, Award, Sparkles, ShieldCheck,
  Gift, LogIn, LogOut, ArrowRight, CheckCircle2, ChevronRight,
  Database
} from 'lucide-react';

export default function Navbar({ onOpenThemeModal }) {
  const { mode, toggleMode, primaryColor } = useTheme();
  const { 
    currentView, setCurrentView, activeRole, setActiveRole, 
    businessMode, setBusinessMode, gymProfile,
    currentUser, openAuthModal, openUpgradeModal, logout 
  } = useGymData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [moreNavOpen, setMoreNavOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState({ available: false, dbType: 'loading...' });

  useEffect(() => {
    apiClient.checkHealth().then(status => {
      setDbStatus(status);
    });
  }, []);

  const isLanding = currentView === 'landing';

  const roles = [
    { id: 'superadmin', label: 'Super Admin', icon: '🛡️', desc: 'Global SaaS Control & Staff Approvals' },
    { id: 'owner', label: 'Owner / Founder', icon: '👑', desc: 'Full financial, SaaS & staff control' },
    { id: 'counter', label: 'Front Desk / Reception', icon: '🖥️', desc: 'Quick check-ins, bookings & POS' },
    { id: 'trainer', label: 'Trainer / Hair Stylist', icon: '💇', desc: 'Client sessions & commission ledger' },
    { id: 'member', label: 'Client / Member App', icon: '📱', desc: 'Digital pass & appointment history' },
  ];

  const businessModes = [
    { id: 'hybrid', label: '⚡ Hybrid (Gym + Salon & Spa)', desc: 'Fitness + Beauty & Wellness Club' },
    { id: 'gym', label: '🏋️ Pure Gym & Fitness', desc: 'Weights, cardio, classes & memberships' },
    { id: 'salon', label: '💅 Luxury Salon & Spa', desc: 'Hair, aesthetics, facials & massages' },
  ];

  const primaryAppNav = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Scissors, badge: 'Salon' },
    { id: 'retailpos', label: 'Retail POS', icon: ShoppingBag, badge: 'Store' },
    { id: 'members', label: 'Clients', icon: Users },
    { id: 'staff', label: 'Staff Logins', icon: ShieldCheck, badge: 'Roles' },
    { id: 'saas', label: 'Multi-Club SaaS', icon: Building2, badge: 'Admin' },
    { id: 'whatsapp', label: 'WhatsApp Hub', icon: MessageSquare, badge: 'Reminders' },
  ];

  const secondaryAppNav = [
    { id: 'checkin', label: 'Check-In Desk', icon: CalendarCheck },
    { id: 'commissions', label: 'Commissions & Payroll', icon: Award },
    { id: 'clientcards', label: 'Client Cards & Formulas', icon: FileText },
    { id: 'invoices', label: 'Invoices & Billing', icon: Receipt },
    { id: 'expenses', label: 'P&L / Expenses', icon: DollarSign },
    { id: 'website', label: 'Public Club Website', icon: Globe },
    { id: 'deck', label: 'Hybrid Pitch Deck', icon: Sparkles },
  ];

  const marketingLinks = [
    { href: '#features', label: 'Features' },
    { href: '#salons', label: 'For Salons & Spas' },
    { href: '#gyms', label: 'For Gyms & Fitness' },
    { href: '#whatsapp-info', label: 'WhatsApp Reminders' },
    { href: '#pricing', label: 'Pricing ($1/Client)' },
    { href: '#faq', label: 'FAQ' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        
        {/* ================= LEFT SECTION ================= */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Brand Logo */}
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
            title="ZenithSoft - Gym & Salon SaaS"
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
            <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.18rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
              }}>
                Zenith<span style={{ color: 'var(--color-primary)' }}>Soft</span>
              </span>
              <p style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)', fontWeight: 600, margin: 0 }}>
                Gym & Salon SaaS
              </p>
            </div>
          </button>

          {/* SaaS Operational Platform Controls (Shown ONLY when inside the app, NEVER on landing page) */}
          {!isLanding && (
            <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '6px' }}>
              {/* Back to Public Marketing Site */}
              <button
                onClick={() => setCurrentView('landing')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                title="View Public Marketing Homepage"
              >
                <Globe size={12} />
                <span>Marketing Site</span>
              </button>

              {/* Business Mode Selector Dropdown */}
              <div style={{ position: 'relative' }}>
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
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <span>{businessModes.find(b => b.id === businessMode)?.label.split(' ')[0]}</span>
                  <span style={{ color: 'var(--color-primary)' }}>{businessMode.toUpperCase()}</span>
                  <ChevronDown size={11} />
                </button>

                {businessDropdownOpen && (
                  <div
                    className="card"
                    style={{
                      position: 'absolute',
                      top: '115%',
                      left: 0,
                      width: '260px',
                      padding: '6px',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border-strong)',
                      boxShadow: 'var(--shadow-float)',
                      zIndex: 60,
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <div style={{ padding: '6px 10px', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-faint)', textTransform: 'uppercase' }}>
                      Business Personality
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
                        <p style={{ fontWeight: 700, margin: 0 }}>{b.label}</p>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)', margin: '2px 0 0 0' }}>{b.desc}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Multi-DB Engine Status Pill */}
              <button
                onClick={() => setCurrentView('saas')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
                title="Active Database Engine: Neon / MySQL / SQLite (Click to open SaaS Multi-DB Panel)"
              >
                <Database size={11} color={dbStatus.available ? '#10b981' : 'var(--color-primary)'} />
                <span style={{ color: dbStatus.available ? 'var(--color-success)' : 'var(--color-primary)' }}>
                  {dbStatus.dbType?.toUpperCase() || 'DB'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* ================= CENTER NAVIGATION ================= */}
        {isLanding ? (
          /* Public Landing Page Marketing Links (Clean, Informative & Clear) */
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            {marketingLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : (
          /* Inside SaaS App: Operational Navigation Tabs */
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', padding: '0 4px' }}>
            {primaryAppNav.map((item) => {
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
                  <span>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      fontSize: '0.625rem',
                      padding: '1px 5px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface-raised)',
                      color: isActive ? 'var(--color-on-primary)' : 'var(--color-text-faint)',
                      fontWeight: 700,
                    }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* More Modules Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setMoreNavOpen(!moreNavOpen)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-muted)',
                  fontSize: '0.78125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>More</span>
                <ChevronDown size={12} />
              </button>

              {moreNavOpen && (
                <div
                  className="card"
                  style={{
                    position: 'absolute',
                    top: '115%',
                    right: 0,
                    width: '210px',
                    padding: '6px',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border-strong)',
                    boxShadow: 'var(--shadow-float)',
                    zIndex: 65,
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div style={{ padding: '6px 10px', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-faint)', textTransform: 'uppercase' }}>
                    Extra Tools & Operations
                  </div>
                  {secondaryAppNav.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = currentView === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setCurrentView(sub.id);
                          setMoreNavOpen(false);
                        }}
                        style={{
                          width: '100%',
                          padding: '7px 10px',
                          borderRadius: 'var(--radius-xs)',
                          border: 'none',
                          backgroundColor: isSubActive ? 'var(--color-surface-raised)' : 'transparent',
                          color: isSubActive ? 'var(--color-primary)' : 'var(--color-text)',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.78125rem',
                          fontWeight: isSubActive ? 700 : 500,
                        }}
                      >
                        <SubIcon size={14} />
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
        )}

        {/* ================= RIGHT ACTIONS ================= */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          {/* === WHEN ON LANDING PAGE === */}
          {isLanding ? (
            <>
              {/* If user not logged in: Clean Sign In + 1-Month Free Trial CTA */}
              {!currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="btn-ghost"
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      padding: '7px 14px',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    <LogIn size={15} /> Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="btn-primary"
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      padding: '7px 16px',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: '0 0 16px -2px var(--color-primary-glow)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Gift size={15} /> Start 1-Month Free Trial
                  </button>
                </div>
              ) : (
                /* If user is ALREADY logged in on Landing Page: Show Launch Platform CTA + User Menu */
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="btn-primary"
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      padding: '7px 14px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <LayoutDashboard size={15} /> Open Platform ⚡
                  </button>

                  {/* User Profile Mini Dropdown */}
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 10px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--color-surface-raised)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.7rem',
                      }}>
                        {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                      </div>
                      <span className="desktop-only">{currentUser.businessName || currentUser.name}</span>
                      <ChevronDown size={11} />
                    </button>

                    {userDropdownOpen && (
                      <div
                        className="card"
                        style={{
                          position: 'absolute',
                          top: '115%',
                          right: 0,
                          width: '260px',
                          padding: '12px',
                          backgroundColor: 'var(--color-surface)',
                          border: '1px solid var(--color-border-strong)',
                          boxShadow: 'var(--shadow-float)',
                          zIndex: 70,
                          borderRadius: 'var(--radius-md)',
                        }}
                      >
                        <div style={{ paddingBottom: '10px', marginBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                          <p style={{ fontWeight: 800, fontSize: '0.875rem', margin: 0 }}>{currentUser.businessName}</p>
                          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>{currentUser.email || currentUser.phone}</p>
                          <span className="badge badge-success" style={{ fontSize: '0.625rem', marginTop: '6px' }}>
                            🎁 1-Month Free Trial Active
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <button
                            onClick={() => { setCurrentView('dashboard'); setUserDropdownOpen(false); }}
                            style={{
                              padding: '7px 10px',
                              borderRadius: 'var(--radius-xs)',
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: 'var(--color-text)',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <LayoutDashboard size={14} color="var(--color-primary)" />
                            <span>Go to Dashboard</span>
                          </button>
                          <button
                            onClick={() => { setCurrentView('staff'); setUserDropdownOpen(false); }}
                            style={{
                              padding: '7px 10px',
                              borderRadius: 'var(--radius-xs)',
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: 'var(--color-text)',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <ShieldCheck size={14} color="var(--color-primary)" />
                            <span>Staff Logins & Roles</span>
                          </button>
                          <button
                            onClick={() => { setCurrentView('saas'); setUserDropdownOpen(false); }}
                            style={{
                              padding: '7px 10px',
                              borderRadius: 'var(--radius-xs)',
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: 'var(--color-text)',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <Building2 size={14} color="var(--color-primary)" />
                            <span>Multi-Club SaaS Panel</span>
                          </button>
                          <button
                            onClick={() => { logout(); setUserDropdownOpen(false); }}
                            style={{
                              padding: '7px 10px',
                              borderRadius: 'var(--radius-xs)',
                              border: 'none',
                              backgroundColor: 'rgba(239, 68, 68, 0.08)',
                              color: 'var(--color-danger)',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginTop: '4px',
                            }}
                          >
                            <LogOut size={14} />
                            <span>Log Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* === WHEN INSIDE SAAS APP === */
            <>
              {/* User Account Dropdown */}
              {currentUser && (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border-strong)',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                    }}>
                      {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                    </div>
                    <div style={{ textAlign: 'left', lineHeight: 1.1 }} className="desktop-only">
                      <div style={{ fontWeight: 800, fontSize: '0.75rem' }}>{currentUser.businessName || currentUser.name}</div>
                      <div style={{ fontSize: '0.625rem', color: 'var(--color-success)', fontWeight: 700 }}>
                        {currentUser.isTrial ? '● 1-Month Free Starter' : '● Pro Active'}
                      </div>
                    </div>
                    <ChevronDown size={12} />
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="card"
                      style={{
                        position: 'absolute',
                        top: '115%',
                        right: 0,
                        width: '280px',
                        padding: '14px',
                        backgroundColor: 'var(--color-surface)',
                        border: '1.5px solid var(--color-border-glow)',
                        boxShadow: 'var(--shadow-float)',
                        zIndex: 70,
                        borderRadius: 'var(--radius-md)',
                      }}
                    >
                      {/* User Profile Info */}
                      <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--color-text-faint)', textTransform: 'uppercase' }}>
                            Active Business Account
                          </span>
                          <span className="badge badge-success" style={{ fontSize: '0.625rem' }}>
                            {currentUser.isTrial ? `${currentUser.trialDaysLeft || 30} Days Free` : 'Pro'}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--color-text)', margin: 0 }}>
                          {currentUser.businessName}
                        </h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
                          Owner: {currentUser.name} · {currentUser.phone}
                        </p>
                      </div>

                      {/* Free Trial / Upgrade CTA */}
                      {currentUser.isTrial && (
                        <div style={{
                          backgroundColor: 'var(--color-primary-light)',
                          border: '1px solid rgba(var(--color-primary-rgb), 0.3)',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          marginBottom: '12px',
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                              🎁 1-Month Free Starter
                            </span>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>$0 / Free</span>
                          </div>
                          <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                            Tamam Salon, Gym & WhatsApp engine features unlocked hain.
                          </p>
                          <button
                            onClick={() => { openUpgradeModal(); setUserDropdownOpen(false); }}
                            className="btn-primary"
                            style={{
                              width: '100%',
                              fontSize: '0.75rem',
                              padding: '6px 10px',
                              fontWeight: 800,
                            }}
                          >
                            <Zap size={14} /> Buy Pro ($1/client)
                          </button>
                        </div>
                      )}

                      {/* Quick Navigation inside SaaS */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <button
                          onClick={() => { setCurrentView('staff'); setUserDropdownOpen(false); }}
                          style={{
                            padding: '8px 10px',
                            borderRadius: 'var(--radius-xs)',
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: 'var(--color-text)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <ShieldCheck size={14} color="var(--color-primary)" />
                          <span>Staff Logins & Roles Portal</span>
                        </button>

                        <button
                          onClick={() => { setCurrentView('saas'); setUserDropdownOpen(false); }}
                          style={{
                            padding: '8px 10px',
                            borderRadius: 'var(--radius-xs)',
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: 'var(--color-text)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <Building2 size={14} color="var(--color-primary)" />
                          <span>Multi-Club SaaS Management</span>
                        </button>

                        <button
                          onClick={() => { logout(); setUserDropdownOpen(false); }}
                          style={{
                            padding: '8px 10px',
                            borderRadius: 'var(--radius-xs)',
                            border: 'none',
                            backgroundColor: 'rgba(239, 68, 68, 0.08)',
                            color: 'var(--color-danger)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <LogOut size={14} />
                          <span>Log Out (Session End)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Multi-Role Switcher Dropdown (Inside SaaS App) */}
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
                  title="Test or switch portal view as different role"
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
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <div style={{ padding: '6px 10px', fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-faint)', textTransform: 'uppercase' }}>
                      Simulate Portal Role
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
                          <p style={{ lineHeight: 1.2, margin: 0 }}>{r.label}</p>
                          <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>{r.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Customizer Button (Inside SaaS App) */}
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
                title="Club Theme & Branding Colors"
              >
                <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: primaryColor,
                  boxShadow: `0 0 8px ${primaryColor}`,
                }}></span>
                <Palette size={14} color="var(--color-primary)" />
                <span className="desktop-only">Theme</span>
              </button>

              {/* Direct Quick Log Out Button */}
              <button
                onClick={logout}
                className="btn-ghost"
                style={{
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--color-danger)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  backgroundColor: 'rgba(239, 68, 68, 0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                title="Log Out & Return to Landing Page"
              >
                <LogOut size={13} />
                <span className="desktop-only">Log Out</span>
              </button>
            </>
          )}

          {/* Dark / Light Toggle (Always available) */}
          <button
            onClick={toggleMode}
            className="btn-ghost"
            style={{ padding: '7px', borderRadius: '50%' }}
            title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
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
          {isLanding ? (
            /* Mobile Marketing Links */
            <div>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-faint)', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Explore ZenithSoft
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {marketingLinks.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        scrollToSection(e, link.href);
                        setMobileMenuOpen(false);
                      }}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} color="var(--color-text-muted)" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                {!currentUser ? (
                  <>
                    <button
                      onClick={() => { openAuthModal('signup'); setMobileMenuOpen(false); }}
                      className="btn-primary"
                      style={{ padding: '12px', borderRadius: 'var(--radius-sm)', fontWeight: 800, width: '100%' }}
                    >
                      <Gift size={16} /> Start 1-Month Free Trial
                    </button>
                    <button
                      onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                      className="btn-secondary"
                      style={{ padding: '12px', borderRadius: 'var(--radius-sm)', fontWeight: 700, width: '100%' }}
                    >
                      <LogIn size={16} /> Sign In
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }}
                    className="btn-primary"
                    style={{ padding: '12px', borderRadius: 'var(--radius-sm)', fontWeight: 800, width: '100%' }}
                  >
                    <LayoutDashboard size={16} /> Open Dashboard ⚡
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Mobile App Navigation */
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-faint)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Select SaaS Modules
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[...primaryAppNav, ...secondaryAppNav].map((item) => {
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
          )}
        </div>
      )}
    </header>
  );
}
