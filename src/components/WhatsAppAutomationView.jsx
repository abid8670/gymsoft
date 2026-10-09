import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  MessageSquare, QrCode, CheckCircle2, RefreshCw, Send, 
  Smartphone, ShieldCheck, Zap, AlertCircle, Settings, CheckCheck 
} from 'lucide-react';

export default function WhatsAppAutomationView() {
  const { whatsAppConfig, setWhatsAppConfig, gymProfile, currencyObj, addLog } = useGymData();
  const [testNumber, setTestNumber] = useState('+92 321 8847120');
  const [testSent, setTestSent] = useState(false);
  const [isPairingModal, setIsPairingModal] = useState(false);

  const handleSendTest = () => {
    setTestSent(true);
    addLog('reminder', 'WhatsApp Test Message Dispatched', `Sent test renewal notice to ${testNumber}`, 'Owner');
    setTimeout(() => {
      setTestSent(false);
    }, 4000);
  };

  const previewMessage = whatsAppConfig.reminderTemplate
    .replace('{name}', 'Ayesha Malik')
    .replace('{plan}', 'Gold VIP Plan')
    .replace('{gym}', gymProfile.name)
    .replace('{expiry}', '01 Nov 2026')
    .replace('{invoice}', 'INV-1048')
    .replace('{amount}', `${currencyObj.symbol}65`)
    .replace('{link}', `https://${gymProfile.customDomain}/pay/inv-1048`);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 10px #10b981',
            }}></span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Own-Number WhatsApp Gateway Online
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            WhatsApp Automation Center
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Linked once with QR code. Zero paid API. Zero cost per message.
          </p>
        </div>

        <button
          onClick={() => setIsPairingModal(true)}
          className="btn-secondary"
          style={{ fontSize: '0.875rem' }}
        >
          <QrCode size={16} /> Link New Device / QR
        </button>
      </div>

      {/* Main Grid: Left Settings & Automation Rules, Right Live Phone Chat Simulator */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
      }}>
        {/* Left: Configuration & Rules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Status Box */}
          <div className="card" style={{ padding: '20px', border: '1px solid rgba(16, 185, 129, 0.3)', backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>
                    Linked to {whatsAppConfig.linkedNumber}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Connected via Baileys Web Protocol (No Meta Cloud Fees)
                  </p>
                </div>
              </div>
              <span className="badge badge-success">Ready</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px', borderTop: '1px solid var(--color-border)', paddingTop: '12px', fontSize: '0.8125rem' }}>
              <div>
                <span style={{ color: 'var(--color-text-faint)' }}>Cost Per Message:</span>
                <p style={{ fontWeight: 800, color: 'var(--color-success)' }}>$0.00 (Unlimited)</p>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-faint)' }}>Sender ID:</span>
                <p style={{ fontWeight: 800 }}>Gym's Official Number</p>
              </div>
            </div>
          </div>

          {/* Trigger Rules */}
          <div className="card" style={{ padding: '24px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>
              Automatic Dispatch Triggers
            </h4>

            {/* Days before expiry */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                Send Renewal Reminder
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 3, 5, 7].map(days => (
                  <button
                    key={days}
                    onClick={() => setWhatsAppConfig({ ...whatsAppConfig, daysBeforeExpiry: days })}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1.5px solid ${whatsAppConfig.daysBeforeExpiry === days ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      backgroundColor: whatsAppConfig.daysBeforeExpiry === days ? 'var(--color-primary-light)' : 'var(--color-surface-raised)',
                      color: whatsAppConfig.daysBeforeExpiry === days ? 'var(--color-primary)' : 'var(--color-text)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                    }}
                  >
                    {days} Days Before
                  </button>
                ))}
              </div>
            </div>

            {/* Template Editor */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                Message Template (Auto-populated with member data)
              </label>
              <textarea
                rows={4}
                value={whatsAppConfig.reminderTemplate}
                onChange={(e) => setWhatsAppConfig({ ...whatsAppConfig, reminderTemplate: e.target.value })}
                className="input-field"
                style={{ resize: 'vertical', fontSize: '0.875rem' }}
              />
              <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)', marginTop: '6px' }}>
                Supported tags: {'{name}'}, {'{plan}'}, {'{expiry}'}, {'{gym}'}, {'{invoice}'}, {'{amount}'}, {'{link}'}
              </p>
            </div>

            {/* Test dispatch */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                Send Live Test Message
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={testNumber}
                  onChange={(e) => setTestNumber(e.target.value)}
                  className="input-field"
                  placeholder="+92 300 0000000"
                />
                <button onClick={handleSendTest} className="btn-primary" style={{ flexShrink: 0 }}>
                  <Send size={15} /> {testSent ? 'Sent ✓✓' : 'Send Test'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Realistic WhatsApp Chat Simulator */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#0b141a', color: '#e9edef', borderRadius: 'var(--radius-lg)' }}>
          {/* Chat Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #222e35',
            paddingBottom: '14px',
            marginBottom: '18px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
              }}>
                ⚡
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#ffffff' }}>
                  {gymProfile.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#00a884' }}>
                  Official Business Account
                </p>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#8696a0' }}>Today</span>
          </div>

          {/* Chat Canvas */}
          <div style={{
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '12px',
          }}>
            {/* Timestamp tag */}
            <div style={{ textAlign: 'center' }}>
              <span style={{
                backgroundColor: '#182229',
                color: '#8696a0',
                fontSize: '0.6875rem',
                padding: '4px 10px',
                borderRadius: '8px',
              }}>
                TODAY, 08:00 AM
              </span>
            </div>

            {/* Outgoing Message Bubble */}
            <div style={{
              alignSelf: 'flex-end',
              maxWidth: '85%',
              backgroundColor: '#005c4b',
              color: '#e9edef',
              padding: '12px 14px',
              borderRadius: '12px 0px 12px 12px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              position: 'relative',
            }}>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.45, whiteSpace: 'pre-wrap' }}>
                {previewMessage}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', marginTop: '6px' }}>
                <span style={{ fontSize: '0.6875rem', color: '#8696a0' }}>08:00 AM</span>
                <CheckCheck size={14} color="#53bdeb" />
              </div>
            </div>

            {/* Simulated Member Reply */}
            <div style={{
              alignSelf: 'flex-start',
              maxWidth: '80%',
              backgroundColor: '#202c33',
              color: '#e9edef',
              padding: '10px 12px',
              borderRadius: '0px 12px 12px 12px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            }}>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.4 }}>
                Thanks for the reminder! I just transferred the fee via Meezan Bank. Please verify 🙏
              </p>
              <div style={{ textAlign: 'right', marginTop: '4px' }}>
                <span style={{ fontSize: '0.6875rem', color: '#8696a0' }}>08:14 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Pairing Modal */}
      {isPairingModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 120,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}>
          <div className="card" style={{ maxWidth: '420px', padding: '32px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
              Link Your Gym's WhatsApp
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
              Open WhatsApp on your phone → Linked Devices → Link a Device, and point your camera at this QR code.
            </p>

            {/* Simulated Animated QR */}
            <div style={{
              width: '200px',
              height: '200px',
              margin: '0 auto 20px auto',
              backgroundColor: '#ffffff',
              padding: '14px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 0 30px var(--color-primary-glow)',
            }}>
              <QrCode size={170} color="#000000" />
            </div>

            <button
              onClick={() => {
                alert('Device linked successfully! Zero-cost WhatsApp automation is active.');
                setIsPairingModal(false);
              }}
              className="btn-primary"
              style={{ width: '100%', marginBottom: '10px' }}
            >
              Simulate Scan & Pair
            </button>
            <button
              onClick={() => setIsPairingModal(false)}
              className="btn-secondary"
              style={{ width: '100%' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
