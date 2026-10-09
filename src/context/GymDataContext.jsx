import React, { createContext, useContext, useState, useEffect } from 'react';

const GymDataContext = createContext();

export const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', name: 'US Dollar' },
  PKR: { symbol: 'Rs ', code: 'PKR', name: 'Pakistani Rupee' },
  INR: { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  EUR: { symbol: '€', code: 'EUR', name: 'Euro' },
  GBP: { symbol: '£', code: 'GBP', name: 'British Pound' },
};

export const INITIAL_MEMBERS = [
  {
    id: 'm1',
    name: 'Ayesha Malik',
    email: 'ayesha.m@gmail.com',
    phone: '+92 321 8847120',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    planId: 'p2',
    planName: 'Gold VIP Plan',
    price: 65,
    status: 'active',
    joinDate: '2026-01-15',
    expiryDate: '2026-11-01',
    streakDays: 14,
    totalVisits: 142,
    avgVisitMinutes: 72,
    trainerName: 'Farhan Ali (Pro PT)',
    lastCheckIn: 'Today, 08:30 AM',
    notes: 'Pre-wedding transformation. Focus on HIIT & glutes.',
  },
  {
    id: 'm2',
    name: 'Bilal Ahmed',
    email: 'bilal.ahmed99@outlook.com',
    phone: '+92 300 4567891',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    planId: 'p1',
    planName: 'Standard Fitness',
    price: 40,
    status: 'active',
    joinDate: '2026-03-10',
    expiryDate: '2026-10-28',
    streakDays: 8,
    totalVisits: 98,
    avgVisitMinutes: 65,
    trainerName: 'Self-guided',
    lastCheckIn: 'Today, 07:15 AM',
    notes: 'Powerlifting bench focus. Always arrives early.',
  },
  {
    id: 'm3',
    name: 'Sara Khan',
    email: 'sara.k.design@gmail.com',
    phone: '+92 333 9123456',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    planId: 'p3',
    planName: 'Cardio & Crossfit',
    price: 50,
    status: 'expiring',
    joinDate: '2026-02-01',
    expiryDate: '2026-10-12',
    streakDays: 4,
    totalVisits: 64,
    avgVisitMinutes: 55,
    trainerName: 'Zainab Noor',
    lastCheckIn: 'Yesterday, 06:40 PM',
    notes: 'Membership expires in 3 days. WhatsApp reminder sent.',
  },
  {
    id: 'm4',
    name: 'Usman Tariq',
    email: 'usman.tariq@yahoo.com',
    phone: '+92 312 7789012',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    planId: 'p4',
    planName: 'Personal Training 1-on-1',
    price: 120,
    status: 'active',
    joinDate: '2026-05-20',
    expiryDate: '2026-11-20',
    streakDays: 22,
    totalVisits: 110,
    avgVisitMinutes: 85,
    trainerName: 'Farhan Ali (Pro PT)',
    lastCheckIn: 'Today, 09:10 AM',
    notes: 'Post-ACL recovery protocol. Careful on leg extensions.',
  },
  {
    id: 'm5',
    name: 'Zainab Noor',
    email: 'zainab.noor@gmail.com',
    phone: '+92 345 6123987',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    planId: 'p2',
    planName: 'Gold VIP Plan',
    price: 65,
    status: 'expired',
    joinDate: '2025-11-10',
    expiryDate: '2026-10-01',
    streakDays: 0,
    totalVisits: 88,
    avgVisitMinutes: 60,
    trainerName: 'Zainab Noor',
    lastCheckIn: '7 days ago',
    notes: 'Travelled abroad. Said will renew once back.',
  },
  {
    id: 'm6',
    name: 'Hamza Sheikh',
    email: 'hamza.sheikh@hotmail.com',
    phone: '+92 301 2345678',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    planId: 'p1',
    planName: 'Standard Fitness',
    price: 40,
    status: 'active',
    joinDate: '2026-06-01',
    expiryDate: '2026-11-01',
    streakDays: 11,
    totalVisits: 52,
    avgVisitMinutes: 70,
    trainerName: 'Self-guided',
    lastCheckIn: 'Today, 10:00 AM',
    notes: 'Regular morning athlete.',
  },
];

