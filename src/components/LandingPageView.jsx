import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import MemberAppMockup from './MemberAppMockup';
import PricingCalculator from './PricingCalculator';
import InvoicePdfModal from './InvoicePdfModal';
import { 
  ArrowRight, Check, Play, Smartphone, MessageSquare, 
  CreditCard, Calendar, ShieldCheck, Globe, Users, 
  Flame, Zap, ChevronDown, ChevronUp, Star, Sparkles, 
  Scissors, ShoppingBag, Award, HeartPulse 
} from 'lucide-react';

export default function LandingPageView({ onEnterApp, onViewDeck, onViewDirectory }) {
  const { invoices, salonServices, currencyObj } = useGymData();
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const faqs = [
    {
      q: 'Can I use this software for a Beauty Salon, a Gym, or both combined?',
      a: 'Yes! The software is built with a 1-click Business Mode switcher. You can run it strictly as a Fitness Gym, strictly as a Beauty Salon & Spa, or as a Hybrid Wellness Club where members enjoy both workout facilities and grooming/spa appointments under one unified pass.'
    },
    {
      q: 'How does WhatsApp automation work without per-message charges?',
      a: 'You simply link your business WhatsApp phone once using a quick QR code scan on the dashboard. Appointment confirmations and membership renewal alerts dispatch directly from your official WhatsApp number with zero Meta Cloud API fees.'
    },
    {
      q: 'How does the software track stylist & trainer commissions?',
      a: 'Built-in hybrid payroll handles both: fitness coaches earn per personal training session ($25/PT), and salon stylists/beauticians earn percentage commissions on services (e.g. 20% on blowdrys, 25% on HydraFacials). Owners get a 1-click monthly payout settlement.'
    },
    {
      q: 'Does it include a Point of Sale (POS) for selling products?',
      a: 'Yes! The retail POS allows reception to sell whey protein, gym accessories, Moroccan hair oils, and skincare serums in one tap, deduct inventory, and print receipts or charge directly to the client account.'
    },
    {
      q: 'How much does the software cost?',
      a: 'One simple transparent price: $1 per active member or client per month. Free signup, no credit card required, and first 30 days are completely free.'
    },
    {
      q: 'Can salon stylists save hair dye formulas and skin allergy notes?',
      a: 'Yes! Every client has a dedicated Consultation Card where staff log hair color formulas, patch tests, skin sensitivities, and workout injury precautions so your team provides 5-star personalized service every visit.'
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
                  HYBRID WELLNESS OS
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
                The Operating System for <span style={{ color: 'var(--color-primary)' }}>Fitness Gyms & Beauty Salons</span>
              </h1>

              {/* Subheading */}
              <p style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                marginBottom: '32px',
                maxWidth: '600px',
              }}>
                Workouts, hair styling, HydraFacials, sports massage, automatic renewal invoices, and zero-cost WhatsApp reminders in one fast app. Run on autopilot and sell high-margin hybrid packages.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px', width: '100%' }}>
                <button
                  onClick={onEnterApp}
                  className="btn-primary"
                  style={{ padding: '14px 28px', fontSize: '1rem' }}
                >
                  Launch Live Platform <Zap size={18} />
                </button>

                <button
                  onClick={onViewDeck}
                  className="btn-secondary"
                  style={{ padding: '14px 24px', fontSize: '1rem' }}
                >
                  <Play size={16} /> View 22-Slide Pitch Deck
                </button>
              </div>

              {/* Highlights */}
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} color="var(--color-primary)" /> Salon Appointments + Gym Passes
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} color="var(--color-primary)" /> Retail Store POS
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} color="var(--color-primary)" /> Stylist & Trainer Commissions
                </span>
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
                  <p style={{ fontSize: '0.75rem', fontWeight: 700 }}>HydraFacial Booked</p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>Today at 03:00 PM · Dr. Hina</p>
                </div>
              </div>

              {/* Floating notification badge: Invoice paid */}
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
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700 }}>Glow & Gains VIP Paid</p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>Gym + 2x Salon Blowdry ($85)</p>
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

      {/* 3 BUSINESS MODELS IN ONE PLATFORM */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-raised)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '10px' }}>
              One Platform · Three Business Modes
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
              Tailored for how modern wellness clubs operate
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '640px', margin: '8px auto 0 auto' }}>
              Whether you run a fitness center, a luxury beauty salon, or both under one roof, ZenithSoft scales with your exact business model.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {/* Mode 1: Pure Fitness Gyms */}
            <div className="card" style={{ padding: '28px', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.75rem' }}>🏋️</span>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Fitness Gyms & Studios</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>Iron, CrossFit, Boxing & Yoga</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                <li>✓ 1-Tap check-in reception terminal & barcode scan</li>
                <li>✓ 365-Day attendance heatmaps & workout streaks</li>
                <li>✓ Automated membership renewal billing</li>
                <li>✓ Personal trainer session split calculator</li>
              </ul>
            </div>

            {/* Mode 2: Beauty Salons & Spas */}
            <div className="card" style={{ padding: '28px', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.75rem' }}>💅</span>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Beauty Salons & Spas</h3>
                  <span style={{ fontSize: '0.75rem', color: '#ff2a85', fontWeight: 600 }}>Hair, Aesthetics, Facials & Massages</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                <li>✓ Stylist chair appointment scheduler & calendar</li>
                <li>✓ Automated WhatsApp 2-hr booking reminder alerts</li>
                <li>✓ Client Consultation Cards (hair formulas & skin allergies)</li>
                <li>✓ Stylist percentage commission ledger (20%-30%)</li>
              </ul>
            </div>

            {/* Mode 3: Hybrid Wellness Clubs (The Flagship) */}
            <div className="card" style={{ padding: '28px', backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-primary)', boxShadow: '0 0 30px -10px var(--color-primary-glow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.75rem' }}>⚡</span>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Hybrid Wellness Clubs</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700 }}>2x to 3x Higher Revenue / Client</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: 'var(--color-text)' }}>
                <li>★ <strong>Combo Bundles</strong>: Gym floor + 2 Salon Blowdrys + 1 Massage</li>
                <li>★ <strong>Retail Store POS</strong>: Sell whey protein & haircare serums together</li>
                <li>★ <strong>Unified Member Pass</strong>: 1 QR pass for gym entry & spa chairs</li>
                <li>★ <strong>Zero Extra Software</strong>: Replaces 2 separate subscriptions</li>
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

      {/* FAQ SECTION */}
      <section style={{ padding: '70px 0', backgroundColor: 'var(--color-surface-raised)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
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
            Sale-Ready SaaS Platform
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '16px' }}>
            Run your gym, beauty salon, or hybrid club on <span style={{ color: 'var(--color-primary)' }}>autopilot</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '540px', margin: '0 auto 32px auto', fontSize: '1.05rem' }}>
            Start for $1 with free sign-up and no credit card required. Experience the future of modern wellness management.
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
