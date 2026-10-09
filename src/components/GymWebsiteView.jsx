import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  Globe, CheckCircle2, ShieldCheck, ExternalLink, 
  Settings, Sparkles, MapPin, Phone, Clock, ArrowRight, Eye 
} from 'lucide-react';

export default function GymWebsiteView() {
  const { gymProfile, setGymProfile, plans, currencyObj } = useGymData();
  const [domainInput, setDomainInput] = useState(gymProfile.customDomain || 'ironparadise.fit');
  const [domainSaved, setDomainSaved] = useState(false);

  const handleSaveDomain = () => {
    setGymProfile(prev => ({ ...prev, customDomain: domainInput }));
    setDomainSaved(true);
    setTimeout(() => setDomainSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-primary">
              White-Label Engine
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Gym Website & Custom Domain
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Every gym gets its own website that runs on its own domain with free SSL.
          </p>
        </div>

        <a
          href={`https://${gymProfile.customDomain}`}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
          style={{ fontSize: '0.8125rem' }}
          onClick={(e) => { e.preventDefault(); alert(`Opening live website preview for https://${gymProfile.customDomain}`); }}
        >
          <ExternalLink size={15} /> Visit Live Domain
        </a>
      </div>

      {/* Domain Configuration Card */}
      <div className="card" style={{ padding: '24px', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px' }}>
          Custom Domain & DNS Setup
        </h3>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-surface-raised)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', padding: '0 12px', flex: 1, minWidth: '260px' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-faint)', marginRight: '4px' }}>https://</span>
            <input
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              className="input-field"
              style={{ border: 'none', backgroundColor: 'transparent', padding: '10px 0', fontSize: '0.9375rem', fontWeight: 700 }}
              placeholder="yourgym.com"
            />
          </div>

          <button onClick={handleSaveDomain} className="btn-primary">
            {domainSaved ? 'Connected ✓' : 'Update Domain'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)' }}>
            <ShieldCheck size={14} /> SSL Certificate Active (Let's Encrypt 256-bit)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)' }}>
            <CheckCircle2 size={14} /> Cloudflare Edge CDN Active
          </span>
          <span>
            CNAME Target: <strong style={{ color: 'var(--color-text)' }}>cname.gymmanagementsoft.com</strong>
          </span>
        </div>
      </div>

      {/* Live Website Preview Frame */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
            Live Website Preview
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)' }}>
            Updates automatically with your gym data
          </span>
        </div>

        {/* Browser Mockup Chrome */}
        <div 
          className="card"
          style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--color-border-strong)',
            boxShadow: 'var(--shadow-float)',
          }}
        >
          {/* Browser Address Bar */}
          <div style={{
            backgroundColor: 'var(--color-surface-raised)',
            padding: '10px 16px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
            </div>

            <div style={{
              flex: 1,
              backgroundColor: 'var(--color-surface)',
              borderRadius: '6px',
              padding: '4px 12px',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}>
              <ShieldCheck size={12} color="var(--color-success)" />
              https://{gymProfile.customDomain}
            </div>
          </div>

          {/* Rendered Gym Public Landing Page */}
          <div style={{ padding: '0px', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}>
            {/* Nav */}
            <div style={{
              padding: '18px 32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--color-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                }}>
                  ⚡
                </span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: 'var(--font-display)' }}>
                  {gymProfile.name}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Classes</span>
                <span style={{ color: 'var(--color-text-muted)' }}>Pricing</span>
                <span style={{ color: 'var(--color-text-muted)' }}>Timings</span>
                <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
                  Join Gym
                </button>
              </div>
            </div>

            {/* Hero Banner */}
            <div style={{
              padding: '60px 32px',
              textAlign: 'center',
              background: 'radial-gradient(circle at 50% 20%, var(--color-primary-light), transparent 70%)',
            }}>
              <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
                {gymProfile.city}’s Premier Training Facility
              </span>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, maxWidth: '750px', margin: '0 auto 16px auto', lineHeight: 1.15 }}>
                Transform Your Strength & Discipline
              </h1>
              <p style={{ color: 'var(--color-text-muted)', maxWidth: '580px', margin: '0 auto 24px auto', fontSize: '1rem' }}>
                {gymProfile.tagline}. High-end equipment, certified coaches, steam & sauna rooms, and a community of dedicated athletes.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button className="btn-primary">
                  Book Free 1-Day Pass <ArrowRight size={15} />
                </button>
                <button className="btn-secondary">
                  WhatsApp Front Desk
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div style={{ padding: '40px 32px', backgroundColor: 'var(--color-surface-raised)' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Membership Plans</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>No hidden admission fees. Cancel anytime.</p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                maxWidth: '960px',
                margin: '0 auto',
              }}>
                {plans.map(p => (
                  <div
                    key={p.id}
                    className="card"
                    style={{
                      padding: '20px',
                      backgroundColor: 'var(--color-surface)',
                      border: p.badge ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      position: 'relative',
                    }}
                  >
                    {p.badge && (
                      <span className="badge badge-primary" style={{ position: 'absolute', top: '-10px', right: '14px', fontSize: '0.6875rem' }}>
                        {p.badge}
                      </span>
                    )}
                    <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{p.name}</h4>
                    <p style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'var(--font-display)', margin: '8px 0' }}>
                      {currencyObj.symbol}{p.price} <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>/ mo</span>
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0', fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {p.features.slice(0, 3).map((feat, i) => (
                        <li key={i}>✓ {feat}</li>
                      ))}
                    </ul>
                    <button className="btn-primary" style={{ width: '100%', padding: '8px', fontSize: '0.75rem' }}>
                      Get Started
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with address and timings */}
            <div style={{ padding: '24px 32px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              <div>
                <p>📍 {gymProfile.address}</p>
                <p>🕒 {gymProfile.openingHours}</p>
              </div>
              <p>Powered by Gym Management Soft Cloud</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
