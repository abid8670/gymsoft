import React, { useState, useEffect } from 'react';
import { useGymData, CURRENCIES } from '../context/GymDataContext';
import confetti from 'canvas-confetti';
import { 
  X, Sparkles, Check, ShieldCheck, Zap, Lock, 
  Smartphone, Building2, User, ArrowRight, Scissors, 
  Dumbbell, Store, Gift, HelpCircle 
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'signup' }) {
  const { 
    signup, login, quickDemoLogin, 
    authModalMode, setAuthModalMode, gymProfile, registeredUsers 
  } = useGymData();

  const [activeTab, setActiveTab] = useState(initialMode || 'signup');
  
  // Sign up state
  const [businessType, setBusinessType] = useState('salon'); // 'salon' | 'gym' | 'hybrid'
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [city, setCity] = useState('Lahore');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  useEffect(() => {
    if (authModalMode) {
      setActiveTab(authModalMode);
    }
  }, [authModalMode]);

  if (!isOpen) return null;

  const triggerCelebration = () => {
    try {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    } catch (e) { }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!businessName.trim()) {
      setErrorMsg('Apne Salon ya Gym ka naam likhein (Business name is required)');
      return;
    }
    if (!ownerName.trim()) {
      setErrorMsg('Aapka naam likhein (Owner name is required)');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('WhatsApp ya Mobile number likhein (Mobile number is required)');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const fullPhone = `${countryCode} ${phone.trim()}`;
      signup({
        name: ownerName,
        businessName,
        businessType,
        phone: fullPhone,
        email: email || `${businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}@example.com`,
        password: password || '123456',
        city,
        currency,
      });

      triggerCelebration();
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginIdentifier.trim()) {
      setErrorMsg('Apna Mobile number ya Email likhein');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = login(loginIdentifier, loginPassword);
      if (res && res.success === false) {
        setErrorMsg(res.error || 'Invalid credentials. Please verify your phone or email.');
        setIsSubmitting(false);
        return;
      }
      triggerCelebration();
      setIsSubmitting(false);
      onClose();
    }, 250);
  };

  const handleDemoClick = (type) => {
    quickDemoLogin(type);
    triggerCelebration();
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
          maxWidth: '560px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: 'var(--color-surface)',
          border: '1.5px solid var(--color-border-glow)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
          borderRadius: 'var(--radius-lg)',
          padding: 0,
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div style={{
          padding: '22px 24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.12) 0%, transparent 100%)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '0.6875rem',
                fontWeight: 900,
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <Gift size={12} /> 1-MONTH FREE TRIAL
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700 }}>
                ✓ No Credit Card Needed · 30 Days Free
              </span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text)' }}>
              {activeTab === 'signup' && 'Pehla 1 Mahina Bilkul Free Chalao (30-Day Trial)'}
              {activeTab === 'login' && 'Apne Salon ya Gym Account Mein Login'}
              {activeTab === 'demo' && '1-Click Instant Demo Testing'}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              {activeTab === 'signup' && 'Pehla 1 mahina koi paisa nahi dena · 30 second mein apna dashboard shuru karein'}
              {activeTab === 'login' && 'Apna registered mobile number ya email enter karein'}
              {activeTab === 'demo' && 'Bina kisi form ke pura software live chala kar dekhein'}
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
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* 3 Tabs Bar */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface-raised)',
          padding: '4px 8px',
          gap: '4px',
        }}>
          <button
            onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px 12px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeTab === 'signup' ? 'var(--color-surface)' : 'transparent',
              color: activeTab === 'signup' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: activeTab === 'signup' ? 800 : 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: activeTab === 'signup' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <Sparkles size={15} /> Free Start (1 Month)
          </button>
          
          <button
            onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px 12px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeTab === 'login' ? 'var(--color-surface)' : 'transparent',
              color: activeTab === 'login' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: activeTab === 'login' ? 800 : 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: activeTab === 'login' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <Lock size={15} /> Login
          </button>

          <button
            onClick={() => { setActiveTab('demo'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px 12px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeTab === 'demo' ? 'var(--color-surface)' : 'transparent',
              color: activeTab === 'demo' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: activeTab === 'demo' ? 800 : 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: activeTab === 'demo' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <Zap size={15} /> 1-Click Demo
          </button>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div style={{
            margin: '16px 24px 0 24px',
            padding: '10px 14px',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-danger)',
            fontSize: '0.8125rem',
            fontWeight: 600,
          }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Tab 1: SIGN UP (1-Month Free Trial / 30 Days) */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} style={{ padding: '20px 24px 28px 24px' }}>
            {/* Step 1: Business Category Selection */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>
                Aapka Business Kis Type Ka Hai? (Choose One)
              </label>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {/* Salon Card */}
                <div
                  onClick={() => setBusinessType('salon')}
                  style={{
                    padding: '12px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1.5px solid ${businessType === 'salon' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: businessType === 'salon' ? 'var(--color-primary-light)' : 'var(--color-surface-raised)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>💅</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--color-text)' }}>Beauty Salon</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>Hair, Spa, Nails</div>
                </div>

                {/* Gym Card */}
                <div
                  onClick={() => setBusinessType('gym')}
                  style={{
                    padding: '12px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1.5px solid ${businessType === 'gym' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: businessType === 'gym' ? 'var(--color-primary-light)' : 'var(--color-surface-raised)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>🏋️</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--color-text)' }}>Fitness Gym</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>Weights & Passes</div>
                </div>

                {/* Hybrid Card */}
                <div
                  onClick={() => setBusinessType('hybrid')}
                  style={{
                    padding: '12px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1.5px solid ${businessType === 'hybrid' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: businessType === 'hybrid' ? 'var(--color-primary-light)' : 'var(--color-surface-raised)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>⚡</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--color-text)' }}>Hybrid Both</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>Gym + Salon Club</div>
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '5px' }}>
                  Salon / Gym Ka Naam *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Luxe Beauty Lounge / Star Gym"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '5px' }}>
                  Owner / Aapka Naam *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chaudhry Akram / Sara Khan"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', fontSize: '0.875rem' }}
                />
              </div>
            </div>

            {/* Mobile / WhatsApp Number (Critical in Pakistan/India/Global) */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '5px' }}>
                WhatsApp / Mobile Number * (Receipts & Alerts ke liye)
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="input-field"
                  style={{ width: '110px', fontSize: '0.8125rem', fontWeight: 700 }}
                >
                  <option value="+92">🇵🇰 +92</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+966">🇸🇦 +966</option>
                </select>

                <input
                  type="tel"
                  required
                  placeholder="300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                  style={{ flex: 1, fontSize: '0.875rem' }}
                />
              </div>
            </div>

            {/* Currency & Password */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '5px' }}>
                  Billing Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', fontSize: '0.8125rem', fontWeight: 600 }}
                >
                  <option value="PKR">Rs - Pakistani Rupee</option>
                  <option value="USD">$ - US Dollar</option>
                  <option value="INR">₹ - Indian Rupee</option>
                  <option value="EUR">€ - Euro</option>
                  <option value="GBP">£ - British Pound</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '5px' }}>
                  Create Password (Aasan sa)
                </label>
                <input
                  type="password"
                  placeholder="e.g. 123456"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', fontSize: '0.875rem' }}
                />
              </div>
            </div>

            {/* Trial Guarantee Highlight Box */}
            <div style={{
              padding: '12px 14px',
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-success)' }}>
                <Check size={16} strokeWidth={3} />
                <span>Pehle 1 Mahina Mukammal FREE (30 Days) — Koi Hidden Charges Nahi</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>
                1 mahine baad agar pasand aaye toh sirf <strong>$1 / Rs 250 per active member</strong>. Agar pasand na aaye toh koi fees nahi.
              </p>
            </div>

            {/* Big Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? (
                'Account Ban Raha Hai...'
              ) : (
                <>
                  <Zap size={18} /> Start 1-Month Free Trial (Muft Shuru Karein)
                </>
              )}
            </button>

            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.75rem', color: 'var(--color-text-faint)' }}>
              Already account hai?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Yahan Login Karein
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: LOGIN */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} style={{ padding: '24px 24px 28px 24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text)', display: 'block', marginBottom: '6px' }}>
                Registered Mobile Number ya Email
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 03008472910 ya owner@zenithwellness.fit"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                className="input-field"
                style={{ width: '100%', fontSize: '0.9375rem' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text)' }}>
                  Password
                </label>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Default: 123456
                </span>
              </div>
              <input
                type="password"
                placeholder="Apna password enter karein"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="input-field"
                style={{ width: '100%', fontSize: '0.9375rem' }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <Lock size={18} /> Log In to Dashboard
            </button>

            {/* Quick Demo Credentials */}
            <div style={{
              padding: '12px 14px',
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
            }}>
              <p style={{ fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
                💡 Quick Testing Credentials:
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => { setLoginIdentifier('admin'); setLoginPassword(registeredUsers?.find(u => u.role === 'superadmin')?.password || 'admin'); }}
                  className="badge badge-primary"
                  style={{ cursor: 'pointer', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', fontWeight: 800 }}
                >
                  🛡️ Super Admin (admin / admin)
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginIdentifier('salon@zenith.com'); setLoginPassword('123'); }}
                  className="badge badge-primary"
                  style={{ cursor: 'pointer', border: 'none' }}
                >
                  💅 Salon Owner Demo
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginIdentifier('gym@zenith.com'); setLoginPassword('123'); }}
                  className="badge badge-primary"
                  style={{ cursor: 'pointer', border: 'none' }}
                >
                  🏋️ Gym Owner Demo
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginIdentifier('natasha@zenith.com'); setLoginPassword('staff123'); }}
                  className="badge badge-success"
                  style={{ cursor: 'pointer', border: 'none' }}
                >
                  💇 Active Staff (Natasha)
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginIdentifier('zeeshan@zenith.com'); setLoginPassword('staff123'); }}
                  className="badge"
                  style={{ cursor: 'pointer', border: '1px solid #eab308', color: '#eab308', background: 'rgba(234, 179, 8, 0.1)' }}
                >
                  🟡 Pending Staff (Zeeshan)
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.75rem', color: 'var(--color-text-faint)' }}>
              Naya salon ya gym hai?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                1-Month Free Trial Shuru Karein (Muft)
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: 1-CLICK INSTANT DEMO */}
        {activeTab === 'demo' && (
          <div style={{ padding: '22px 24px 28px 24px' }}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
              Agar aap bina koi number ya password likhe fauran dekhna chahte hain toh niche kisi bhi button par click karein:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Super Admin Master Access */}
              <div
                onClick={() => handleDemoClick('superadmin')}
                className="card card-interactive"
                style={{
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  border: '1px solid #7c3aed',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.75rem' }}>🛡️</span>
                  <div>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#a78bfa' }}>
                      Chief Super Admin (SaaS Portal & Approvals)
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Multi-club SaaS directory, approve/reject staff logins created by owners, oversee system revenue
                    </p>
                  </div>
                </div>
                <ArrowRight size={18} color="#a78bfa" />
              </div>

              {/* Salon Owner Demo Button */}
              <div
                onClick={() => handleDemoClick('salon')}
                className="card card-interactive"
                style={{
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-surface-raised)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.75rem' }}>💅</span>
                  <div>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 800 }}>
                      Beauty Salon & Spa Owner
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Appointments calendar, stylist commissions, WhatsApp reminders & hair color formulas
                    </p>
                  </div>
                </div>
                <ArrowRight size={18} color="var(--color-primary)" />
              </div>

              {/* Gym Owner Demo Button */}
              <div
                onClick={() => handleDemoClick('gym')}
                className="card card-interactive"
                style={{
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-surface-raised)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.75rem' }}>🏋️</span>
                  <div>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 800 }}>
                      Fitness Gym Owner
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      1-Tap reception terminal, workout streaks, monthly auto invoices & trainer splits
                    </p>
                  </div>
                </div>
                <ArrowRight size={18} color="var(--color-primary)" />
              </div>

              {/* Hybrid Club Founder Demo */}
              <div
                onClick={() => handleDemoClick('hybrid')}
                className="card card-interactive"
                style={{
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-primary)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.75rem' }}>⚡</span>
                  <div>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 800 }}>
                      Hybrid Wellness Founder (Full Suite)
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Gym + Beauty Salon unified system + Retail store POS + P&L ledger
                    </p>
                  </div>
                </div>
                <ArrowRight size={18} color="var(--color-primary)" />
              </div>

              {/* Counter Receptionist Demo */}
              <div
                onClick={() => handleDemoClick('counter')}
                className="card card-interactive"
                style={{
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-surface-raised)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.75rem' }}>🖥️</span>
                  <div>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 800 }}>
                      Front Desk Reception Desk
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Speed check-in desk, quick barcode scan & retail counter billing
                    </p>
                  </div>
                </div>
                <ArrowRight size={18} color="var(--color-primary)" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
