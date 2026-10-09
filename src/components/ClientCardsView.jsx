import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  FileText, Sparkles, HeartPulse, Scissors, 
  AlertTriangle, CheckCircle2, User, Phone, Search, Edit3 
} from 'lucide-react';

export default function ClientCardsView() {
  const { members, setMembers, addLog } = useGymData();
  const [selectedMember, setSelectedMember] = useState(members[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    hairFormula: members[0]?.hairFormula || '',
    skinType: members[0]?.skinType || '',
    notes: members[0]?.notes || '',
  });

  const handleSelect = (m) => {
    setSelectedMember(m);
    setEditData({
      hairFormula: m.hairFormula || '',
      skinType: m.skinType || '',
      notes: m.notes || '',
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    setMembers(prev => prev.map(m => {
      if (m.id === selectedMember.id) {
        return {
          ...m,
          hairFormula: editData.hairFormula,
          skinType: editData.skinType,
          notes: editData.notes,
        };
      }
      return m;
    }));

    setSelectedMember(prev => ({
      ...prev,
      hairFormula: editData.hairFormula,
      skinType: editData.skinType,
      notes: editData.notes,
    }));

    setIsEditing(false);
    addLog('member', 'Consultation Profile Updated', `Updated skin/hair formula notes for ${selectedMember.name}`, 'Stylist / Coach');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-primary">
            Aesthetics & Fitness Consultation
          </span>
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
          Client Beauty & Training Cards
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Record hair dye formulas, patch tests, skin sensitivities, and workout injury precautions.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        alignItems: 'start',
      }}>
        {/* Left: Client List */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px' }}>
            Select Client
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {members.map(m => {
              const isSelected = selectedMember.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => handleSelect(m)}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-surface-raised)',
                    border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <img
                    src={m.avatar}
                    alt={m.name}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{m.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {m.planName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Client Full Consultation Card */}
        <div className="card" style={{ padding: '28px', backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border-strong)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src={selectedMember.avatar}
                alt={selectedMember.name}
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)' }}
              />
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{selectedMember.name}</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                  📞 {selectedMember.phone} · Member since {selectedMember.joinDate}
                </p>
                <span className="badge badge-primary" style={{ marginTop: '4px' }}>
                  {selectedMember.planName}
                </span>
              </div>
            </div>

            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="btn-primary"
              style={{ fontSize: '0.8125rem', padding: '8px 14px' }}
            >
              {isEditing ? 'Save Changes ✓' : 'Edit Profile'}
            </button>
          </div>

          {/* Consultation Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Salon Hair Formulation */}
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#ff2a85', fontWeight: 700, fontSize: '0.875rem' }}>
                <Scissors size={16} /> Salon Haircare & Dye Formulation
              </div>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={editData.hairFormula}
                  onChange={(e) => setEditData({ ...editData, hairFormula: e.target.value })}
                  className="input-field"
                  style={{ fontSize: '0.875rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.5 }}>
                  {selectedMember.hairFormula || 'No formula recorded yet.'}
                </p>
              )}
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)', marginTop: '4px', display: 'block' }}>
                Favorite Stylist: {selectedMember.favoriteStylist || 'Natasha'}
              </span>
            </div>

            {/* Skincare & Allergies */}
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#10b981', fontWeight: 700, fontSize: '0.875rem' }}>
                <Sparkles size={16} /> Skin Type & Facial Allergies
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.skinType}
                  onChange={(e) => setEditData({ ...editData, skinType: e.target.value })}
                  className="input-field"
                  style={{ fontSize: '0.875rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>
                  {selectedMember.skinType || 'Normal / No known allergies'}
                </p>
              )}
            </div>

            {/* Fitness & Injury Precautions */}
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--color-warning)', fontWeight: 700, fontSize: '0.875rem' }}>
                <HeartPulse size={16} /> Fitness Goals & Physical Injury Notes
              </div>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={editData.notes}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  className="input-field"
                  style={{ fontSize: '0.875rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.5 }}>
                  {selectedMember.notes || 'General strength training & conditioning.'}
                </p>
              )}
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)', marginTop: '4px', display: 'block' }}>
                Assigned Coach: {selectedMember.trainerName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
