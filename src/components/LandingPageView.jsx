import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import MemberAppMockup from './MemberAppMockup';
import PricingCalculator from './PricingCalculator';
import InvoicePdfModal from './InvoicePdfModal';
import { 
  ArrowRight, Check, Play, Smartphone, MessageSquare, 
  CreditCard, Calendar, ShieldCheck, Globe, Users, 
  Flame, Zap, ChevronDown, ChevronUp, Star, Sparkles, QrCode
} from 'lucide-react';

export default function LandingPageView({ onEnterApp, onViewDeck, onViewDirectory }) {
  const { invoices } = useGymData();
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const faqs = [
    {
      q: 'What is Gym Management Soft?',
      a: 'It is an all-in-one cloud management platform that handles member subscriptions, automatic renewal invoices, front desk check-ins, WhatsApp reminders from your own number, and gives members an installable smartphone app.'
    },
    {
      q: 'How much does Gym Management Soft cost?',
      a: 'One transparent plan: $1 per active member per month. A gym with 40 active members pays $40. There are zero credit card requirements to start, no setup fees, and we never take a percentage of your member fee collection.'
    },
    {
      q: 'How does WhatsApp automation work without API charges?',
      a: 'You simply link your gym’s existing WhatsApp phone once using a quick QR code scan on the dashboard. Messages dispatch directly from your official WhatsApp number without expensive Meta Cloud API per-message fees.'
    },
    {
      q: 'Can my front desk staff use it without seeing owner financials?',
      a: 'Yes! The Counter login is designed specifically for reception: staff can check members in, register walk-ins, and record payments, while the gym owner retains private access to financial profits, expenses, and logs.'
    },
    {
      q: 'How do members get their app?',
      a: 'When you register a member with their WhatsApp number, they receive an instant magic link that logs them directly into their branded member app. They can tap to save it to their Android or iPhone home screen without any app store friction.'
    },
    {
      q: 'Do I get my own gym website and domain?',
      a: 'Yes. Every gym gets its own dedicated public website showcasing classes, trainer bios, timings, and plans. You can easily connect your own custom domain name (e.g. yourgym.com) with free automatic SSL.'
    }
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background ambient lighting */}
      <div className="bg-ambient" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none', zIndex: 0 }} />

      {/* HERO SECTION */}
      <section style={{ position: 'relative', zIndex: 1, paddingTop: '40px', paddingBottom: '70px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            alignItems: 'center',
            gap: '48px',
          }}>
            {/* Left Hero Copy */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* Pill */}
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
                  $1
                </span>
                <span>per active member · every feature included</span>
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
                Gym management software that runs your gym on <span style={{ color: 'var(--color-primary)' }}>autopilot</span>
              </h1>

              {/* Subheading */}
              <p style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                marginBottom: '32px',
                maxWidth: '600px',
              }}>
                Members, plans, subscriptions, branded invoices, check-ins and WhatsApp reminders in one fast app for owners, front desk, trainers and members. Stop chasing fees and get back to training people.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px', width: '100%' }}>
                <button
                  onClick={onEnterApp}
                  className="btn-primary"
                  style={{ padding: '14px 28px', fontSize: '1rem' }}
                >
                  Start free, no card <ArrowRight size={18} />
                </button>

                <button
                  onClick={onViewDeck}
                  className="btn-secondary"
                  style={{ padding: '14px 24px', fontSize: '1rem' }}
                >
                  <Play size={16} /> View Product Deck
                </button>
              </div>

              {/* Highlights */}
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} color="var(--color-primary)" /> Free sign-up
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} color="var(--color-primary)" /> No credit card
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} color="var(--color-primary)" /> Members get their own app
                </span>
              </div>
            </div>

            {/* Right Hero: Interactive Smartphone Mockup with Floating Badges */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {/* Floating notification badge: WhatsApp reminder */}
              <div
                className="glass"
                style={{
                  position: 'absolute',
                  top: '12%',
                  left: '-10px',
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
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <MessageSquare size={16} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700 }}>WhatsApp reminder sent</p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>Plan ends in 3 days</p>
                </div>
              </div>

              {/* Floating notification badge: Invoice paid */}
              <div
                className="glass"
                style={{
                  position: 'absolute',
                  bottom: '14%',
                  right: '-10px',
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
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <CreditCard size={16} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700 }}>Invoice #1048 paid</p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>Bank transfer verified</p>
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

      {/* PROBLEM VS SOLUTION SECTION */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-raised)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '10px' }}>
              Why Gyms Switch
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
              Say goodbye to awkward fee chasing & spreadsheets
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '8px auto 0 auto' }}>
              Gym owners lose up to 20% of their revenues because manual billing slips through the cracks.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {/* The Old Clunky Way */}
            <div className="card" style={{ padding: '32px', border: '1px solid rgba(239, 68, 68, 0.3)', backgroundColor: 'var(--color-surface)' }}>
              <span className="badge badge-danger" style={{ marginBottom: '14px' }}>
                The Old Manual Way
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>
                Midnight Spreadsheets & Paper Registers
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                  <span>Updating Excel spreadsheets late at night and forgetting who actually paid.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                  <span>Sending awkward personal WhatsApp texts asking members for membership dues.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                  <span>Paper attendance registers that get lost, damaged or skipped during rushes.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                  <span>Paying expensive per-message API fees ($0.05/SMS) on older platforms.</span>
                </li>
              </ul>
            </div>

            {/* The Autopilot Way */}
            <div className="card" style={{ padding: '32px', border: '1.5px solid var(--color-primary)', backgroundColor: 'var(--color-surface)', boxShadow: '0 0 35px -10px var(--color-primary-glow)' }}>
              <span className="badge badge-primary" style={{ marginBottom: '14px' }}>
                The GymSoft Autopilot
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>
                Automated Invoices & QR WhatsApp
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9375rem', color: 'var(--color-text)' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Check size={18} color="var(--color-primary)" />
                  <span>Every invoice is generated and renewed automatically on the due date.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Check size={18} color="var(--color-primary)" />
                  <span>Automated WhatsApp reminders sent from gym's own number linked via QR code ($0 cost).</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Check size={18} color="var(--color-primary)" />
                  <span>1-Tap GPS/QR check-in for members with visual 365-day workout heatmaps.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Check size={18} color="var(--color-primary)" />
                  <span>Free gym website on your own custom domain name (yourgym.com).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PRICING CALCULATOR */}
      <section style={{ padding: '70px 0' }}>
        <div className="container">
          <PricingCalculator onStartFree={onEnterApp} />
        </div>
      </section>

      {/* FEATURE TILES */}
      <section style={{ padding: '70px 0', backgroundColor: 'var(--color-surface-raised)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '10px' }}>
              Full Feature Suite
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
              Everything your gym needs under one roof
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {[
              {
                icon: <MessageSquare size={22} color="#10b981" />,
                title: 'WhatsApp from Own Number',
                desc: 'Scan once with QR code. No paid API, no per-message cost. Official gym reminders delivered with 100% open rates.',
              },
              {
                icon: <Smartphone size={22} color="var(--color-primary)" />,
                title: 'Member Smartphone App',
                desc: 'Works on iOS and Android without app store download. Members tap to check in and see their progress streaks.',
              },
              {
                icon: <Flame size={22} color="#f59e0b" />,
                title: '365-Day Activity Heatmap',
                desc: 'GitHub-style workout streak visualizer that keeps members motivated and boosts retention by over 30%.',
              },
              {
                icon: <Globe size={22} color="var(--color-tech)" />,
                title: 'Gym Website & Own Domain',
                desc: 'Every gym gets a sleek website for classes and pricing, ready to map to your own domain (e.g. ironparadise.fit).',
              },
              {
                icon: <Users size={22} color="var(--color-primary)" />,
                title: '4 Role Logins',
                desc: 'Owners see profit reports, counter staff handle quick check-ins, trainers view assigned clients, members get their pass.',
              },
              {
                icon: <ShieldCheck size={22} color="var(--color-success)" />,
                title: 'Excel / CSV 1-Click Export',
                desc: 'Zero lock-in. Download members, financial ledgers, and attendance history as formatted Excel sheets anytime.',
              },
            ].map((f, i) => (
              <div key={i} className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-surface-raised)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  {f.icon}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
                  {f.title}
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ padding: '70px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '10px' }}>
              FAQ
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
                    <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>
                      {faq.q}
                    </h4>
                    {isOpen ? <ChevronUp size={18} color="var(--color-primary)" /> : <ChevronDown size={18} />}
                  </div>
                  {isOpen && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '12px', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        textAlign: 'center',
      }}>
        <div className="container">
          <span className="badge badge-primary" style={{ marginBottom: '14px' }}>
            Start in 2 Minutes
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '16px' }}>
            Ready to put your gym on <span style={{ color: 'var(--color-primary)' }}>autopilot</span>?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '540px', margin: '0 auto 32px auto', fontSize: '1.05rem' }}>
            Free sign-up with no credit card required. Experience what modern gym software feels like.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={onEnterApp}
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '1.05rem' }}
            >
              Launch Live App Demo <Zap size={18} />
            </button>
            <button
              onClick={onViewDeck}
              className="btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1.05rem' }}
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