export const INITIAL_PLANS = [
  {
    id: 'p1',
    name: 'Standard Fitness',
    price: 40,
    billingCycle: 'Monthly',
    durationMonths: 1,
    description: 'Full gym floor access, cardio zone, lockers & shower facilities.',
    features: ['All Weights & Machines', 'Cardio Floor', 'Locker Room & Showers', 'Member Mobile App', '1-Tap Check-In'],
    activeMembers: 114,
    badge: 'Popular',
  },
  {
    id: 'p2',
    name: 'Gold VIP Plan',
    price: 65,
    billingCycle: 'Monthly',
    durationMonths: 1,
    description: 'Premium access with sauna, group classes and nutrition guidance.',
    features: ['All Standard Features', 'Sauna & Steam Bath', 'Unlimited Group Classes', 'Nutrition Consultation', 'Priority Locker'],
    activeMembers: 86,
    badge: 'Best Value',
  },
  {
    id: 'p3',
    name: 'Cardio & Crossfit',
    price: 50,
    billingCycle: 'Monthly',
    durationMonths: 1,
    description: 'High-intensity functional training area and cardio stadium.',
    features: ['Functional Rig & Kettlebells', 'Rowers & Ski-Ergs', 'Daily WOD Access', 'Recovery Zone', 'Member App Heatmap'],
    activeMembers: 32,
    badge: null,
  },
  {
    id: 'p4',
    name: 'Personal Training 1-on-1',
    price: 120,
    billingCycle: 'Monthly',
    durationMonths: 1,
    description: 'Dedicated certified trainer, bespoke routine, and weekly body composition scans.',
    features: ['Dedicated Elite Coach', 'Custom Diet & Workout Blueprint', 'InBody 570 Scans Bi-weekly', 'VIP Locker & Towel Service', 'Direct Trainer WhatsApp Chat'],
    activeMembers: 16,
    badge: 'Elite',
  },
];

export const INITIAL_INVOICES = [
  {
    id: 'inv-1048',
    invoiceNo: 'INV-1048',
    memberId: 'm1',
    memberName: 'Ayesha Malik',
    memberEmail: 'ayesha.m@gmail.com',
    memberPhone: '+92 321 8847120',
    planName: 'Gold VIP Plan',
    amount: 65,
    status: 'Paid',
    issueDate: '2026-10-01',
    dueDate: '2026-10-05',
    paidDate: '2026-10-02',
    paymentMethod: 'Bank Transfer (Meezan)',
    reminderSent: true,
  },
  {
    id: 'inv-1047',
    invoiceNo: 'INV-1047',
    memberId: 'm2',
    memberName: 'Bilal Ahmed',
    memberEmail: 'bilal.ahmed99@outlook.com',
    memberPhone: '+92 300 4567891',
    planName: 'Standard Fitness',
    amount: 40,
    status: 'Paid',
    issueDate: '2026-09-28',
    dueDate: '2026-10-03',
    paidDate: '2026-09-29',
    paymentMethod: 'Cash at Counter',
    reminderSent: true,
  },
  {
    id: 'inv-1046',
    invoiceNo: 'INV-1046',
    memberId: 'm3',
    memberName: 'Sara Khan',
    memberEmail: 'sara.k.design@gmail.com',
    memberPhone: '+92 333 9123456',
    planName: 'Cardio & Crossfit',
    amount: 50,
    status: 'Unpaid',
    issueDate: '2026-10-05',
    dueDate: '2026-10-12',
    paidDate: null,
    paymentMethod: 'Pending (EasyPaisa)',
    reminderSent: true,
  },
  {
    id: 'inv-1045',
    invoiceNo: 'INV-1045',
    memberId: 'm4',
    memberName: 'Usman Tariq',
    memberEmail: 'usman.tariq@yahoo.com',
    memberPhone: '+92 312 7789012',
    planName: 'Personal Training 1-on-1',
    amount: 120,
    status: 'Paid',
    issueDate: '2026-09-20',
    dueDate: '2026-09-25',
    paidDate: '2026-09-21',
    paymentMethod: 'Credit Card',
    reminderSent: true,
  },
  {
    id: 'inv-1044',
    invoiceNo: 'INV-1044',
    memberId: 'm5',
    memberName: 'Zainab Noor',
    memberEmail: 'zainab.noor@gmail.com',
    memberPhone: '+92 345 6123987',
    planName: 'Gold VIP Plan',
    amount: 65,
    status: 'Unpaid',
    issueDate: '2026-09-25',
    dueDate: '2026-10-01',
    paidDate: null,
    paymentMethod: 'Overdue',
    reminderSent: true,
  },
  {
    id: 'inv-1043',
    invoiceNo: 'INV-1043',
    memberId: 'm6',
    memberName: 'Hamza Sheikh',
    memberEmail: 'hamza.sheikh@hotmail.com',
    memberPhone: '+92 301 2345678',
    planName: 'Standard Fitness',
    amount: 40,
    status: 'Paid',
    issueDate: '2026-10-01',
    dueDate: '2026-10-06',
    paidDate: '2026-10-01',
    paymentMethod: 'JazzCash',
    reminderSent: false,
  },
];

