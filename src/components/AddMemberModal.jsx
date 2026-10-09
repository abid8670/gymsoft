import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { X, UserPlus, Check, MessageSquare, CreditCard } from 'lucide-react';

export default function AddMemberModal({ isOpen, onClose }) {
  const { plans, addMember, currencyObj } = useGymData();

  const defaultPlan = plans[0] || { id: 'p1', name: 'Standard Fitness', price: 40 };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    planId: defaultPlan.id,
    planName: defaultPlan.name,
    price: defaultPlan.price,
    trainerName: 'Self-guided',
    notes: '',
    sendWhatsApp: true,
  });

  if (!isOpen) return null;

  const handlePlanChange = (planId) => {
    const selected = plans.find(p => p.id === planId);
    if (selected) {
      setFormData({
        ...formData,
        planId: selected.id,
        planName: selected.name,
        price: selected.price,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Calculate expiry 30 days from now
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    const expiryDateStr = expiry.toISOString().split('T')[0];

    addMember({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@gymmember.com`,
      planId: formData.planId,
      planName: formData.planName,
      price: formData.price,
      expiryDate: expiryDateStr,
      trainerName: formData.trainerName,
      notes: formData.notes || 'Newly registered athlete',
    });

    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 130,
      backgroundColor: 'rgba(0, 0, 0, 0.78)',
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
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <UserPlus size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Enroll New Member</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Creates subscription & generates automated invoice
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-ghost" style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Daniyal Khan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              required
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                WhatsApp Number *
              </label>
              <input
                type="text"
                placeholder="+92 300 1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="athlete@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
              Select Membership Plan
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {plans.map(p => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => handlePlanChange(p.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1.5px solid ${formData.planId === p.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: formData.planId === p.id ? 'var(--color-primary-light)' : 'var(--color-surface-raised)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--color-text)',
                  }}
                >
                  <p style={{ fontWeight: 700, fontSize: '0.8125rem' }}>{p.name}</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '2px' }}>
                    {currencyObj.symbol}{p.price} <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>/ mo</span>
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
              Assigned Coach / Trainer
            </label>
            <select
              value={formData.trainerName}
              onChange={(e) => setFormData({ ...formData, trainerName: e.target.value })}
              className="input-field"
            >
              <option value="Self-guided">Self-guided (Floor Gym)</option>
              <option value="Farhan Ali (Pro PT)">Farhan Ali (Pro PT)</option>
              <option value="Zainab Noor">Zainab Noor (CrossFit Coach)</option>
              <option value="Hamza Riaz">Hamza Riaz (Powerlifting Specialist)</option>
            </select>
          </div>

          {/* Instant WhatsApp welcome checkbox */}
          <div style={{
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <input
              type="checkbox"
              id="sendWhatsApp"
              checked={formData.sendWhatsApp}
              onChange={(e) => setFormData({ ...formData, sendWhatsApp: e.target.checked })}
              style={{ width: '16px', height: '16px', accentColor: '#10b981' }}
            />
            <label htmlFor="sendWhatsApp" style={{ fontSize: '0.8125rem', color: 'var(--color-text)', cursor: 'pointer', fontWeight: 600 }}>
              Send welcome WhatsApp message with member app link from gym's number
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Enroll & Generate Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
