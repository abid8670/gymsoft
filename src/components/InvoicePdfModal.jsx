import React from 'react';
import { useGymData } from '../context/GymDataContext';
import { Printer, Download, X, CheckCircle, ShieldCheck } from 'lucide-react';

export default function InvoicePdfModal({ invoice, isOpen, onClose }) {
  const { gymProfile, currencyObj } = useGymData();

  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 110,
      backgroundColor: 'rgba(0, 0, 0, 0.82)',
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
          maxWidth: '640px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
          position: 'relative',
        }}
      >
        {/* Top Control Bar (Non-printable) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155' }}>
              Tax Invoice · {invoice.invoiceNo}
            </span>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: invoice.status === 'Paid' ? '#dcfce7' : '#fef3c7',
              color: invoice.status === 'Paid' ? '#166534' : '#92400e',
            }}>
              {invoice.status}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              <Printer size={15} /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                padding: '6px',
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div id="printable-invoice" style={{ padding: '36px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0f172a', paddingBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#0f172a',
                  color: '#c6f432',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                }}>
                  ⚡
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                  {gymProfile.name}
                </h2>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', maxWidth: '300px' }}>
                {gymProfile.address}
              </p>
              <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                Phone: {gymProfile.phone} · Web: {gymProfile.customDomain}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#0f172a' }}>
                INVOICE
              </h1>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155' }}>
                #{invoice.invoiceNo}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Date: {invoice.issueDate}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Due Date: {invoice.dueDate}
              </p>
            </div>
          </div>

          {/* Billed To & Status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '24px 0' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>
                Billed To
              </p>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                {invoice.memberName}
              </p>
              <p style={{ fontSize: '0.8125rem', color: '#475569' }}>
                {invoice.memberEmail}
              </p>
              <p style={{ fontSize: '0.8125rem', color: '#475569' }}>
                {invoice.memberPhone}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>
                Payment Method
              </p>
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>
                {invoice.paymentMethod || 'Cash / Mobile Transfer'}
              </p>
              {invoice.paidDate && (
                <p style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '2px' }}>
                  Paid on {invoice.paidDate}
                </p>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div style={{ margin: '24px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>Item & Description</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>Duration</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '14px', color: '#0f172a' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{invoice.planName}</p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Gym facility access, mobile app pass, locker & sauna</p>
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', color: '#475569', fontSize: '0.875rem' }}>
                    1 Month
                  </td>
                  <td style={{ padding: '14px', textAlign: 'right', fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a' }}>
                    {currencyObj.symbol}{invoice.amount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals Calculation */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <div style={{ width: '240px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.875rem', color: '#64748b' }}>
                <span>Subtotal:</span>
                <span>{currencyObj.symbol}{invoice.amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.875rem', color: '#64748b' }}>
                <span>Tax / VAT (0%):</span>
                <span>{currencyObj.symbol}0.00</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderTop: '2px solid #0f172a',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#0f172a',
                marginTop: '6px',
              }}>
                <span>Total Due:</span>
                <span>{currencyObj.symbol}{invoice.amount}</span>
              </div>
            </div>
          </div>

          {/* Footer & QR verification */}
          <div style={{
            marginTop: '36px',
            paddingTop: '20px',
            borderTop: '1px dashed #cbd5e1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="#16a34a" />
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Computer generated invoice verified by Gym Management Soft Autopilot.
              </p>
            </div>

            <div style={{
              width: '45px',
              height: '45px',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.625rem',
              fontWeight: 700,
              color: '#475569',
              textAlign: 'center',
            }}>
              QR PASS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
