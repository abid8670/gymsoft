import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  FileText, CheckCircle2, MessageSquare, DollarSign, 
  UserPlus, Globe, Shield, Filter, Search, Clock 
} from 'lucide-react';

export default function ActivityLogsView() {
  const { logs } = useGymData();
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filterType === 'all' || log.type === filterType;
    const matchesSearch = 
      log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLogIcon = (type) => {
    switch (type) {
      case 'checkin':
        return <CheckCircle2 size={16} color="var(--color-tech)" />;
      case 'payment':
        return <DollarSign size={16} color="var(--color-success)" />;
      case 'reminder':
        return <MessageSquare size={16} color="#10b981" />;
      case 'member_new':
        return <UserPlus size={16} color="var(--color-primary)" />;
      case 'domain_linked':
        return <Globe size={16} color="var(--color-tech)" />;
      default:
        return <FileText size={16} color="var(--color-text-muted)" />;
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
          System Activity Audit Log
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Tamper-proof chronological trail of every check-in, payment receipt, and WhatsApp reminder dispatched.
        </p>
      </div>

      {/* Filter and Search */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search event details, actor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '38px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Events' },
            { id: 'checkin', label: 'Check-Ins' },
            { id: 'payment', label: 'Payments' },
            { id: 'reminder', label: 'WhatsApp' },
            { id: 'member_new', label: 'Registrations' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${filterType === f.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: filterType === f.id ? 'var(--color-primary-light)' : 'var(--color-surface)',
                color: filterType === f.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Timeline */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredLogs.map(log => (
            <div
              key={log.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface-raised)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {getLogIcon(log.type)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>
                    {log.title}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {log.time}
                  </span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {log.detail}
                </p>
                <span style={{ fontSize: '0.6875rem', color: 'var(--color-primary)', fontWeight: 600, marginTop: '4px', display: 'inline-block' }}>
                  Triggered by: {log.actor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
