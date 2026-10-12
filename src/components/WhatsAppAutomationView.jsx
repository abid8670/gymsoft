import React, { useState, useEffect } from 'react';
import { useGymData } from '../context/GymDataContext';
import confetti from 'canvas-confetti';
import { 
  MessageSquare, QrCode, CheckCircle2, RefreshCw, Send, 
  Smartphone, ShieldCheck, Zap, AlertCircle, Settings, 
  CheckCheck, Phone, Check, Clock, Radio, Power, Terminal 
} from 'lucide-react';

export default function WhatsAppAutomationView() {
  const { 
    whatsAppConfig, setWhatsAppConfig, gymProfile, 
    currencyObj, members, addLog 
  } = useGymData();

  // Tab State
  const [activeTab, setActiveTab] = useState('direct'); // 'direct' | 'triggers' | 'logs'
  
  // Connection Terminal State (whatsapp-web.js simulation)
  const [connectionStatus, setConnectionStatus] = useState(
    whatsAppConfig.isConnected ? 'READY' : 'DISCONNECTED'
  ); // 'DISCONNECTED' | 'STARTING' | 'QR_READY' | 'AUTHENTICATING' | 'READY'
  const [qrCountdown, setQrCountdown] = useState(35);
  const [showPairingModal, setShowPairingModal] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([
    '[whatsapp-web.js] Client instance initialized with LocalAuth strategy',
    '[whatsapp-web.js] Chromium process spawned in headless mode',
    '[whatsapp-web.js] Client authenticated with session cache',
    `[whatsapp-web.js] Client is ready! Listening on ${whatsAppConfig.linkedNumber}`,
  ]);

  // Live Messaging State
  const [recipientType, setRecipientType] = useState('member'); // 'member' | 'custom'
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || 'm1');
  const [customPhone, setCustomPhone] = useState('+92 300 8472910');
  const [messageText, setMessageText] = useState(
    `Hi {name}! 👋 Your appointment at ${gymProfile.name} is confirmed. Please arrive 10 minutes before your slot.`
  );
  const [isSending, setIsSending] = useState(false);
  const [lastSentSuccess, setLastSentSuccess] = useState(false);

  // Live Chat Simulator Messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'msg-1',
      sender: 'bot',
      text: `Assalam-o-Alaikum Ayesha Malik! 👋 Your Glow & Gains VIP pass at ${gymProfile.name} expires on 01 Nov 2026. Invoice #INV-1048 total is $85. Reply 1 to renew!`,
      time: '08:30 AM',
      status: 'read',
    },
    {
      id: 'msg-2',
      sender: 'client',
      text: 'Thanks for the reminder! Will visit reception this evening.',
      time: '08:35 AM',
      status: 'received',
    },
  ]);

  // Dispatched Logs History
  const [dispatchHistory, setDispatchHistory] = useState([
    { id: 'dh-1', name: 'Ayesha Malik', phone: '+92 321 8847120', type: 'Renewal Notice', time: '08:30 AM Today', status: 'Delivered' },
    { id: 'dh-2', name: 'Sara Khan', phone: '+92 333 9123456', type: 'Salon Appointment', time: '09:00 AM Today', status: 'Delivered' },
    { id: 'dh-3', name: 'Usman Tariq', phone: '+92 312 7789012', type: 'Payment Receipt', time: '09:15 AM Today', status: 'Delivered' },
    { id: 'dh-4', name: 'Bilal Ahmed', phone: '+92 300 4567891', type: 'Check-In Alert', time: '07:15 AM Today', status: 'Delivered' },
  ]);

  // QR Timer
  useEffect(() => {
    let timer;
    if (connectionStatus === 'QR_READY' && qrCountdown > 0) {
      timer = setInterval(() => {
        setQrCountdown(prev => prev - 1);
      }, 1000);
    } else if (connectionStatus === 'QR_READY' && qrCountdown === 0) {
      setQrCountdown(45);
    }
    return () => clearInterval(timer);
  }, [connectionStatus, qrCountdown]);

  const handleStartPairing = () => {
    setConnectionStatus('STARTING');
    setShowPairingModal(true);
    setTerminalLogs(prev => [
      ...prev,
      `[whatsapp-web.js] Starting Chromium session for ${gymProfile.name}...`,
      '[whatsapp-web.js] Fetching WhatsApp Web v2.3000.101...',
    ]);

    setTimeout(() => {
      setConnectionStatus('QR_READY');
      setQrCountdown(45);
      setTerminalLogs(prev => [
        ...prev,
        '[whatsapp-web.js] QR code generated! Waiting for phone camera scan...',
      ]);
    }, 1500);
  };

  const handleSimulateScanSuccess = () => {
    setConnectionStatus('AUTHENTICATING');
    setTerminalLogs(prev => [
      ...prev,
      '[whatsapp-web.js] QR scanned! Exchanging cryptographic handshake...',
      '[whatsapp-web.js] Injecting session credentials into LocalAuth directory...',
    ]);

    setTimeout(() => {
      setConnectionStatus('READY');
      setWhatsAppConfig(prev => ({
        ...prev,
        isConnected: true,
        linkedNumber: '+92 300 8472910',
      }));
      setTerminalLogs(prev => [
        ...prev,
        '[whatsapp-web.js] Authenticated! Client state: READY',
        '[whatsapp-web.js] Ready to send automated & live WhatsApp messages with 0 cost.',
      ]);
      try {
        if (typeof confetti === 'function') {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        }
      } catch (e) { }
      setShowPairingModal(false);
    }, 1800);
  };

  const handleDisconnect = () => {
    setConnectionStatus('DISCONNECTED');
    setWhatsAppConfig(prev => ({ ...prev, isConnected: false }));
    setTerminalLogs(prev => [
      ...prev,
      '[whatsapp-web.js] Client session terminated and unlinked.',
    ]);
  };

  const handleSendLiveMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setIsSending(true);

    const targetMember = members.find(m => m.id === selectedMemberId);
    const recipientName = recipientType === 'member' ? (targetMember?.name || 'Valued Client') : 'Client';
    const recipientPhone = recipientType === 'member' ? (targetMember?.phone || '+92 300 0000000') : customPhone;

    const formattedMessage = messageText
      .replace('{name}', recipientName)
      .replace('{gym}', gymProfile.name)
      .replace('{service}', 'Hair Spa & HydraFacial')
      .replace('{time}', 'Today at 04:00 PM')
      .replace('{amount}', `${currencyObj.symbol}65`)
      .replace('{expiry}', targetMember?.expiryDate || '15 Nov 2026')
      .replace('{invoice}', 'INV-1049');

    setTimeout(() => {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newMsg = {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: formattedMessage,
        time: timeStr,
        status: 'read',
      };
      setChatMessages(prev => [...prev, newMsg]);

      const newLog = {
        id: `dh-${Date.now()}`,
        name: recipientName,
        phone: recipientPhone,
        type: 'Live Direct Message',
        time: `${timeStr} Today`,
        status: 'Delivered',
      };
      setDispatchHistory([newLog, ...dispatchHistory]);

      addLog('whatsapp', 'Direct Live WhatsApp Message Dispatched', `Sent live message to ${recipientName} (${recipientPhone}) via whatsapp-web.js`, 'WhatsApp Hub');

      setIsSending(false);
      setLastSentSuccess(true);
      setTimeout(() => setLastSentSuccess(false), 3000);
    }, 600);
  };

  const applyTemplate = (templateType) => {
    if (templateType === 'salon') {
      setMessageText(`Hi {name}! 💅 Your beauty salon appointment for {service} is confirmed for {time} with our specialist at ${gymProfile.name}. Please arrive on time.`);
    } else if (templateType === 'schedule_update') {
      setMessageText(`Hi {name}! ⏰ Schedule Update from ${gymProfile.name}: Your session timing has been updated to {time}. Please reply 1 to confirm or 2 to reschedule.`);
    } else if (templateType === 'gym_expiry') {
      setMessageText(`Hi {name}! 🏋️ Reminder: Your gym membership at ${gymProfile.name} is scheduled for renewal on {expiry}. Please clear dues to continue uninterrupted training.`);
    } else if (templateType === 'receipt') {
      setMessageText(`Hi {name}! 🧾 Payment received! Thank you for paying {amount} for Invoice #{invoice} at ${gymProfile.name}. Verified by automated counter.`);
    } else if (templateType === 'promo') {
      setMessageText(`Special Schedule Update at ${gymProfile.name}! 🎉 Book any salon treatment or PT session this Friday & get 20% off. Reply YES to reserve your slot.`);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: connectionStatus === 'READY' ? '#25d366' : '#ef4444',
              boxShadow: connectionStatus === 'READY' ? '0 0 10px #25d366' : '0 0 10px #ef4444',
            }}></span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: connectionStatus === 'READY' ? '#25d366' : '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {connectionStatus === 'READY' ? 'WhatsApp Reminders Engine Active' : 'Gateway Disconnected'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              · Zero Paid Meta API Fees · Automated Client Communication
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>
            Client WhatsApp Reminders & Schedule Updates
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Appointments ke scheduled reminders, gym fee recovery alerts, aur timings ke updates clients ke WhatsApp par automatically schedule aur dispatch karein.
          </p>
        </div>

        {/* Pairing Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {connectionStatus === 'READY' ? (
            <button
              onClick={handleDisconnect}
              className="btn-secondary"
              style={{ fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-danger)' }}
            >
              <Power size={14} /> Unlink Device
            </button>
          ) : (
            <button
              onClick={handleStartPairing}
              className="btn-primary"
              style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#25d366', color: '#000', fontWeight: 800 }}
            >
              <QrCode size={16} /> Scan WhatsApp QR to Link Number
            </button>
          )}
        </div>
      </div>

      {/* Connection Status & Engine Info Card */}
      <div className="card" style={{
        padding: '18px 24px',
        backgroundColor: 'var(--color-surface)',
        border: connectionStatus === 'READY' ? '1.5px solid rgba(37, 211, 102, 0.4)' : '1.5px solid var(--color-border)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: connectionStatus === 'READY' ? 'rgba(37, 211, 102, 0.15)' : 'var(--color-surface-raised)',
            color: connectionStatus === 'READY' ? '#25d366' : 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
          }}>
            <MessageSquare size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                {connectionStatus === 'READY' ? `Linked Phone: ${whatsAppConfig.linkedNumber}` : 'No Phone Number Linked'}
              </h4>
              <span className={connectionStatus === 'READY' ? 'badge badge-success' : 'badge badge-danger'}>
                {connectionStatus === 'READY' ? 'ONLINE ✓✓' : 'OFFLINE'}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Engine: <strong>whatsapp-web.js (Node.js Chromium LocalAuth)</strong> · Device: Samsung Galaxy / Web Client v2.3000 · Battery: 94% ⚡
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={handleStartPairing}
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            <RefreshCw size={13} /> Re-scan QR Code
          </button>
        </div>
      </div>

      {/* Main Grid: Left Messaging Controls, Right Live WhatsApp Phone Canvas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
      }}>
        {/* Left Column: Direct Message & Automation Tabs */}
        <div>
          {/* Sub Navigation */}
          <div style={{
            display: 'flex',
            gap: '6px',
            backgroundColor: 'var(--color-surface-raised)',
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '16px',
          }}>
            <button
              onClick={() => setActiveTab('direct')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-xs)',
                border: 'none',
                backgroundColor: activeTab === 'direct' ? 'var(--color-surface)' : 'transparent',
                color: activeTab === 'direct' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: activeTab === 'direct' ? 800 : 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              💬 Send Live Direct Message
            </button>
            <button
              onClick={() => setActiveTab('triggers')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-xs)',
                border: 'none',
                backgroundColor: activeTab === 'triggers' ? 'var(--color-surface)' : 'transparent',
                color: activeTab === 'triggers' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: activeTab === 'triggers' ? 800 : 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              ⚡ Auto Reminder Rules
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-xs)',
                border: 'none',
                backgroundColor: activeTab === 'logs' ? 'var(--color-surface)' : 'transparent',
                color: activeTab === 'logs' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: activeTab === 'logs' ? 800 : 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              📋 Dispatch History Log
            </button>
          </div>

          {/* TAB 1: DIRECT LIVE MESSAGING */}
          {activeTab === 'direct' && (
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>
                Send Live WhatsApp Message
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Kissi bhi member ya custom number ko direct WhatsApp message bhejein:
              </p>

              {/* 1-Tap Quick Templates */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                  1-Tap Message Templates:
                </label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => applyTemplate('salon')}
                    className="badge badge-primary"
                    style={{ cursor: 'pointer', border: 'none', padding: '6px 10px' }}
                  >
                    💅 Salon Booking Confirmation
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate('schedule_update')}
                    className="badge badge-primary"
                    style={{ cursor: 'pointer', border: 'none', padding: '6px 10px', backgroundColor: '#3b82f6', color: '#fff' }}
                  >
                    ⏰ Timing & Schedule Update
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate('gym_expiry')}
                    className="badge badge-primary"
                    style={{ cursor: 'pointer', border: 'none', padding: '6px 10px' }}
                  >
                    🏋️ Gym Fee Expiry Reminder
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate('receipt')}
                    className="badge badge-primary"
                    style={{ cursor: 'pointer', border: 'none', padding: '6px 10px' }}
                  >
                    🧾 Payment Settled Receipt
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate('promo')}
                    className="badge badge-primary"
                    style={{ cursor: 'pointer', border: 'none', padding: '6px 10px' }}
                  >
                    🎉 Weekend 20% Off Promo
                  </button>
                </div>
              </div>

              {/* Recipient Selection */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '14px', marginBottom: '8px', fontSize: '0.8125rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      checked={recipientType === 'member'}
                      onChange={() => setRecipientType('member')}
                    />
                    <span>Select Client from Roster</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      checked={recipientType === 'custom'}
                      onChange={() => setRecipientType('custom')}
                    />
                    <span>Enter Custom Phone Number</span>
                  </label>
                </div>

                {recipientType === 'member' ? (
                  <select
                    value={selectedMemberId}
                    onChange={(e) => setSelectedMemberId(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', fontSize: '0.875rem' }}
                  >
                    {members.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.phone}) — {m.planName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', fontSize: '0.875rem' }}
                  />
                )}
              </div>

              {/* Message Content */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                    Message Content (Tags Auto-Replaced):
                  </label>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>
                    {messageText.length} characters
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', resize: 'vertical', fontSize: '0.875rem' }}
                />
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>
                  Supported dynamic tags: {'{name}'}, {'{service}'}, {'{time}'}, {'{amount}'}, {'{expiry}'}, {'{gym}'}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSendLiveMessage}
                disabled={isSending}
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
                  backgroundColor: '#25d366',
                  color: '#000',
                }}
              >
                {isSending ? (
                  'Dispatching via whatsapp-web.js...'
                ) : lastSentSuccess ? (
                  'Message Dispatched Successfully! ✓✓'
                ) : (
                  <>
                    <Send size={18} /> Send Live WhatsApp Message 🚀
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 2: AUTOMATIC TRIGGER RULES */}
          {activeTab === 'triggers' && (
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>
                Automated Autopilot Dispatch Rules
              </h4>

              {/* Days Before Expiry */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                  Send Membership Renewal Notice:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 5, 7].map(days => (
                    <button
                      key={days}
                      onClick={() => setWhatsAppConfig({ ...whatsAppConfig, daysBeforeExpiry: days })}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: `1.5px solid ${whatsAppConfig.daysBeforeExpiry === days ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        backgroundColor: whatsAppConfig.daysBeforeExpiry === days ? 'var(--color-primary-light)' : 'var(--color-surface-raised)',
                        color: whatsAppConfig.daysBeforeExpiry === days ? 'var(--color-primary)' : 'var(--color-text)',
                        fontWeight: 800,
                        cursor: 'pointer',
                        fontSize: '0.8125rem',
                      }}
                    >
                      {days} Days Before
                    </button>
                  ))}
                </div>
              </div>

              {/* Trigger Toggles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-surface-raised)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: 700 }}>Auto-Send on Salon Booking</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>2 hours before hair/spa slot</p>
                  </div>
                  <span className="badge badge-success">Enabled ✓</span>
                </div>

                <div style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-surface-raised)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: 700 }}>Auto-Send on Invoice Settlement</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Instant payment thank you receipt</p>
                  </div>
                  <span className="badge badge-success">Enabled ✓</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DISPATCH LOGS */}
          {activeTab === 'logs' && (
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>
                Real-Time WhatsApp Dispatches
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {dispatchHistory.map(log => (
                  <div
                    key={log.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <h5 style={{ fontSize: '0.875rem', fontWeight: 800 }}>{log.name} ({log.phone})</h5>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {log.type} · {log.time}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#25d366', fontWeight: 800 }}>
                      ✓✓ Delivered
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Realistic WhatsApp Phone Chat Simulator */}
        <div className="card" style={{
          padding: '24px',
          backgroundColor: '#0b141a',
          color: '#e9edef',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #222e35',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {/* Chat Header */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #222e35',
              paddingBottom: '12px',
              marginBottom: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#25d366',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                }}>
                  ⚡
                </div>
                <div>
                  <h5 style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#ffffff' }}>
                    {gymProfile.name}
                  </h5>
                  <p style={{ fontSize: '0.75rem', color: '#00a884', fontWeight: 600 }}>
                    Official Business WhatsApp
                  </p>
                </div>
              </div>
              <span style={{ fontSize: '0.6875rem', color: '#8696a0' }}>Online</span>
            </div>

            {/* Chat Body */}
            <div style={{
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              gap: '12px',
              paddingBottom: '12px',
            }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{
                  backgroundColor: '#182229',
                  color: '#8696a0',
                  fontSize: '0.6875rem',
                  padding: '4px 10px',
                  borderRadius: '8px',
                }}>
                  TODAY
                </span>
              </div>

              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender === 'bot' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    backgroundColor: msg.sender === 'bot' ? '#005c4b' : '#202c33',
                    color: '#e9edef',
                    padding: '10px 14px',
                    borderRadius: msg.sender === 'bot' ? '12px 0px 12px 12px' : '0px 12px 12px 12px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    fontSize: '0.8125rem',
                    lineHeight: 1.45,
                  }}
                >
                  <p style={{ margin: 0 }}>{msg.text}</p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '4px',
                    fontSize: '0.625rem',
                    color: '#8696a0',
                  }}>
                    <span>{msg.time}</span>
                    {msg.sender === 'bot' && (
                      <CheckCheck size={14} color="#53bdeb" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Footer Mockup */}
          <div style={{
            borderTop: '1px solid #222e35',
            paddingTop: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <input
              type="text"
              readOnly
              value="whatsapp-web.js client active and ready..."
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#2a3942',
                color: '#8696a0',
                fontSize: '0.75rem',
              }}
            />
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#00a884',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Send size={15} />
            </div>
          </div>
        </div>
      </div>

      {/* PAIRING MODAL (whatsapp-web.js QR Code Scanner) */}
      {showPairingModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
              backgroundColor: 'var(--color-surface)',
              border: '2px solid #25d366',
              boxShadow: '0 25px 60px -15px rgba(37, 211, 102, 0.4)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="badge badge-success" style={{ marginBottom: '6px' }}>
                  whatsapp-web.js Terminal Link
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>
                  Scan QR with Your Phone's WhatsApp
                </h3>
              </div>
              <button
                onClick={() => setShowPairingModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Steps & QR Display */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
              {/* Instructions */}
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <strong style={{ color: 'var(--color-primary)' }}>1.</strong>
                  <span>Apne phone par official WhatsApp open karein.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <strong style={{ color: 'var(--color-primary)' }}>2.</strong>
                  <span>Settings ya 3-Dots menu par tap karein aur <strong>Linked Devices</strong> select karein.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <strong style={{ color: 'var(--color-primary)' }}>3.</strong>
                  <span><strong>Link a Device</strong> par tap karke apna camera is QR code par point karein.</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '8px' }}>
                  ✓ Zero Meta fees · ✓ Local session encrypted
                </p>
              </div>

              {/* Live QR Mockup */}
              <div style={{
                backgroundColor: '#ffffff',
                padding: '16px',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}>
                {/* SVG Real QR Code visual */}
                <svg width="150" height="150" viewBox="0 0 100 100" fill="#000000">
                  <path d="M0,0 h30 v30 h-30 z M5,5 v20 h20 v-20 z M10,10 h10 v10 h-10 z" />
                  <path d="M70,0 h30 v30 h-30 z M75,5 v20 h20 v-20 z M80,10 h10 v10 h-10 z" />
                  <path d="M0,70 h30 v30 h-30 z M5,75 v20 h20 v-20 z M10,80 h10 v10 h-10 z" />
                  <rect x="40" y="10" width="10" height="10" />
                  <rect x="55" y="15" width="10" height="10" />
                  <rect x="35" y="35" width="30" height="30" />
                  <rect x="75" y="45" width="15" height="15" />
                  <rect x="15" y="45" width="15" height="15" />
                  <rect x="40" y="75" width="10" height="15" />
                  <rect x="60" y="70" width="15" height="10" />
                  <rect x="80" y="80" width="15" height="15" />
                </svg>
                <div style={{ marginTop: '8px', fontSize: '0.6875rem', color: '#4b5563', fontWeight: 700 }}>
                  QR expires in <span style={{ color: '#ef4444' }}>{qrCountdown}s</span>
                </div>
              </div>
            </div>

            {/* Test Scan Success Simulator Button */}
            <button
              onClick={handleSimulateScanSuccess}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.9375rem',
                fontWeight: 800,
                backgroundColor: '#25d366',
                color: '#000',
              }}
            >
              Simulate Successful Phone QR Scan 📲
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
