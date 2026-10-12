import React, { useState, useEffect } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, 
  CheckCircle2, AlertCircle, Smartphone, MessageCircle, BarChart3, 
  CreditCard, ShieldCheck, Globe, Users, Flame, Calendar, DollarSign,
  Printer, Share2, Sparkles, Zap
} from 'lucide-react';

export const DECK_SLIDES = [
  {
    id: 1,
    tag: 'Slide 01',
    title: 'The Hybrid Wellness OS: Gyms, Salons & Spas.',
    subtitle: 'Everything a fitness gym, beauty salon or hybrid club runs on',
    category: 'Cover',
    description: 'Workouts, hair styling, HydraFacials, massage therapy, retail store POS, automated invoices, and zero-cost WhatsApp reminders in one fast app.',
    highlight: '$1 per active client / member · Free sign-up · No credit card required',
    badge: 'Hybrid Platform',
  },
  {
    id: 2,
    tag: 'Slide 02',
    title: 'The Problem: Fragmented Tools & Lost Revenue',
    subtitle: 'Spreadsheets at midnight and missed appointments',
    category: 'The Problem',
    description: 'Business owners juggle separate software for gym memberships, salon booking diaries, WhatsApp fee chasing, and manual paper receipt slips, causing up to 25% revenue leakage.',
    highlight: '68% of wellness fee leakages happen due to delayed payment reminders',
    badge: 'Pain Points',
  },
  {
    id: 3,
    tag: 'Slide 03',
    title: 'The Solution: One Unified Cloud Engine',
    subtitle: 'From reception desk to client pocket in real-time',
    category: 'The Solution',
    description: 'ZenithSoft unifies gym passes, salon treatment chair scheduling, stylist commissions, retail POS, QR WhatsApp automation, and client consultation cards in one responsive app.',
    highlight: 'Zero hardware to purchase — works on any phone, tablet or PC',
    badge: 'Architecture',
  },
  {
    id: 4,
    tag: 'Slide 04',
    title: 'Set Up in Under Two Minutes',
    subtitle: 'Add your business name, services, and start taking bookings',
    category: 'Onboarding',
    description: 'No complicated installations or multi-day training required. Set up your membership plans, salon service menu, connect your WhatsApp with a single QR scan, and you are live.',
    highlight: 'Ready for business in 120 seconds',
    badge: 'Quickstart',
  },
  {
    id: 5,
    tag: 'Slide 05',
    title: 'Members, Stylists & Staff Roles',
    subtitle: 'Clear boundaries for Owner, Reception, Stylists, Trainers & Clients',
    category: 'Access Control',
    description: 'Owners see full finances and profits. Reception staff handle quick check-ins and appointments. Stylists and personal trainers track their clients and commission payouts. Clients get their personal portal.',
    highlight: '4 distinct role permission sets built-in',
    badge: 'Multi-Role',
  },
  {
    id: 6,
    tag: 'Slide 06',
    title: 'Hybrid Combo Bundles & High-Margin Perks',
    subtitle: 'Glow & Gains VIP, Bridal Packages & Recovery Spa',
    category: 'Subscriptions',
    description: 'Cross-sell workouts with beauty care: configure "Glow & Gains" (Gym + 2x Blowdry + HydraFacial) to double your average revenue per member from $40/mo to $85+/mo.',
    highlight: 'Boost average client lifetime value by up to 140%',
    badge: 'Combo Revenue',
  },
  {
    id: 7,
    tag: 'Slide 07',
    title: 'Invoices That Generate Themselves',
    subtitle: 'Auto-renewed billing with branded PDF invoices',
    category: 'Billing',
    description: 'Every month, invoices are automatically generated for expiring members. Record cash, bank transfers, or mobile wallets (EasyPaisa/JazzCash). Members can download official PDF receipts anytime.',
    highlight: 'Automated renewal cycle ensures 0 forgotten payments',
    badge: 'Invoicing',
  },
  {
    id: 8,
    tag: 'Slide 08',
    title: '100% Autopilot Automation',
    subtitle: 'Never chase late fees by hand again',
    category: 'Automation',
    description: 'Smart cron routines check memberships every morning at 08:00 AM. Invoices are queued, status badges update from Active to Expiring, and scheduled alerts are triggered seamlessly.',
    highlight: 'Save up to 35 hours of manual admin time every month',
    badge: 'Background Jobs',
  },
  {
    id: 9,
    tag: 'Slide 09',
    title: 'WhatsApp from Your Own Number',
    subtitle: 'Linked once with a QR code — No Meta API fees',
    category: 'WhatsApp',
    description: 'No expensive WhatsApp Cloud API fees ($0.05/message adds up fast!). Connect your gym’s existing WhatsApp phone in 5 seconds via QR code. Messages send from your verified number with customized text.',
    highlight: '$0 cost per message · 100% gym branding',
    badge: 'Free WhatsApp',
  },
  {
    id: 10,
    tag: 'Slide 10',
    title: 'Installable Member Mobile App',
    subtitle: 'Android & iOS PWA without App Store friction',
    category: 'Member App',
    description: 'When members join, they receive a direct link to their portal. They can add it to their home screen with one tap. No app store searching, no password headaches, instant access.',
    highlight: 'One-tap check-in, membership details & PDF invoice receipts',
    badge: 'Mobile First',
  },
  {
    id: 11,
    tag: 'Slide 11',
    title: '365-Day Activity Heatmap',
    subtitle: 'GitHub-style workout streaks that drive retention',
    category: 'Gamification',
    description: 'Members love seeing their discipline visually. The annual check-in heatmap fills with vibrant color squares with every gym visit, celebrating current streaks and total training hours.',
    highlight: 'Boosts member retention by up to 34%',
    badge: 'Visual Streak',
  },
  {
    id: 12,
    tag: 'Slide 12',
    title: 'Member Gallery & Visual Roster',
    subtitle: 'Recognize your athletes at a glance',
    category: 'Directory',
    description: 'Staff and front desk can visually identify members walking in with photo avatars, active plan tags, expiration dates, and personal medical or fitness notes.',
    highlight: 'Instant visual verification stops unauthorized entry',
    badge: 'Photo Avatars',
  },
  {
    id: 13,
    tag: 'Slide 13',
    title: 'Fast Front Desk Counter Mode',
    subtitle: 'Built for high-volume rush hours',
    category: 'Front Desk',
    description: 'During morning and evening rushes, receptionists need speed. Search members in milliseconds by name or phone, tap once to check in, or register a new walk-in member in under 30 seconds.',
    highlight: 'Sub-second check-in response time',
    badge: 'Counter Kiosk',
  },
  {
    id: 14,
    tag: 'Slide 14',
    title: 'Triple Revenue: Gym, Salon & Retail POS',
    subtitle: 'Maximize profit per square foot across your entire facility',
    category: 'Financials',
    description: 'Track gym monthly recurring memberships, salon high-margin aesthetic treatments (HydraFacials, hair spas), and retail merchandise sales (supplements, hair serums) in one consolidated P&L ledger.',
    highlight: 'Gyms adding salon & retail increase profit margins by 45%',
    badge: 'Triple Revenue',
  },
  {
    id: 15,
    tag: 'Slide 15',
    title: 'Complete Activity Audit Log',
    subtitle: 'Total transparency for gym owners',
    category: 'Security',
    description: 'Every sign-in, payment recording, reminder dispatch, and membership change is logged with timestamp and user attribution. Gym owners maintain full visibility over reception activity.',
    highlight: 'Zero unrecorded transactions or unauthorized edits',
    badge: 'Audit Trail',
  },
  {
    id: 16,
    tag: 'Slide 16',
    title: 'Free Branded Gym Website',
    subtitle: 'Every gym gets a dedicated public landing page',
    category: 'Marketing',
    description: 'Showcase your gym facilities, class schedules, trainer profiles, location map, and membership pricing on a beautifully designed, high-converting public landing page.',
    highlight: 'Instant online presence without paying a web designer',
    badge: 'Gym Website',
  },
  {
    id: 17,
    tag: 'Slide 17',
    title: 'Your Own Domain Name',
    subtitle: 'Run your gym under your own brand (e.g. yourgym.com)',
    category: 'White-Label',
    description: 'Connect your custom domain seamlessly. Free automated SSL certificates and lightning-fast global CDN hosting included for all gyms on Gym Management Soft.',
    highlight: '100% white-label experience for your members',
    badge: 'Custom Domain',
  },
  {
    id: 18,
    tag: 'Slide 18',
    title: 'Public Gyms Directory Listing',
    subtitle: 'Get discovered by new fitness seekers in your city',
    category: 'Growth',
    description: 'Every registered gym is featured in our public directory where local fitness seekers search by city (Lahore, Karachi, Dubai, London, New York) to find top-rated gyms.',
    highlight: 'Free incoming organic leads from fitness enthusiasts',
    badge: 'City Directory',
  },
  {
    id: 19,
    tag: 'Slide 19',
    title: 'Your Data, 100% Secure & Exportable',
    subtitle: 'Download complete CSV or Excel backups anytime',
    category: 'Data Ownership',
    description: 'You own your member data completely. Export members, invoices, and attendance logs to Excel or CSV at any time with a single click. High-grade cloud encryption and automated daily backups.',
    highlight: 'No lock-in · 1-click Excel export',
    badge: 'Data Security',
  },
  {
    id: 20,
    tag: 'Slide 20',
    title: 'Simple Pricing: $1 per Member',
    subtitle: 'Every feature included. No hidden fees or tiers.',
    category: 'Pricing',
    description: 'If you have 40 active members, you pay $40/month. If you have 150 members, you pay $150/month. We never take a percentage of your member fee revenue.',
    highlight: 'Free sign-up · First invoice after 30 days',
    badge: '$1 / Member',
  },
  {
    id: 21,
    tag: 'Slide 21',
    title: 'Get Started in Two Minutes',
    subtitle: 'Join the next generation of gym owners',
    category: 'Start Free',
    description: 'Create your account, add your members or import your spreadsheet, connect your WhatsApp, and start running your gym on autopilot today.',
    highlight: 'No credit card needed to register',
    badge: 'Try Free',
  },
  {
    id: 22,
    tag: 'Slide 22',
    title: 'That’s Not All — The Road Ahead',
    subtitle: 'Continuous innovations built for fitness founders',
    category: 'Roadmap',
    description: 'Upcoming features include biometric turnstile gate integrations, trainer revenue splits, diet & workout routine builder, and mobile wallet payment gateways.',
    highlight: 'Built by gym enthusiasts, designed for gym owners',
    badge: 'Future Ready',
  },
];