export const INITIAL_CHECKINS = [
  { id: 'c1', memberName: 'Hamza Sheikh', time: '10:00 AM', plan: 'Standard Fitness', method: 'Terminal QR', duration: '54m' },
  { id: 'c2', memberName: 'Usman Tariq', time: '09:10 AM', plan: 'Personal Training 1-on-1', method: 'App 1-Tap', duration: '85m' },
  { id: 'c3', memberName: 'Ayesha Malik', time: '08:30 AM', plan: 'Gold VIP Plan', method: 'App 1-Tap', duration: '72m' },
  { id: 'c4', memberName: 'Bilal Ahmed', time: '07:15 AM', plan: 'Standard Fitness', method: 'Manual Counter', duration: '65m' },
  { id: 'c5', memberName: 'Omer Farooq', time: '06:45 AM', plan: 'Standard Fitness', method: 'Terminal QR', duration: '60m' },
];

export const INITIAL_EXPENSES = [
  { id: 'e1', title: 'Facility Rent (Gulberg III)', category: 'Rent', amount: 2800, date: '2026-10-01', status: 'Paid' },
  { id: 'e2', title: 'Commercial Electricity & ACs (LESCO)', category: 'Utilities', amount: 1150, date: '2026-10-04', status: 'Paid' },
  { id: 'e3', title: 'Trainer Commissions & Retainers', category: 'Salaries', amount: 1900, date: '2026-10-05', status: 'Paid' },
  { id: 'e4', title: 'Dumbbells & Cable Machine Maintenance', category: 'Maintenance', amount: 320, date: '2026-10-06', status: 'Paid' },
  { id: 'e5', title: 'Bottled Water & Towel Laundromat', category: 'Operations', amount: 180, date: '2026-10-08', status: 'Paid' },
];

export const INITIAL_LOGS = [
  { id: 'l1', type: 'checkin', title: 'Member Checked In', detail: 'Hamza Sheikh tapped check-in at Reception Terminal', time: '10:00 AM Today', actor: 'Hamza Sheikh' },
  { id: 'l2', type: 'payment', title: 'Invoice #INV-1048 Paid', detail: 'Received $65 from Ayesha Malik via Bank Transfer', time: '09:30 AM Today', actor: 'Front Desk' },
  { id: 'l3', type: 'reminder', title: 'WhatsApp Reminder Dispatched', detail: 'Sent 3-day renewal notice to Sara Khan (+92 333 9123456)', time: '08:00 AM Today', actor: 'System Autopilot' },
  { id: 'l4', type: 'checkin', title: 'Member Checked In', detail: 'Usman Tariq checked in via Member App', time: '09:10 AM Today', actor: 'Usman Tariq' },
  { id: 'l5', type: 'member_new', title: 'New Member Registered', detail: 'Hamza Sheikh enrolled into Standard Fitness', time: 'Yesterday', actor: 'Front Desk' },
  { id: 'l6', type: 'domain_linked', title: 'Domain Verification Verified', detail: 'ironparadise.fit SSL certificate installed and active', time: '2 days ago', actor: 'System' },
];

