import React, { useState } from 'react';
import { useGymData } from '../context/GymDataContext';
import { 
  ShoppingCart, Package, Plus, Minus, Trash2, 
  CreditCard, DollarSign, CheckCircle2, Search, Tag, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RetailPosView() {
  const { retailProducts, processRetailSale, currencyObj } = useGymData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [cart, setCart] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash at Counter');
  const [checkoutSuccess, setCheckoutSuccess] = useState(null);

  const categories = ['All', 'Fitness Nutrition', 'Salon Haircare', 'Skincare', 'Accessories'];

  const filteredProducts = retailProducts.filter(p => {
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = subtotal - discountAmount;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    processRetailSale(cart, paymentMethod);
    setCheckoutSuccess({
      itemsCount: cart.length,
      total: grandTotal,
      method: paymentMethod,
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) { }

    setCart([]);

    setTimeout(() => {
      setCheckoutSuccess(null);
    }, 4000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-primary">
              High-Margin Retail POS
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Retail Store & Inventory POS
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Sell gym supplements, whey protein, and salon luxury hair & skincare serums in one tap.
          </p>
        </div>
      </div>

      {checkoutSuccess && (
        <div style={{
          padding: '16px 20px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'rgba(var(--color-success-rgb), 0.15)',
          border: '1.5px solid var(--color-success)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
          animation: 'float 0.3s ease-out',
        }}>
          <CheckCircle2 size={24} color="var(--color-success)" />
          <div>
            <p style={{ fontWeight: 800 }}>Sale Recorded Successfully!</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Collected {currencyObj.symbol}{checkoutSuccess.total} via {checkoutSuccess.method}. Inventory stock deducted.
            </p>
          </div>
        </div>
      )}

      {/* Main Layout: Left Products Catalogue, Right Touch Cart POS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        alignItems: 'start',
      }}>
        {/* Left: Products Catalogue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Search & Categories */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search product or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '38px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: `1px solid ${categoryFilter === cat ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: categoryFilter === cat ? 'var(--color-primary-light)' : 'var(--color-surface)',
                    color: categoryFilter === cat ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '14px',
          }}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="card card-interactive"
                onClick={() => addToCart(product)}
                style={{
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ height: '110px', borderRadius: 'var(--radius-xs)', overflow: 'hidden', marginBottom: '10px', backgroundColor: 'var(--color-surface-raised)' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-faint)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {product.category}
                  </span>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, margin: '2px 0 6px 0', lineHeight: 1.3 }}>
                    {product.name}
                  </h4>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid var(--color-border)', paddingTop: '8px' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                    {currencyObj.symbol}{product.price}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: product.stock < 20 ? 'var(--color-warning)' : 'var(--color-text-muted)' }}>
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Touch POS Cart */}
        <div 
          className="card"
          style={{
            padding: '24px',
            backgroundColor: 'var(--color-surface)',
            border: '1.5px solid var(--color-border-strong)',
            position: 'sticky',
            top: '90px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingCart size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Active Sale Cart</h3>
            </div>
            {cart.length > 0 && (
              <button onClick={clearCart} className="btn-ghost" style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}>
                Clear
              </button>
            )}
          </div>

          {/* Cart Item List */}
          {cart.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-text-faint)' }}>
              <Package size={36} style={{ margin: '0 auto 10px auto', opacity: 0.5 }} />
              <p style={{ fontSize: '0.875rem' }}>No products in cart</p>
              <p style={{ fontSize: '0.75rem' }}>Click products on the left to add</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto', marginBottom: '18px' }}>
              {cart.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1, marginRight: '10px' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {currencyObj.symbol}{item.price} each
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)', cursor: 'pointer' }}
                    >
                      +
                    </button>
                    <span style={{ fontSize: '0.875rem', fontWeight: 800, marginLeft: '6px' }}>
                      {currencyObj.symbol}{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pricing Calculation */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Subtotal:</span>
              <span>{currencyObj.symbol}{subtotal.toFixed(2)}</span>
            </div>

            {/* Member Discount Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '8px 0' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>VIP Discount:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[0, 5, 10].map(pct => (
                  <button
                    key={pct}
                    onClick={() => setDiscountPercent(pct)}
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: `1px solid ${discountPercent === pct ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      backgroundColor: discountPercent === pct ? 'var(--color-primary-light)' : 'transparent',
                      color: discountPercent === pct ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-text)', marginTop: '10px' }}>
              <span>Total Due:</span>
              <span style={{ color: 'var(--color-primary)' }}>{currencyObj.symbol}{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Payment Channel
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="input-field"
              style={{ fontSize: '0.8125rem' }}
            >
              <option value="Cash at Counter">Cash at Counter</option>
              <option value="Credit / Debit Card">Credit / Debit Card</option>
              <option value="EasyPaisa / JazzCash">EasyPaisa / JazzCash</option>
              <option value="Member Account Charge">Charge to Member Plan</option>
            </select>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '0.9375rem',
              opacity: cart.length === 0 ? 0.4 : 1,
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Complete POS Checkout ({currencyObj.symbol}{grandTotal.toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
}
