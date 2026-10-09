import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  Download, FileSpreadsheet, FileText, CheckCircle2, 
  ShieldCheck, Database, HardDriveDownload 
} from 'lucide-react';

export default function ExportCenterView() {
  const { members, invoices, checkins, gymProfile } = useGymData();
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const downloadCSV = (filename, csvContent) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportMembersCSV = () => {
    let csv = 'ID,Name,Phone,Email,Plan,Price,Status,JoinDate,ExpiryDate,StreakDays,TotalVisits\n';
    members.forEach(m => {
      csv += `"${m.id}","${m.name}","${m.phone}","${m.email}","${m.planName}",${m.price},"${m.status}","${m.joinDate}","${m.expiryDate}",${m.streakDays},${m.totalVisits}\n`;
    });
    downloadCSV(`${gymProfile.slug}_members_export.csv`, csv);
    setDownloadSuccess('Members Roster (CSV)');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const exportInvoicesCSV = () => {
    let csv = 'InvoiceNo,Member,Phone,Plan,Amount,Status,IssueDate,DueDate,PaidDate,PaymentMethod\n';
    invoices.forEach(inv => {
      csv += `"${inv.invoiceNo}","${inv.memberName}","${inv.memberPhone}","${inv.planName}",${inv.amount},"${inv.status}","${inv.issueDate}","${inv.dueDate}","${inv.paidDate || 'N/A'}","${inv.paymentMethod}"\n`;
    });
    downloadCSV(`${gymProfile.slug}_invoices_ledger.csv`, csv);
    setDownloadSuccess('Invoices Ledger (CSV)');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const exportAttendanceCSV = () => {
    let csv = 'ID,MemberName,Plan,Time,Method,SessionDuration\n';
    checkins.forEach(c => {
      csv += `"${c.id}","${c.memberName}","${c.plan}","${c.time}","${c.method}","${c.duration}"\n`;
    });
    downloadCSV(`${gymProfile.slug}_attendance_history.csv`, csv);
    setDownloadSuccess('Attendance History (CSV)');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
          Data Export & Backup Center
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          You own 100% of your gym data. Download Excel or CSV spreadsheets at any time with zero vendor lock-in.
        </p>
      </div>

      {downloadSuccess && (
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
            Successfully downloaded {downloadSuccess}!
          </span>
        </div>
      )}

      {/* 3 Export Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        {/* Members Roster */}
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
            }}>
              <FileSpreadsheet size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
              Members Roster (CSV)
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Full athlete records, phone numbers, active plans, expiration dates, and personal streak statistics.
            </p>
          </div>
          <button onClick={exportMembersCSV} className="btn-primary" style={{ width: '100%' }}>
            <Download size={15} /> Export {members.length} Members
          </button>
        </div>

        {/* Invoices & Revenue Ledger */}
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(var(--color-success-rgb), 0.12)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
            }}>
              <Database size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
              Invoices & Billing Ledger
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Complete itemized billing ledger with Paid/Unpaid status, payment channels, and audit numbers.
            </p>
          </div>
          <button onClick={exportInvoicesCSV} className="btn-primary" style={{ width: '100%' }}>
            <Download size={15} /> Export {invoices.length} Invoices
          </button>
        </div>

        {/* Attendance Logs */}
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(var(--color-tech-rgb), 0.12)',
              color: 'var(--color-tech)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
            }}>
              <HardDriveDownload size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
              Attendance & Check-Ins
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Daily terminal tap logs, member timestamp arrival records, and workout duration data.
            </p>
          </div>
          <button onClick={exportAttendanceCSV} className="btn-primary" style={{ width: '100%' }}>
            <Download size={15} /> Export Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
