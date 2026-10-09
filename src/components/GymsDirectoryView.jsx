import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  Search, MapPin, Star, ShieldCheck, ExternalLink, 
  MessageSquare, Filter, Building2, Sparkles 
} from 'lucide-react';

export default function GymsDirectoryView() {
  const { publicGyms, currencyObj } = useGymData();
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const cities = ['All', 'Lahore', 'Karachi', 'Islamabad', 'Dubai', 'New York', 'London'];

  const filteredGyms = publicGyms.filter(gym => {
    const matchesCity = selectedCity === 'All' || gym.city === selectedCity;
    const matchesSearch = 
      gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCity && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Directory Hero */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
          Global Fitness Directory
        </span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800 }}>
          Discover Verified Gyms by City
        </h2>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '580px', margin: '8px auto 0 auto', fontSize: '0.9375rem' }}>
          Every gym on Gym Management Soft gets listed in our public search directory, helping local fitness enthusiasts discover your facility.
        </p>
      </div>

      {/* City Tabs and Search */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        {/* City Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${selectedCity === city ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: selectedCity === city ? 'var(--color-primary-light)' : 'var(--color-surface)',
                color: selectedCity === city ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: 700,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search gym, facility or area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '38px' }}
          />
        </div>
      </div>

      {/* Gyms Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {filteredGyms.map(gym => (
          <div
            key={gym.id}
            className="card card-interactive"
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Gym Image */}
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                  src={gym.image}
                  alt={gym.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(7, 9, 14, 0.8) 0%, transparent 60%)',
                }} />

                {/* City badge */}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <MapPin size={12} color="var(--color-primary)" /> {gym.city}
                </span>

                {/* Starting price badge */}
                <span style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '999px',
                }}>
                  From ${gym.monthlyStarting}/mo
                </span>
              </div>

              {/* Gym Content */}
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                    {gym.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f59e0b', fontSize: '0.8125rem', fontWeight: 700 }}>
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    <span>{gym.rating}</span>
                    <span style={{ color: 'var(--color-text-faint)', fontWeight: 400 }}>({gym.reviews})</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                  {gym.location}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {gym.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--color-surface-raised)',
                        color: 'var(--color-text-muted)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{
              padding: '14px 20px',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--color-surface-raised)',
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                <ShieldCheck size={14} /> Verified Member
              </span>

              <button
                onClick={() => alert(`Opening contact and booking pass for ${gym.name}`)}
                className="btn-primary"
                style={{ fontSize: '0.75rem', padding: '6px 14px' }}
              >
                View Gym <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
