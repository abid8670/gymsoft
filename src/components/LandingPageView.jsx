import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import MemberAppMockup from './MemberAppMockup';
import PricingCalculator from './PricingCalculator';
import InvoicePdfModal from './InvoicePdfModal';
import { 
  ArrowRight, Check, Play, Smartphone, MessageSquare, 
  CreditCard, Calendar, ShieldCheck, Globe, Users, 
  Flame, Zap, ChevronDown, ChevronUp, Star, Sparkles, 
  Scissors, ShoppingBag, Award, HeartPulse, Building2,
  Lock, Send, CheckCheck, QrCode, Bot, Clock, HelpCircle
} from 'lucide-react';

export default function LandingPageView({ onEnterApp, onViewDeck, onViewDirectory }) {
  const { 
    invoices, salonServices, currencyObj, 
    openAuthModal, openUpgradeModal, currentUser, setCurrentView 
  } = useGymData();
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const reasons = [
    {
      num: '01',
      title: 'Stop Missed Appointments & No-Shows',
      desc: 'Automatic WhatsApp reminders reach your clients 24 hours and 2 hours before their booking. Your salon chairs and fitness classes stay full, cutting no-shows by up to 80%.',
      icon: Clock,
      color: '#25d366',
    },
    {
      num: '02',
      title: 'Replace Messy Paper Registers Forever',
      desc: '1-second check-ins with QR codes or phone numbers. All client consultation notes, hair dye formulas, and membership histories are organized securely in one place.',
      icon: Users,
      color: 'var(--color-primary)',
    },
    {
      num: '03',
      title: 'Zero Payday Disputes on Staff Commissions',
      desc: 'Hair stylists get their service commission (20% to 30%) and fitness trainers get their personal training splits automatically calculated. Accurate, transparent, and instant.',
      icon: Award,
      color: '#ff2a85',
    },
    {
      num: '04',
      title: 'Multi-Role Staff Logins Protected by Super Admin',
      desc: 'Create individual logins for front-desk receptionists, hair stylists, and personal trainers. Every employee account is verified by Super Admin before activation for complete peace of mind.',
      icon: ShieldCheck,
      color: '#3b82f6',
    },
    {
      num: '05',
      title: 'First Month 100% Free — No Credit Card Needed',
      desc: 'Test drive every feature for 30 days without spending a single dollar. If you love it, pay just $1 (Rs 250) per active client per month. If a client doesn’t visit, you pay $0 for them!',
      icon: Sparkles,
      color: '#f59e0b',
    },
  ];

  const faqs = [
    {
      q: 'Can I use this software for a Salon, a Gym, or both combined?',
      a: 'Yes! The software includes a 1-click Business Personality switcher. You can operate strictly as a Beauty Salon & Spa, strictly as a Fitness Gym, or as a Hybrid Club where members enjoy both workouts and grooming/spa appointments under one pass.'
    },
    {
      q: 'How do automated WhatsApp reminders work?',
      a: 'ZenithSoft schedules automated WhatsApp reminders for appointments, membership renewals, and class timing updates. Messages dispatch directly to your clients so you never lose revenue to forgotten bookings or overdue fees.'
    },
    {
      q: 'Can I create separate logins for my staff?',
      a: 'Yes! You can create custom staff logins for Front Desk Receptionists, Hair Stylists, Fitness Trainers, and Branch Managers. Each staff member only sees their allowed tools, and every new employee login is verified by Super Admin for safety.'
    },
    {
      q: 'Can Super Admin manage multiple gyms and salons?',
      a: 'Yes! The central SaaS portal allows Super Admin to oversee multiple branches, approve employee accounts created by owners, register new gyms and salons, and monitor overall SaaS revenue.'
    },
    {
      q: 'How much does ZenithSoft cost after the free trial?',
      a: 'Your first 30 days (1 month) are completely free with no credit card required. Afterwards, it is just $1 (Rs 250) per active client per month. If a member does not visit in a month, you pay $0 for them.'
    },
    {
      q: 'Can salon stylists save hair dye formulas and skin allergy cards?',
      a: 'Yes! Each client has a dedicated Consultation Card where staff can record hair color formulas, patch test results, and skin allergies so every client receives 5-star personalized service.'
    }
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background ambient lighting */}
      <div className="bg-ambient" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none', zIndex: 0 }} />

      {/* ================= HERO SECTION ================= */}
      <section style={{ position: 'relative', zIndex: 1, paddingTop: '48px', paddingBottom: '70px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            alignItems: 'center',
            gap: '48px',
          }}>
            {/* Left Hero Copy */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* Product Pill */}
              <div 
                onClick={onViewDeck}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border-strong)',
                  backgroundColor: 'var(--color-surface)',
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  marginBottom: '20px',
                }}
              >
                <span style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                  fontWeight: 800,
                  fontSize: '0.6875rem',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}>
                  ALL-IN-ONE SAAS
                </span>
                <span>Gyms, Beauty Salons & Spas · $1 / client</span>
                <ArrowRight size={14} color="var(--color-primary)" />
              </div>

              {/* Main Headline */}
              <h1 style={{
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '20px',
              }}>
                The Operating System for <span style={{ color: 'var(--color-primary)' }}>Your Gym & Beauty Salon</span>
              </h1>

              {/* Subheading */}
              <p style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                marginBottom: '32px',
                maxWidth: '600px',
              }}>
                Workouts, salon chair booking, HydraFacials, QR check-in terminal, automatic renewal bills, and free client WhatsApp reminders. Run your business effortlessly from your phone or laptop.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '22px', width: '100%' }}>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="btn-primary"
                  style={{
                    padding: '14px 28px',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    boxShadow: '0 0 25px -4px var(--color-primary-glow)',
                  }}
                >
                  🎁 Start Free Now — 30 Days Free <Zap size={18} />
                </button>

                <button
                  onClick={() => openAuthModal('demo')}
                  className="btn-secondary"
                  style={{ padding: '14px 22px', fontSize: '0.9375rem', fontWeight: 700 }}
                >
                  ⚡ Try Live Demo
                </button>

                <button
                  onClick={onViewDeck}
                  className="btn-ghost"
                  style={{ padding: '14px 18px', fontSize: '0.875rem' }}
                >
                  <Play size={15} /> 22-Slide Pitch Deck
                </button>
              </div>

              {/* Highlights */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '22px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} color="var(--color-primary)" /> Salon Appointments + Hair Cards
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} color="var(--color-primary)" /> Automated WhatsApp Reminders & Schedules
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} color="var(--color-primary)" /> Super Admin Verified Staff Logins
                </span>
              </div>

              {/* Trust Callout For Local & First-time Salon/Gym Owners */}
              <div style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.75rem' }}>💅</span>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-text)', margin: 0 }}>
                      Effortlessly Simple For Any Gym or Salon Owner
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
                      No tech background required · Zero setup fee · Works smoothly on mobile & laptop!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="badge badge-primary"
                  style={{ padding: '6px 12px', cursor: 'pointer', border: 'none', fontWeight: 800 }}
                >
                  Try It Now Free →
                </button>
              </div>
            </div>

            {/* Right Hero: Interactive Smartphone Mockup with Floating Badges */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {/* Floating notification badge: Salon Appointment */}
              <div
                className="glass"
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '-14px',
                  zIndex: 20,
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: 'var(--shadow-float)',
                  animation: 'float 5s ease-in-out infinite',
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#ff2a85',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Scissors size={16} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, margin: 0 }}>HydraFacial Booked</p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)', margin: 0 }}>Today at 03:00 PM · Dr. Hina</p>
                </div>
              </div>

              {/* Floating notification badge: WhatsApp Auto reminder */}
              <div
                className="glass"
                style={{
                  position: 'absolute',
                  bottom: '14%',
                  right: '-14px',
                  zIndex: 20,
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: 'var(--shadow-float)',
                  animation: 'float-slow 6s ease-in-out infinite',
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#25d366',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <MessageSquare size={16} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, margin: 0 }}>WhatsApp Reminder Sent</p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)', margin: 0 }}>HydraFacial 03:00 PM Confirmed ✓✓</p>
                </div>
              </div>

              {/* Realistic Interactive Phone Mockup */}
              <MemberAppMockup
                onDownloadInvoice={() => setSelectedInvoice(invoices[0])}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ZENITHSOFT (REASONS SECTION) ================= */}
      <section style={{ padding: '70px 0', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '10px' }}>
              Why Owners Choose ZenithSoft
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900 }}>
              Built To Solve The Everyday Headaches Of Running A Gym & Salon
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '640px', margin: '8px auto 0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
              Here is why smart fitness studio and luxury salon founders rely on ZenithSoft to automate their operations:
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {reasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: '28px',
                    backgroundColor: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-surface)',
                      color: reason.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--color-border)',
                    }}>
                      <Icon size={22} />
                    </div>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-text-faint)', fontFamily: 'var(--font-display)' }}>
                      {reason.num}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-text)' }}>
                    {reason.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {reason.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button
              onClick={() => openAuthModal('signup')}
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '1rem', fontWeight: 800 }}
            >
              Start Free Trial Now — 30 Days Free 🎁
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" style={{ padding: '70px 0', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-raised)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '10px' }}>
              Complete Feature Suite
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
              Everything in One Place — Say Goodbye to Paper Registers!
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '640px', margin: '8px auto 0 auto' }}>
              Designed specifically for beauty salons, aesthetic spas, and fitness gyms. Simple for staff, powerful for owners.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {/* Feature 1 */}
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>Owner & Staff Logins</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Owners create logins for front-desk receptionists, stylists, and trainers. All employee logins are verified by Super Admin before activation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(37, 211, 102, 0.15)', color: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <MessageSquare size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>WhatsApp Reminders & Updates</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Schedule automated appointment alerts, fee renewal notices, and timing updates to your clients via WhatsApp. No more forgotten bookings!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(255, 42, 133, 0.15)', color: '#ff2a85', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Scissors size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>Salon Chair Scheduler & Formulas</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Book hair styling chairs, HydraFacial rooms, and massage beds in seconds. Save color dye formulas and skin allergy cards for every client.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Building2 size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>Multi-Club SaaS Portal</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Manage multiple branches or locations with a single master SaaS account. Switch between your clubs and salons with one click.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Award size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>Automated Commissions & Payroll</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Hair stylist service cuts (20% to 30%) and fitness trainer session splits are automatically calculated. Eliminate payroll math errors.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShoppingBag size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>Retail POS & Products</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Sell whey proteins, workout gear, Moroccan hair oils, and skincare serums at reception in one tap with professional printable receipts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SALONS SECTION ================= */}
      <section id="salons" style={{ padding: '70px 0', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}>
            <div>
              <span className="badge" style={{ backgroundColor: 'rgba(255, 42, 133, 0.15)', color: '#ff2a85', border: '1px solid rgba(255, 42, 133, 0.3)', marginBottom: '12px' }}>
                💅 Luxury Salons, Spas & Aesthetics
              </span>
              <h2 style={{ fontSize: '2.3rem', fontWeight: 900, lineHeight: 1.15, marginBottom: '18px' }}>
                Tailored for Hair Stylists, Beauticians & Spa Therapists
              </h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                Running your salon is now effortless. From appointment booking to hair color formula tracking and automated stylist commissions, everything runs on autopilot.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(255, 42, 133, 0.2)', color: '#ff2a85', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Stylist Chair Appointment Scheduler</h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>Every chair and treatment room has its own time slot, preventing double-bookings.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(255, 42, 133, 0.2)', color: '#ff2a85', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Client Consultation Cards & Formulas</h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>Save client hair dye shades, developer ratios, and skin allergy notes securely.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(255, 42, 133, 0.2)', color: '#ff2a85', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Automated WhatsApp 2-Hr Booking Reminders</h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>Clients receive a courteous reminder 2 hours before their session so they arrive on time.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openAuthModal('signup')}
                className="btn-primary"
                style={{ padding: '12px 24px', fontWeight: 800 }}
              >
                Register Your Salon — 1-Month Free 🎁
              </button>
            </div>

            {/* Salon Feature Visual Card */}
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)', border: '1.5px solid rgba(255, 42, 133, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.5rem' }}>💇‍♀️</span>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Live Chair Schedule</h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', margin: 0 }}>4 Stylists On Floor Today</p>
                  </div>
                </div>
                <span className="badge" style={{ backgroundColor: 'rgba(255, 42, 133, 0.15)', color: '#ff2a85' }}>Active</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { time: '02:00 PM', client: 'Ayesha Khan', service: 'HydraFacial Glow Deluxe', stylist: 'Dr. Hina', price: '$65' },
                  { time: '03:30 PM', client: 'Zara Sheikh', service: 'Balayage & Olaplex Treatment', stylist: 'Sana Malik', price: '$95' },
                  { time: '04:45 PM', client: 'Mahnoor Ali', service: 'Aromatherapy Back Massage', stylist: 'Komal Rao', price: '$50' },
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface-raised)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.84rem', margin: 0 }}>{item.client} · <span style={{ color: '#ff2a85' }}>{item.service}</span></p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>{item.time} · Stylist: {item.stylist}</p>
                    </div>
                    <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GYMS SECTION ================= */}
      <section id="gyms" style={{ padding: '70px 0', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-raised)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}>
            {/* Gym Visual Card */}
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border-glow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.5rem' }}>🏋️</span>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Front Desk Check-In Terminal</h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', margin: 0 }}>QR Barcode Scanner Active</p>
                  </div>
                </div>
                <span className="badge badge-success">Online</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'Hamza Tariq', plan: 'Iron Pro Annual', time: 'Just Now', streak: '🔥 18 Days Streak' },
                  { name: 'Bilal Ahmed', plan: 'CrossFit Monthly', time: '2m ago', streak: '🔥 9 Days Streak' },
                  { name: 'Usman Farooq', plan: 'Personal Training VIP', time: '11m ago', streak: '🔥 24 Days Streak' },
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface-raised)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.84rem', margin: 0 }}>{item.name}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>{item.plan} · Checked in {item.time}</p>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b' }}>{item.streak}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
                🏋️ Fitness Gyms & CrossFit Studios
              </span>
              <h2 style={{ fontSize: '2.3rem', fontWeight: 900, lineHeight: 1.15, marginBottom: '18px' }}>
                Boost Member Retention & Check-In Speed
              </h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                Keep your members committed. Automated invoices dispatch to WhatsApp when memberships expire, and workout streaks motivate members to show up consistently!
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Barcode & QR Member Digital Pass</h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>Members scan their QR pass or state their phone number — check-in takes only 1 second.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Personal Trainer Client Splitting</h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>Coaches track training sessions and earned splits automatically on their mobile portal.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Fee Recovery & Expiry Reminders</h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>Invoices and payment links reach members automatically so fees are collected on time.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openAuthModal('signup')}
                className="btn-primary"
                style={{ padding: '12px 24px', fontWeight: 800 }}
              >
                Register Your Gym — 1-Month Free 🎁
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHATSAPP REMINDERS & SCHEDULE UPDATES SECTION ================= */}
      <section id="whatsapp-info" style={{ padding: '80px 0', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge" style={{ backgroundColor: 'rgba(37, 211, 102, 0.15)', color: '#25d366', border: '1px solid rgba(37, 211, 102, 0.3)', marginBottom: '10px' }}>
              💬 Automated Client Communication
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900 }}>
              Send Automated WhatsApp Reminders & Schedule Updates to Clients
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '720px', margin: '8px auto 0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
              Send scheduled reminders for salon appointments, track gym renewal dues, and broadcast schedule updates automatically. Cut no-shows by 80% and collect fees on time.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}>
            {/* WhatsApp Advantage 1 */}
            <div className="card" style={{ padding: '28px', backgroundColor: 'var(--color-surface-raised)', border: '1px solid rgba(37, 211, 102, 0.25)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(37, 211, 102, 0.2)', color: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Calendar size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>Salon Appointment Reminders</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Automatic alerts dispatch 24 hours and 2 hours before appointments. Clients see their date, time, and assigned specialist so chairs are never left vacant.
              </p>
            </div>

            {/* WhatsApp Advantage 2 */}
            <div className="card" style={{ padding: '28px', backgroundColor: 'var(--color-surface-raised)', border: '1px solid rgba(37, 211, 102, 0.25)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(37, 211, 102, 0.2)', color: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>Schedule & Timing Updates</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                If a trainer session timing changes, a salon chair is rescheduled, or a fitness class timetable updates, clients get notified instantly on WhatsApp.
              </p>
            </div>

            {/* WhatsApp Advantage 3 */}
            <div className="card" style={{ padding: '28px', backgroundColor: 'var(--color-surface-raised)', border: '1px solid rgba(37, 211, 102, 0.25)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(37, 211, 102, 0.2)', color: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Send size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>Fee Renewal Notices & Direct Chat</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Send automated payment receipts and renewal invoices before memberships expire. Live 1-on-1 direct chat with double blue tick delivery status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING SECTION ================= */}
      <section id="pricing" style={{ padding: '80px 0', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <PricingCalculator onStartFree={() => openAuthModal('signup')} />
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" style={{ padding: '70px 0', backgroundColor: 'var(--color-surface-raised)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '10px' }}>
              FAQ & Clear Answers
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: '18px 22px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                      {faq.q}
                    </h4>
                    {isOpen ? <ChevronUp size={18} color="var(--color-primary)" /> : <ChevronDown size={18} />}
                  </div>
                  {isOpen && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '12px', lineHeight: 1.6, margin: '12px 0 0 0' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CALL TO ACTION ================= */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        textAlign: 'center',
      }}>
        <div className="container">
          <span className="badge badge-primary" style={{ marginBottom: '14px' }}>
            🎁 1-Month Free Trial Available Now (30 Days)
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '16px' }}>
            Put Your Gym or Salon On <span style={{ color: 'var(--color-primary)' }}>Autopilot</span> Today
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '580px', margin: '0 auto 32px auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Run your first 30 days completely FREE. No credit card required. Only $1 / Rs 250 per active client if you choose to continue!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => openAuthModal('signup')}
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '1.05rem', fontWeight: 800 }}
            >
              🎁 Start Free Now (30 Days Free) <Zap size={18} />
            </button>
            <button
              onClick={() => openUpgradeModal()}
              className="btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1.05rem', fontWeight: 700 }}
            >
              ⚡ Try Interactive Demo
            </button>
            <button
              onClick={onViewDeck}
              className="btn-ghost"
              style={{ padding: '14px 24px', fontSize: '1rem' }}
            >
              Browse 22-Slide Deck
            </button>
          </div>
        </div>
      </section>

      {/* PDF Modal */}
      <InvoicePdfModal
        invoice={selectedInvoice}
        isOpen={Boolean(selectedInvoice)}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
}
