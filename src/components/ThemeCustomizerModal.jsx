import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useGymData, CURRENCIES } from '../context/GymDataContext';
import { Sun, Moon, Palette, Check, X, Sparkles, RefreshCw } from 'lucide-react';

export default function ThemeCustomizerModal({ isOpen, onClose }) {
  const { mode, toggleMode, primaryColor, setPrimaryColor, selectPreset, presets } = useTheme();
  const { gymProfile, setGymProfile } = useGymData();

  if (!isOpen) return null;

  const handleCurrencyChange = (currCode) => {
    setGymProfile(prev => ({ ...prev, currency: currCode }));
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div 
        className="card"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '28px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-float)',
          position: 'relative',
          animation: 'float 0.3s ease-out',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
            }}>
              <Palette size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Custom Theme & Branding</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                Customize colors, light/dark mode and currency
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: '6px', borderRadius: 'var(--radius-full)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Dark / Light Mode */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Appearance Mode
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={() => mode !== 'dark' && toggleMode()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                border: `2px solid ${mode === 'dark' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: mode === 'dark' ? 'var(--color-surface-raised)' : 'transparent',
                color: 'var(--color-text)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9375rem',
                transition: 'all 0.2s ease',
              }}
            >
              <Moon size={18} color={mode === 'dark' ? 'var(--color-primary)' : undefined} />
              Dark Mode (Sleek)
            </button>
            <button
              onClick={() => mode !== 'light' && toggleMode()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                border: `2px solid ${mode === 'light' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: mode === 'light' ? 'var(--color-surface-raised)' : 'transparent',
                color: 'var(--color-text)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9375rem',
                transition: 'all 0.2s ease',
              }}
            >
              <Sun size={18} color={mode === 'light' ? 'var(--color-primary)' : undefined} />
              Light Mode (Clean)
            </button>
          </div>
        </div>

        {/* Color Palette Presets */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Gym Accent Color Presets
            </label>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>
              Live Reactive
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
            {presets.map((preset) => {
              const isSelected = primaryColor.toLowerCase() === preset.hex.toLowerCase();
              return (
                <button
                  key={preset.id}
                  onClick={() => selectPreset(preset.hex)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: isSelected ? 'var(--color-surface-raised)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: preset.hex,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: isSelected ? `0 0 10px ${preset.hex}` : 'none',
                  }}>
                    {isSelected && <Check size={11} color={preset.textColor} strokeWidth={3} />}
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {preset.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom Hex Color Picker */}
          <div style={{
            padding: '14px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface-raised)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                }}
              />
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Custom Brand Color</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Match your gym’s exact logo shade</p>
              </div>
            </div>
            <input
              type="text"
              value={primaryColor.toUpperCase()}
              onChange={(e) => {
                if (e.target.value.startsWith('#') && e.target.value.length <= 7) {
                  setPrimaryColor(e.target.value);
                }
              }}
              className="input-field"
              style={{ width: '95px', textAlign: 'center', fontWeight: 700, letterSpacing: '0.05em' }}
            />
          </div>
        </div>

        {/* Currency Selector */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Gym Currency Format
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Object.values(CURRENCIES).map((curr) => {
              const isSelected = gymProfile.currency === curr.code;
              return (
                <button
                  key={curr.code}
                  onClick={() => handleCurrencyChange(curr.code)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: isSelected ? 'var(--color-primary-light)' : 'transparent',
                    color: isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                  }}
                >
                  {curr.symbol} {curr.code}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview & Done */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              boxShadow: '0 0 10px var(--color-primary)',
            }}></span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Theme applied across all portals
            </span>
          </div>

          <button onClick={onClose} className="btn-primary">
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
