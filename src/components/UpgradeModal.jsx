import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import confetti from 'canvas-confetti';
import { 
  X, Check, Zap, MessageSquare, ShieldCheck 
} from 'lucide-react';

export default function UpgradeModal({ isOpen, onClose }) {
  const { upgradeToPro, gymProfile } = useGymData();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleInstantActivate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      upgradeToPro();
      try {
        if (typeof confetti === 'function') {
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
        }
      } catch (e) { }
      setIsProcessing(false);
      onClose();
    }, 500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ZenithSoft Team! I want to activate the Pro Plan for my business: ${gymProfile?.name || 'My Salon/Gym'}. Please send me the payment instructions.`
  );

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.78)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 100,
    }}>
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: 'var(--color-surface)',
          border: '2px solid var(--color-primary)',
          boxShadow: '0 25px 60px -15px var(--color-primary-glow)',
          borderRadius: 'var(--radius-lg)',
          padding: 0,
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.15) 0%, transparent 100%)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-primary">
                ★ 100% TRANSPARENT PRICING
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700 }}>
                Cancel Anytime
              </span>
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 900 }}>
              Buy ZenithSoft Pro — Sirf <span style={{ color: 'var(--color-primary)' }}>$1</span> / Rs 250
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Har active member ya salon client ka sirf $1 (Rs 250) per month. Jo member na aaye uska $0!
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Business Summary Box */}
          <div style={{
            padding: '14px 18px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Your Registered Business
              </p>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                {gymProfile?.name}
              </h4>
            </div>
            <span style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              fontSize: '0.75rem',
              fontWeight: 800,
            }}>
              1-Month Free Trial Active
            </span>
          </div>

          {/* Features Included List */}
          <div style={{ marginBottom: '22px' }}>
            <p style={{ fontSize: '0.8125rem', fontWeight: 800, marginBottom: '10px' }}>
              Tamam Features Included (Sab Kuch Shamil Hai):
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={16} color="var(--color-primary)" />
                <span>Unlimited Salon Appointments</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={16} color="var(--color-primary)" />
                <span>Stylist & Trainer Payroll</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={16} color="var(--color-primary)" />
                <span>Zero-Cost WhatsApp Alerts</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={16} color="var(--color-primary)" />
                <span>1-Tap QR & Barcode Check-In</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={16} color="var(--color-primary)" />
                <span>Retail POS Store Billing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={16} color="var(--color-primary)" />
                <span>Hair Formulas & Skin Cards</span>
              </div>
            </div>
          </div>

          {/* Payment / Activation Options */}
          <div style={{ marginBottom: '22px' }}>
            <p style={{ fontSize: '0.8125rem', fontWeight: 800, marginBottom: '10px' }}>
              Kaise Buy Karein? (Choose Payment Method):
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Option 1: WhatsApp Direct Order */}
              <a
                href={`https://wa.me/923008472910?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid #25d366',
                  backgroundColor: 'rgba(37, 211, 102, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MessageSquare size={22} color="#25d366" />
                  <div>
                    <h5 style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--color-text)' }}>
                      WhatsApp Par Order Karein (Sabse Aasan)
                    </h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Hamari team se rabta karein · 5 minute mein account activate
                    </p>
                  </div>
                </div>
                <span style={{ backgroundColor: '#25d366', color: '#fff', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 800 }}>
                  Chat Now
                </span>
              </a>

              {/* Option 2: Local Pakistan Payments */}
              <div style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface-raised)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '1.2rem' }}>🇵🇰</span>
                  <h5 style={{ fontSize: '0.9375rem', fontWeight: 800 }}>
                    JazzCash / EasyPaisa / Bank Transfer
                  </h5>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Number: <strong>0300 8472910</strong> (Title: Zenith Wellness Software) · Screenshot WhatsApp par share karein.
                </p>
              </div>

              {/* Option 3: Instant 1-Click Pro Activation (For Software Simulation/Testing) */}
              <button
                onClick={handleInstantActivate}
                disabled={isProcessing}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '0.9375rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '4px',
                }}
              >
                <Zap size={18} /> {isProcessing ? 'Activating Pro Plan...' : 'Instant 1-Click Pro Activation ⚡'}
              </button>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--color-text-faint)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}>
            <ShieldCheck size={14} color="var(--color-success)" />
            <span>100% Safe · No Long-Term Contracts · Instant Setup</span>
          </div>
        </div>
      </div>
    </div>
  );
}
