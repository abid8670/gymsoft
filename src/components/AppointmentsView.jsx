import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  Calendar, Clock, Sparkles, User, Scissors, 
  CheckCircle2, Plus, Phone, MessageSquare, Filter, 
  Check, AlertCircle, Eye, ArrowRight 
} from 'lucide-react';

export default function AppointmentsView() {
  const { 
    appointments, salonServices, staff, bookAppointment, 
    updateAppointmentStatus, currencyObj, members 
  } = useGymData();

  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    memberName: members[0]?.name || 'Ayesha Malik',
    memberPhone: members[0]?.phone || '+92 321 8847120',
    serviceId: salonServices[0]?.id || 'srv-1',
    date: 'Today',
    time: '02:00 PM',
  });

  const filteredAppointments = appointments.filter(a => {
    return filterStatus === 'all' || a.status === filterStatus;
  });

  const handleBook = (e) => {
    e.preventDefault();
    const service = salonServices.find(s => s.id === formData.serviceId);
    if (!service) return;

    bookAppointment({
      memberName: formData.memberName,
      memberPhone: formData.memberPhone,
      serviceId: service.id,
      serviceName: service.name,
      stylist: service.stylist,
      date: formData.date,
      time: formData.time,
      price: service.price,
    });

    setIsModalOpen(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-primary">
              Salon & Spa Desk
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Beauty Salon & Spa Appointments
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Schedule stylists, track treatment chairs, and send automated WhatsApp reminders.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus size={16} /> Book New Appointment
        </button>
      </div>

      {/* Quick Status Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: `All Appointments (${appointments.length})` },
          { id: 'Confirmed', label: `Confirmed (${appointments.filter(a => a.status === 'Confirmed').length})` },
          { id: 'In Chair', label: `In Chair Now (${appointments.filter(a => a.status === 'In Chair').length})` },
          { id: 'Completed', label: `Completed (${appointments.filter(a => a.status === 'Completed').length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: `1.5px solid ${filterStatus === tab.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
              backgroundColor: filterStatus === tab.id ? 'var(--color-primary-light)' : 'var(--color-surface)',
              color: filterStatus === tab.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Appointments Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px',
        marginBottom: '36px',
      }}>
        {filteredAppointments.map(apt => (
          <div
            key={apt.id}
            className="card card-interactive"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: apt.status === 'In Chair' ? '2px solid var(--color-tech)' : undefined,
            }}
          >
            <div>
              {/* Header with time and status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  backgroundColor: 'var(--color-primary-light)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-xs)',
                }}>
                  <Clock size={13} /> {apt.date}, {apt.time}
                </span>

                <span className={`badge badge-${apt.status === 'Completed' ? 'success' : apt.status === 'In Chair' ? 'primary' : 'warning'}`}>
                  {apt.status === 'In Chair' ? '💇 In Chair' : apt.status}
                </span>
              </div>

              {/* Client Info */}
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '2px' }}>
                {apt.memberName}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', marginBottom: '14px' }}>
                📞 {apt.memberPhone}
              </p>

              {/* Service Details */}
              <div style={{
                backgroundColor: 'var(--color-surface-raised)',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                marginBottom: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Scissors size={14} color="var(--color-primary)" />
                  <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{apt.serviceName}</p>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Stylist: <strong style={{ color: 'var(--color-text)' }}>{apt.stylist}</strong>
                </p>
                <p style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
                  Fee: {currencyObj.symbol}{apt.price}
                </p>
              </div>
            </div>

            {/* Actions: In Chair / Mark Completed */}
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '14px' }}>
              {apt.status === 'Confirmed' && (
                <button
                  onClick={() => updateAppointmentStatus(apt.id, 'In Chair')}
                  className="btn-primary"
                  style={{ flex: 1, fontSize: '0.75rem', padding: '8px' }}
                >
                  Seat Client (In Chair)
                </button>
              )}

              {apt.status === 'In Chair' && (
                <button
                  onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                  className="btn-primary"
                  style={{ flex: 1, fontSize: '0.75rem', padding: '8px', backgroundColor: 'var(--color-success)', color: '#ffffff' }}
                >
                  Service Completed ✓
                </button>
              )}

              {apt.status === 'Completed' && (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} /> Completed & Paid
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Available Salon & Spa Menu Showcase */}
      <div className="card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px' }}>
          Salon & Spa Signature Service Menu
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {salonServices.map(srv => (
            <div
              key={srv.id}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>{srv.name}</h4>
                <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                  {currencyObj.symbol}{srv.price}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '8px', lineHeight: 1.4 }}>
                {srv.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--color-text-faint)' }}>
                <span>⏱️ {srv.durationMinutes} mins</span>
                <span>Stylist: {srv.stylist.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Appointment Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 120,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}>
          <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '28px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px' }}>
              Book Salon & Spa Treatment
            </h3>

            <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                  Client Name *
                </label>
                <input
                  type="text"
                  value={formData.memberName}
                  onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                  WhatsApp Phone *
                </label>
                <input
                  type="text"
                  value={formData.memberPhone}
                  onChange={(e) => setFormData({ ...formData, memberPhone: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                  Select Service
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="input-field"
                >
                  {salonServices.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({currencyObj.symbol}{s.price} · {s.durationMinutes}m) - {s.stylist}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                    Date
                  </label>
                  <select
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="input-field"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Weekend">This Weekend</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                    Time Slot
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="input-field"
                  >
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:30 PM">07:30 PM</option>
                  </select>
                </div>
              </div>

              <div style={{
                padding: '10px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontSize: '0.75rem',
                color: 'var(--color-text)',
              }}>
                ✓ Automatic WhatsApp booking confirmation will be sent to the client's number.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Confirm & Send WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
