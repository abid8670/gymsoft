import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  DollarSign, TrendingUp, TrendingDown, Plus, 
  PieChart, Calendar, FileText, CheckCircle2 
} from 'lucide-react';

export default function ExpensesView() {
  const { expenses, addExpense, currencyObj, metrics } = useGymData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Rent',
    amount: '',
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    addExpense({
      title: formData.title,
      category: formData.category,
      amount: Number(formData.amount),
    });

    setFormData({ title: '', category: 'Rent', amount: '' });
    setIsModalOpen(false);
  };

  const estimatedTotalRev = metrics.totalRevenueMonth + 9200;
  const estimatedExpenses = metrics.totalExpensesMonth;
  const estimatedNet = estimatedTotalRev - estimatedExpenses;
  const profitMargin = ((estimatedNet / (estimatedTotalRev || 1)) * 100).toFixed(1);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Expenses & Profit / Loss
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Track facility rent, utilities, trainer payroll and calculate real monthly net profit.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus size={16} /> Record Expense
        </button>
      </div>

      {/* P&L 3-Card Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '18px',
        marginBottom: '28px',
      }}>
        <div className="card" style={{ padding: '20px' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Revenue (October)</p>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-success)', fontFamily: 'var(--font-display)', marginTop: '4px' }}>
            {currencyObj.symbol}{estimatedTotalRev.toLocaleString()}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>From 248 active subscriptions</p>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Operating Expenses</p>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-danger)', fontFamily: 'var(--font-display)', marginTop: '4px' }}>
            {currencyObj.symbol}{estimatedExpenses.toLocaleString()}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: '4px' }}>Rent, utilities, staff salaries</p>
        </div>

        <div className="card" style={{ padding: '20px', border: '1.5px solid var(--color-primary)' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-primary)', fontWeight: 700 }}>Net Take-Home Profit</p>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'var(--font-display)', marginTop: '4px' }}>
            {currencyObj.symbol}{estimatedNet.toLocaleString()}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 700, marginTop: '4px' }}>
            {profitMargin}% Profit Margin
          </p>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px' }}>
          Recent Facility Expenses
        </h3>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Expense Item</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td style={{ fontWeight: 700 }}>{exp.title}</td>
                  <td>
                    <span className="badge badge-primary">
                      {exp.category}
                    </span>
                  </td>
                  <td>{exp.date}</td>
                  <td style={{ fontWeight: 800, color: 'var(--color-text)' }}>
                    {currencyObj.symbol}{exp.amount.toLocaleString()}
                  </td>
                  <td>
                    <span className="badge badge-success">
                      {exp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal to add expense */}
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
          <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '28px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px' }}>
              Record Facility Expense
            </h3>
            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                  Expense Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Commercial LESCO Bill"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  <option value="Rent">Rent</option>
                  <option value="Utilities">Utilities & AC</option>
                  <option value="Salaries">Staff / Trainer Salaries</option>
                  <option value="Maintenance">Equipment Repairs</option>
                  <option value="Operations">Operations & Laundry</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                  Amount ({currencyObj.code})
                </label>
                <input
                  type="number"
                  placeholder="e.g. 850"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
