import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { Check, Zap, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export default function PricingCalculator({ onStartFree }) {
  const { currencyObj } = useGymData();
  const [memberCount, setMemberCount] = useState(120);
  const [avgFee, setAvgFee] = useState(40);

  // Calculations
  const softwareCostPerMember = 1;
  const totalSoftwareCost = memberCount * softwareCostPerMember;
  const totalGymRevenue = memberCount * avgFee;
  const costPercentage = ((totalSoftwareCost / (totalGymRevenue || 1)) * 100).toFixed(1);

  return (
    <div className="card" style={{ padding: '36px', background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="badge badge-primary" style={{ marginBottom: '10px' }}>
          Transparent · No Setup Fees · Free Trial
        </span>
        <h3 style={{ fontSize: '2.1rem', fontWeight: 800 }}>
          Just <span style={{ color: 'var(--color-primary)' }}>$1 / Rs 250</span> per active member / month
        </h3>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '560px', margin: '8px auto 0 auto', fontSize: '0.9375rem', lineHeight: 1.6 }}>
          Pehle <strong>1 Mahina (30 Din) bilkul free</strong> chala kar dekhein. Koi credit card nahi chahiye. Pasand aane par sirf active members ka $1 (Rs 250) per month. Jo member na aaye uska $0!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
        {/* Interactive Sliders */}
        <div style={{ backgroundColor: 'var(--color-surface-raised)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          {/* Member Slider */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>
                Active Gym Members
              </label>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                {memberCount} <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>members</span>
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={memberCount}
              onChange={(e) => setMemberCount(Number(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                accentColor: 'var(--color-primary)',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>
              <span>10 members</span>
              <span>250 members</span>
              <span>500+ members</span>
            </div>
          </div>

          {/* Average Membership Fee */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>
                Your Average Monthly Fee
              </label>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
                {currencyObj.symbol}{avgFee} <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>/ mo</span>
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="150"
              step="5"
              value={avgFee}
              onChange={(e) => setAvgFee(Number(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                accentColor: 'var(--color-primary)',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>
              <span>{currencyObj.symbol}15 (Budget)</span>
              <span>{currencyObj.symbol}75 (Standard)</span>
              <span>{currencyObj.symbol}150 (Premium)</span>
            </div>
          </div>
        </div>

        {/* Calculation Summary Card */}
        <div style={{
          backgroundColor: 'var(--color-surface-raised)',
          padding: '28px',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--color-border-glow)',
          boxShadow: 'var(--shadow-float)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Your Software Bill
              </p>
              <h4 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
                ${totalSoftwareCost}
                <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}> / month</span>
              </h4>
            </div>
            <span className="badge badge-success">
              <TrendingUp size={12} /> ROI 4,000%+
            </span>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Estimated Gym Monthly Revenue:</span>
              <span style={{ fontWeight: 700 }}>{currencyObj.symbol}{totalGymRevenue.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>ZenithSoft Cost Share:</span>
              <span style={{ fontWeight: 700, color: 'var(--color-success)' }}>Only {costPercentage}% of revenue</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Hours Saved on Paperwork:</span>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>~35 hours / month</span>
            </div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'Unlimited QR WhatsApp message reminders (whatsapp-web.js - No Meta fees)',
              'Free custom club website included for your business',
              'Member PWA app with 365-day check-in heatmaps',
              'Multi-role staff logins for Owner, Receptionists & Stylists',
              'Free 1-month trial (30 days) — zero risk',
            ].map((perk, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                <Check size={14} color="var(--color-primary)" />
                {perk}
              </li>
            ))}
          </ul>

          <button onClick={onStartFree} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: 800 }}>
            🎁 Start 1-Month Free Trial (30 Days) — No Credit Card Needed
          </button>
        </div>
      </div>
    </div>
  );
}