export const PUBLIC_GYMS = [
  {
    id: 'g1',
    name: 'Iron Paradise Fitness & SPA',
    city: 'Lahore',
    location: 'Gulberg III, Main Boulevard',
    rating: 4.9,
    reviews: 184,
    monthlyStarting: 40,
    tags: ['CrossFit', 'Sauna', 'Personal Training', 'Ladies Hours'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80',
    verified: true,
    website: 'https://ironparadise.fit',
  },
  {
    id: 'g2',
    name: 'Alpha Athletic Club',
    city: 'Karachi',
    location: 'Clifton Block 4',
    rating: 4.8,
    reviews: 215,
    monthlyStarting: 50,
    tags: ['Olympic Lifting', 'MMA Cage', 'Steam Room'],
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&auto=format&fit=crop&q=80',
    verified: true,
    website: 'https://alpha-karachi.gymmanagementsoft.com',
  },
  {
    id: 'g3',
    name: 'Summit Performance Center',
    city: 'Islamabad',
    location: 'F-7/2, Markaz',
    rating: 4.9,
    reviews: 142,
    monthlyStarting: 55,
    tags: ['HIIT', 'Physiotherapy', 'Smoothie Bar'],
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop&q=80',
    verified: true,
    website: 'https://summitfitness.isb',
  },
  {
    id: 'g4',
    name: 'Volt Marina Gym & Wellness',
    city: 'Dubai',
    location: 'Dubai Marina Walk',
    rating: 5.0,
    reviews: 430,
    monthlyStarting: 85,
    tags: ['24/7 Access', 'Rooftop Pool', 'Cryotherapy'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
    verified: true,
    website: 'https://voltgym.ae',
  },
  {
    id: 'g5',
    name: 'Brooklyn Barbell Co.',
    city: 'New York',
    location: 'Williamsburg, Brooklyn',
    rating: 4.9,
    reviews: 310,
    monthlyStarting: 70,
    tags: ['Old School Iron', 'Deadlift Platforms', 'Chalk Allowed'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=80',
    verified: true,
    website: 'https://brooklynbarbell.nyc',
  },
  {
    id: 'g6',
    name: 'Mayfair Athletic Club',
    city: 'London',
    location: 'Mayfair, Central London',
    rating: 4.9,
    reviews: 198,
    monthlyStarting: 90,
    tags: ['Luxury Spa', 'Reformer Pilates', 'Executive Lockers'],
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&auto=format&fit=crop&q=80',
    verified: true,
    website: 'https://mayfairathletic.co.uk',
  },
];

export function GymDataProvider({ children }) {
  const [gymProfile, setGymProfile] = useState(() => {
    const saved = localStorage.getItem('gymsoft_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      name: 'Iron Paradise Fitness',
      tagline: 'Premium Strength & Functional Training Facility',
      slug: 'ironparadise',
      customDomain: 'ironparadise.fit',
      address: '14-C Main Boulevard, Gulberg III, Lahore, Pakistan',
      phone: '+92 300 8472910',
      whatsapp: '+923008472910',
      email: 'owner@ironparadise.fit',
      currency: 'USD',
      openingHours: 'Mon - Sat: 06:00 AM - 11:00 PM | Sun: 09:00 AM - 08:00 PM',
      city: 'Lahore',
    };
  });

  const [activeRole, setActiveRole] = useState('owner'); // 'owner' | 'counter' | 'trainer' | 'member'
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [plans, setPlans] = useState(INITIAL_PLANS);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [checkins, setCheckins] = useState(INITIAL_CHECKINS);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [logs, setLogs] = useState(INITIAL_LOGS);

  // WhatsApp Automation state
  const [whatsAppConfig, setWhatsAppConfig] = useState({
    isConnected: true,
    linkedNumber: '+92 300 8472910',
    botName: 'Iron Paradise Bot',
    daysBeforeExpiry: 3,
    sendOnInvoiceGenerated: true,
    sendOnPaymentReceived: true,
    reminderTemplate: 'Hi {name}! 👋 Your {plan} membership at {gym} expires on {expiry}. Please renew to keep your workout streak alive! Invoice #{invoice} amount is {amount}.',
  });

  // Current view in the SaaS platform
  // 'landing' | 'deck' | 'dashboard' | 'members' | 'checkin' | 'invoices' | 'whatsapp' | 'website' | 'directory' | 'expenses' | 'logs'
  const [currentView, setCurrentView] = useState('landing');

  // Selected member for member portal preview / edit
  const [currentMemberId, setCurrentMemberId] = useState('m1');

  // Save profile
  useEffect(() => {
    localStorage.setItem('gymsoft_profile', JSON.stringify(gymProfile));
  }, [gymProfile]);

  const currencyObj = CURRENCIES[gymProfile.currency] || CURRENCIES.USD;

  // Actions
  const addMember = (memberData) => {
    const newId = `m${Date.now()}`;
    const newMember = {
      id: newId,
      streakDays: 0,
      totalVisits: 0,
      avgVisitMinutes: 60,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      ...memberData,
    };
    setMembers([newMember, ...members]);

    // Create initial invoice
    const newInvId = `inv-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInvoice = {
      id: newInvId,
      invoiceNo: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      memberId: newId,
      memberName: newMember.name,
      memberEmail: newMember.email,
      memberPhone: newMember.phone,
      planName: newMember.planName,
      amount: newMember.price,
      status: 'Paid',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: newMember.expiryDate,
      paidDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'Cash at Counter',
      reminderSent: false,
    };
    setInvoices([newInvoice, ...invoices]);

    // Add log
    addLog('member_new', 'New Member Joined', `${newMember.name} joined with plan ${newMember.planName}`, 'Front Desk');
  };

  const recordCheckIn = (memberId, method = 'Terminal QR') => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newCheckIn = {
      id: `c-${Date.now()}`,
      memberName: member.name,
      time: `${timeStr} Today`,
      plan: member.planName,
      method: method,
      duration: '60m',
    };
    setCheckins([newCheckIn, ...checkins]);

    // Update member streak and visits
    setMembers(members.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          streakDays: (m.streakDays || 0) + 1,
          totalVisits: (m.totalVisits || 0) + 1,
          lastCheckIn: `Today, ${timeStr}`,
        };
      }
      return m;
    }));

    addLog('checkin', 'Member Check-In', `${member.name} checked in via ${method}`, member.name);
  };

  const markInvoicePaid = (invoiceId, paymentMethod = 'Cash') => {
    setInvoices(invoices.map(inv => {
      if (inv.id === invoiceId) {
        return {
          ...inv,
          status: 'Paid',
          paidDate: new Date().toISOString().split('T')[0],
          paymentMethod,
        };
      }
      return inv;
    }));
    const inv = invoices.find(i => i.id === invoiceId);
    if (inv) {
      addLog('payment', `Invoice ${inv.invoiceNo} Paid`, `Received ${currencyObj.symbol}${inv.amount} via ${paymentMethod}`, 'Front Desk');
    }
  };

  const sendWhatsAppReminder = (invoiceId) => {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    setInvoices(invoices.map(i => i.id === invoiceId ? { ...i, reminderSent: true } : i));
    addLog('reminder', 'WhatsApp Reminder Sent', `Sent payment reminder for ${inv.invoiceNo} to ${inv.memberName} (${inv.memberPhone})`, 'Autopilot');
  };

  const addExpense = (expenseData) => {
    const newExpense = {
      id: `e-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      ...expenseData,
    };
    setExpenses([newExpense, ...expenses]);
    addLog('expense', 'Expense Recorded', `${expenseData.title} - ${currencyObj.symbol}${expenseData.amount}`, 'Owner');
  };

  const addLog = (type, title, detail, actor = 'System') => {
    const newLog = {
      id: `l-${Date.now()}`,
      type,
      title,
      detail,
      time: 'Just now',
      actor,
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Metrics
  const activeMembersCount = members.filter(m => m.status === 'active').length;
  const expiringMembersCount = members.filter(m => m.status === 'expiring').length;
  const expiredMembersCount = members.filter(m => m.status === 'expired').length;
  const totalRevenueMonth = invoices
    .filter(i => i.status === 'Paid')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpensesMonth = expenses
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const unpaidInvoicesCount = invoices.filter(i => i.status === 'Unpaid').length;
  const unpaidAmount = invoices
    .filter(i => i.status === 'Unpaid')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <GymDataContext.Provider
      value={{
        gymProfile,
        setGymProfile,
        currencyObj,
        activeRole,
        setActiveRole,
        members,
        setMembers,
        plans,
        setPlans,
        invoices,
        setInvoices,
        checkins,
        setCheckins,
        expenses,
        setExpenses,
        logs,
        setLogs,
        whatsAppConfig,
        setWhatsAppConfig,
        currentView,
        setCurrentView,
        currentMemberId,
        setCurrentMemberId,
        publicGyms: PUBLIC_GYMS,
        metrics: {
          activeMembersCount,
          expiringMembersCount,
          expiredMembersCount,
          totalRevenueMonth,
          totalExpensesMonth,
          netProfit: totalRevenueMonth - totalExpensesMonth,
          unpaidInvoicesCount,
          unpaidAmount,
          checkInsToday: checkins.length + 82, // realistic daily count
        },
        addMember,
        recordCheckIn,
        markInvoicePaid,
        sendWhatsAppReminder,
        addExpense,
        addLog,
      }}
    >
      {children}
    </GymDataContext.Provider>
  );
}

export function useGymData() {
  const context = useContext(GymDataContext);
  if (!context) {
    throw new Error('useGymData must be used within a GymDataProvider');
  }
  return context;
}
