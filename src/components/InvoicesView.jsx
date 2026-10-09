import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  Receipt, DollarSign, MessageSquare, Check, Eye, 
  Download, Printer, Filter, Search, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import InvoicePdfModal from './InvoicePdfModal';

export default function InvoicesView() {
  const { invoices, currencyObj, markInvoicePaid, sendWhatsAppReminder } = useGymData();
  const [filter, setFilter] = useState('all'); // 'all' | 'Unpaid' | 'Paid'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoiceForPdf, setSelectedInvoiceForPdf] = useState(null);

  const filteredInvoices = invoices.filter(inv => {
    const matchesFilter = filter === 'all' || inv.status === filter;
    const matchesSearch = 
      inv.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.memberPhone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const totalCollected = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const totalUnpaid = invoices
    .filter(i => i.status === 'Unpaid')
    .reduce((sum, i) => sum + Number(i.amount), 0);

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Invoices & Automated Billing
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Every invoice is created and renewed automatically. PDF receipts and WhatsApp reminders.
          </p>
        </div>

        {/* Totals Summary */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Collected</span>
            <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-success)', fontFamily: 'var(--font-display)' }}>
              {currencyObj.symbol}{totalCollected.toLocaleString()}
            </p>
          </div>
          <div style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Unpaid</span>
            <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-warning)', fontFamily: 'var(--font-display)' }}>
              {currencyObj.symbol}{totalUnpaid.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search invoice #, member or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '38px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'all', label: `All (${invoices.length})` },
            { id: 'Unpaid', label: `Unpaid (${invoices.filter(i => i.status === 'Unpaid').length})` },
            { id: 'Paid', label: `Paid (${invoices.filter(i => i.status === 'Paid').length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${filter === tab.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: filter === tab.id ? 'var(--color-primary-light)' : 'var(--color-surface)',
                color: filter === tab.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Member</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((inv) => (
              <tr key={inv.id}>
                <td style={{ fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                  {inv.invoiceNo}
                </td>
                <td>
                  <div>
                    <p style={{ fontWeight: 700 }}>{inv.memberName}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)' }}>{inv.memberPhone}</p>
                  </div>
                </td>
                <td>{inv.planName}</td>
                <td style={{ fontWeight: 800, fontSize: '0.9375rem' }}>
                  {currencyObj.symbol}{inv.amount}
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem', color: inv.status === 'Unpaid' ? 'var(--color-warning)' : 'inherit' }}>
                    {inv.dueDate}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-${inv.status === 'Paid' ? 'success' : 'warning'}`}>
                    {inv.status}
                  </span>
                </td>
                <td style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                  {inv.paymentMethod}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {/* View / Download PDF */}
                    <button
                      onClick={() => setSelectedInvoiceForPdf(inv)}
                      className="btn-secondary"
                      style={{ fontSize: '0.6875rem', padding: '4px 8px' }}
                      title="View Official Branded PDF"
                    >
                      <Eye size={12} /> PDF
                    </button>

                    {/* Send WhatsApp Reminder */}
                    {inv.status === 'Unpaid' && (
                      <button
                        onClick={() => sendWhatsAppReminder(inv.id)}
                        className="btn-secondary"
                        style={{ fontSize: '0.6875rem', padding: '4px 8px', color: 'var(--color-success)' }}
                        title="Send WhatsApp reminder from gym number"
                      >
                        <MessageSquare size={12} /> {inv.reminderSent ? 'Reminded' : 'WhatsApp'}
                      </button>
                    )}

                    {/* Mark Paid */}
                    {inv.status === 'Unpaid' && (
                      <button
                        onClick={() => markInvoicePaid(inv.id, 'Cash at Counter')}
                        className="btn-primary"
                        style={{ fontSize: '0.6875rem', padding: '4px 8px' }}
                      >
                        Mark Paid
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PDF Modal */}
      <InvoicePdfModal
        invoice={selectedInvoiceForPdf}
        isOpen={Boolean(selectedInvoiceForPdf)}
        onClose={() => setSelectedInvoiceForPdf(null)}
      />
    </div>
  );
}
