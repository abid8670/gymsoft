import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  Users, DollarSign, Award, CheckCircle2, 
  TrendingUp, Scissors, Dumbbell, ShieldCheck, Sparkles 
} from 'lucide-react';

export default function StaffCommissionsView() {
  const { staff, setStaff, currencyObj, addLog } = useGymData();
  const [payoutSuccess, setPayoutSuccess] = useState(null);

  const handleSettlePayout = (member) => {
    setPayoutSuccess(member.name);
    addLog('expense', 'Staff Payroll Settled', `Paid base salary + commissions to ${member.name}`, 'Owner');
    setTimeout(() => setPayoutSuccess(null), 3000);
  };

  const totalPayroll = staff.reduce((sum, s) => sum + s.baseSalary + s.commissionEarned, 0);
  const totalCommissions = staff.reduce((sum, s) => sum + s.commissionEarned, 0);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-primary">
              Hybrid Payroll Engine
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Staff & Stylist Commissions
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Automate trainer PT session cuts and salon stylist service commissions with clear transparency.
          </p>
        </div>

        {/* Totals Pill */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Monthly Commissions</span>
            <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              {currencyObj.symbol}{totalCommissions.toLocaleString()}
            </p>
          </div>
          <div style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Payroll Due</span>
            <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
              {currencyObj.symbol}{totalPayroll.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {payoutSuccess && (
        <div style={{
          padding: '14px 18px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'rgba(var(--color-success-rgb), 0.15)',
          border: '1.5px solid var(--color-success)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          animation: 'float 0.3s ease-out',
        }}>
          <CheckCircle2 size={20} color="var(--color-success)" />
          <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
            Commission payout settled successfully for {payoutSuccess}!
          </span>
        </div>
      )}

      {/* Staff Commission Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        {staff.map(st => {
          const isSalon = st.role.toLowerCase().includes('salon') || st.role.toLowerCase().includes('aesthetician') || st.role.toLowerCase().includes('masseur');
          const totalEarned = st.baseSalary + st.commissionEarned;

          return (
            <div
              key={st.id}
              className="card"
              style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: isSalon ? 'rgba(255, 42, 133, 0.15)' : 'var(--color-primary-light)',
                    color: isSalon ? '#ff2a85' : 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {isSalon ? <Scissors size={20} /> : <Dumbbell size={20} />}
                  </div>
                  <span className="badge badge-primary">
                    ★ {st.rating}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '2px' }}>
                  {st.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  {st.role}
                </p>

                {/* Earnings breakdown */}
                <div style={{
                  backgroundColor: 'var(--color-surface-raised)',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  marginBottom: '16px',
                  fontSize: '0.8125rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--color-text-faint)' }}>Base Retainer:</span>
                    <span style={{ fontWeight: 600 }}>{currencyObj.symbol}{st.baseSalary}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--color-text-faint)' }}>Rate:</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{st.commissionRate}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--color-text-faint)' }}>Sessions Done:</span>
                    <span style={{ fontWeight: 700 }}>{st.servicesCompletedThisMonth}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '6px', marginTop: '6px' }}>
                    <span style={{ fontWeight: 700 }}>Commission:</span>
                    <span style={{ fontWeight: 800, color: 'var(--color-success)' }}>+{currencyObj.symbol}{st.commissionEarned}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Total Take-Home:</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
                    {currencyObj.symbol}{totalEarned}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleSettlePayout(st)}
                className="btn-primary"
                style={{ width: '100%', fontSize: '0.8125rem', padding: '9px' }}
              >
                Settle Monthly Payout
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