export default function DeckViewer({ onLaunchApp }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);

  const slide = DECK_SLIDES[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlideIndex(prev => (prev < DECK_SLIDES.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex(prev => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNext = () => {
    if (currentSlideIndex < DECK_SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Deck Chrome */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge badge-primary" style={{ padding: '6px 14px', fontSize: '0.8125rem' }}>
            {slide.tag} / 22
          </span>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            {slide.category}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setDownloadModal(true)}
            className="btn-secondary"
            style={{ fontSize: '0.8125rem', padding: '8px 16px' }}
          >
            <Download size={15} /> Download Deck (PDF)
          </button>
          <button
            onClick={onLaunchApp}
            className="btn-primary"
            style={{ fontSize: '0.8125rem', padding: '8px 18px' }}
          >
            Launch Live SaaS <Zap size={14} />
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div 
        className="card"
        style={{
          minHeight: '480px',
          padding: '44px 36px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-float)',
        }}
      >
        {/* Ambient background glow */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}></div>

        {/* Slide Header */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1rem',
              }}>
                ⚡
              </span>
              <span style={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-display)' }}>
                Gym<span style={{ color: 'var(--color-primary)' }}>Management</span>Soft
              </span>
            </div>

            <span className="badge badge-primary">
              {slide.badge}
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            marginBottom: '10px',
            color: 'var(--color-text)',
          }}>
            {slide.title}
          </h2>

          <h3 style={{
            fontSize: '1.15rem',
            fontWeight: 600,
            color: 'var(--color-primary)',
            marginBottom: '20px',
          }}>
            {slide.subtitle}
          </h3>

          <p style={{
            fontSize: '1.0625rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
            maxWidth: '780px',
            marginBottom: '28px',
          }}>
            {slide.description}
          </p>
        </div>

        {/* Feature Spotlight Banner inside Slide */}
        <div style={{
          padding: '16px 20px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={20} color="var(--color-primary)" />
            <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text)' }}>
              {slide.highlight}
            </span>
          </div>

          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-faint)' }}>
            Hybrid Wellness Pitch Deck · Official Confidential
          </span>
        </div>

        {/* Slide Navigation Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '32px',
          borderTop: '1px solid var(--color-border)',
          paddingTop: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="btn-secondary"
              style={{
                padding: '8px 16px',
                fontSize: '0.8125rem',
                opacity: currentSlideIndex === 0 ? 0.4 : 1,
                cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentSlideIndex === DECK_SLIDES.length - 1}
              className="btn-secondary"
              style={{
                padding: '8px 16px',
                fontSize: '0.8125rem',
                opacity: currentSlideIndex === DECK_SLIDES.length - 1 ? 0.4 : 1,
                cursor: currentSlideIndex === DECK_SLIDES.length - 1 ? 'not-allowed' : 'pointer',
              }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>

          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Use Arrow keys <kbd style={{ padding: '2px 6px', background: 'var(--color-surface-raised)', borderRadius: '4px', border: '1px solid var(--color-border)' }}>←</kbd> <kbd style={{ padding: '2px 6px', background: 'var(--color-surface-raised)', borderRadius: '4px', border: '1px solid var(--color-border)' }}>→</kbd> or Space
          </span>

          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            {currentSlideIndex + 1} of {DECK_SLIDES.length}
          </span>
        </div>
      </div>

      {/* Slide Thumbnails Grid / Quick Jump */}
      <div style={{ marginTop: '28px' }}>
        <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          All 22 Slides Index
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '8px',
        }}>
          {DECK_SLIDES.map((s, idx) => {
            const isActive = idx === currentSlideIndex;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                style={{
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  border: `1.5px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontSize: '0.6875rem', fontWeight: 700, opacity: 0.8 }}>
                  Slide {String(s.id).padStart(2, '0')}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: isActive ? 'var(--color-text)' : 'inherit',
                }}>
                  {s.category}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Download Deck Modal */}
      {downloadModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 120,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}>
          <div className="card" style={{ maxWidth: '440px', padding: '28px', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
            }}>
              <Download size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
              Download Product Deck (PDF)
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
              Gym Management Soft Product Deck (22 Slides) is ready to print or download as a high-resolution PDF for your gym partners.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => { window.print(); setDownloadModal(false); }}
                className="btn-primary"
              >
                <Printer size={16} /> Print / Save as PDF
              </button>
              <button
                onClick={() => setDownloadModal(false)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
