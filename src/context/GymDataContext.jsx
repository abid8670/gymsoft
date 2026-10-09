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
    planName: 'Glow & Gains VIP (Hybrid)',
    price: 85,
    status: 'active',
    joinDate: '2026-01-15',
    expiryDate: '2026-11-01',
    streakDays: 14,
    totalVisits: 142,
    avgVisitMinutes: 72,
    trainerName: 'Farhan Ali (Pro PT)',
    favoriteStylist: 'Natasha (Master Stylist)',
    hairFormula: 'L\'Oréal Inoa 6.1 Ash Light Brown (No Ammonia)',
    skinType: 'Combination / Sensitive (Avoid Glycolic)',
    lastCheckIn: 'Today, 08:30 AM',
    notes: 'Bride-to-be workout + monthly HydraFacial & Hair Spa.',
  },
  {
    id: 'm2',
    name: 'Bilal Ahmed',
    email: 'bilal.ahmed99@outlook.com',
    phone: '+92 300 4567891',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    planId: 'p1',
    planName: 'Standard Fitness Pass',
    price: 40,
    status: 'active',
    joinDate: '2026-03-10',
    expiryDate: '2026-10-28',
    streakDays: 8,
    totalVisits: 98,
    avgVisitMinutes: 65,
    trainerName: 'Self-guided',
    favoriteStylist: 'Kashif (Beard & Fade)',
    hairFormula: 'Natural fade, charcoal detox scalp scrub',
    skinType: 'Normal',
    lastCheckIn: 'Today, 07:15 AM',
    notes: 'Powerlifting bench focus. Regular weekend beard grooming.',
  },
  {
    id: 'm3',
    name: 'Sara Khan',
    email: 'sara.k.design@gmail.com',
    phone: '+92 333 9123456',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    planId: 'p3',
    planName: 'Luxury Spa & Pilates Club',
    price: 70,
    status: 'expiring',
    joinDate: '2026-02-01',
    expiryDate: '2026-10-12',
    streakDays: 4,
    totalVisits: 64,
    avgVisitMinutes: 55,
    trainerName: 'Zainab Noor',
    favoriteStylist: 'Natasha (Master Stylist)',
    hairFormula: 'Balayage Blonde toner 9.21 + Olaplex No. 2',
    skinType: 'Dry / Dehydrated (HydraFacial monthly)',
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
    planName: 'Executive PT & Recovery Spa',
    price: 150,
    status: 'active',
    joinDate: '2026-05-20',
    expiryDate: '2026-11-20',
    streakDays: 22,
    totalVisits: 110,
    avgVisitMinutes: 85,
    trainerName: 'Farhan Ali (Pro PT)',
    favoriteStylist: 'David (Sports Masseuse)',
    hairFormula: 'Short taper fade',
    skinType: 'Normal',
    lastCheckIn: 'Today, 09:10 AM',
    notes: 'Post-ACL recovery + bi-weekly deep tissue sports massage.',
  },
  {
    id: 'm5',
    name: 'Zainab Noor',
    email: 'zainab.noor@gmail.com',
    phone: '+92 345 6123987',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    planId: 'p2',
    planName: 'Glow & Gains VIP (Hybrid)',
    price: 85,
    status: 'expired',
    joinDate: '2025-11-10',
    expiryDate: '2026-10-01',
    streakDays: 0,
    totalVisits: 88,
    avgVisitMinutes: 60,
    trainerName: 'Zainab Noor',
    favoriteStylist: 'Natasha (Master Stylist)',
    hairFormula: 'Keratin protein treatment',
    skinType: 'Sensitive',
    lastCheckIn: '7 days ago',
    notes: 'Travelled abroad. Promised to renew once back.',
  },
  {
    id: 'm6',
    name: 'Hamza Sheikh',
    email: 'hamza.sheikh@hotmail.com',
    phone: '+92 301 2345678',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    planId: 'p1',
    planName: 'Standard Fitness Pass',
    price: 40,
    status: 'active',
    joinDate: '2026-06-01',
    expiryDate: '2026-11-01',
    streakDays: 11,
    totalVisits: 52,
    avgVisitMinutes: 70,
    trainerName: 'Self-guided',
    favoriteStylist: 'Kashif (Beard & Fade)',
    hairFormula: 'Classic pompadour cut',
    skinType: 'Oily',
    lastCheckIn: 'Today, 10:00 AM',
    notes: 'Regular morning athlete.',
  },
];

export const INITIAL_PLANS = [
  {
    id: 'p1',
    name: 'Standard Fitness Pass',
    price: 40,
    billingCycle: 'Monthly',
    category: 'Fitness',
    description: 'Full gym floor access, cardio zone, lockers & shower facilities.',
    features: ['All Weights & Cardio', 'Locker Room & Showers', 'Member App Heatmap', '1-Tap Check-In'],
    activeMembers: 114,
    badge: 'Popular',
  },
  {
    id: 'p2',
    name: 'Glow & Gains VIP (Hybrid)',
    price: 85,
    billingCycle: 'Monthly',
    category: 'Hybrid',
    description: 'The ultimate combo: Unlimited Gym + 2 Salon Blowdrys + 1 HydraFacial per month.',
    features: ['Unlimited Gym & Cardio Access', '2x Monthly Salon Blowdry / Styling', '1x HydraFacial Glow Session', 'Sauna, Steam & Towel Service', '10% Retail Product Discount'],
    activeMembers: 86,
    badge: 'Best Value',
  },
  {
    id: 'p3',
    name: 'Luxury Spa & Pilates Club',
    price: 70,
    billingCycle: 'Monthly',
    category: 'Beauty/Spa',
    description: 'Unlimited Pilates & Yoga classes + 2 Spa Massage sessions every month.',
    features: ['Unlimited Reformer Pilates & Yoga', '2x Deep Tissue / Swedish Massages', 'Steam & Moroccan Bath Pass', 'Detox Herbal Teas Lounge', 'VIP Changing Suites'],
    activeMembers: 32,
    badge: 'Wellness',
  },
  {
    id: 'p4',
    name: 'Executive PT & Recovery Spa',
    price: 150,
    billingCycle: 'Monthly',
    category: 'Hybrid',
    description: 'Dedicated certified personal coach + weekly recovery sports massages & grooming.',
    features: ['Dedicated Elite Coach (12 PT Sessions)', 'Weekly Sports Physiotherapy Massage', 'VIP Grooming / Beard / Hair Care', 'InBody 570 Scans Bi-weekly', 'Direct WhatsApp Concierge'],
    activeMembers: 16,
    badge: 'Elite Tier',
  },
];

export const SALON_SERVICES = [
  {
    id: 'srv-1',
    name: 'HydraFacial Deluxe Glow',
    category: 'Skin & Aesthetics',
    price: 60,
    durationMinutes: 50,
    stylist: 'Dr. Hina (Skin Specialist)',
    description: 'Deep cleansing, gentle chemical peel, painless blackhead extraction and intense hyaluronic acid hydration.',
    commissionRate: 0.25,
  },
  {
    id: 'srv-2',
    name: 'Signature Blowdry & Olaplex Spa',
    category: 'Hair Care & Styling',
    price: 35,
    durationMinutes: 45,
    stylist: 'Natasha (Master Stylist)',
    description: 'Bond-building Olaplex wash treatment followed by runway-grade voluminous blowdry styling.',
    commissionRate: 0.20,
  },
  {
    id: 'srv-3',
    name: 'Deep Tissue Sports Recovery Massage',
    category: 'Massage & Spa',
    price: 55,
    durationMinutes: 60,
    stylist: 'David (Therapist & Physio)',
    description: 'Relieves chronic muscle tightness, lactic acid accumulation, and accelerates post-workout recovery.',
    commissionRate: 0.30,
  },
  {
    id: 'srv-4',
    name: 'Executive Haircut & Beard Sculpting',
    category: 'Men\'s Grooming',
    price: 30,
    durationMinutes: 40,
    stylist: 'Kashif (Beard & Fade)',
    description: 'Precision scissor cut, hot towel steam shave, and charcoal face scrub.',
    commissionRate: 0.20,
  },
  {
    id: 'srv-5',
    name: 'Luxury Detox Gel Manicure & Pedicure',
    category: 'Nails & Hands',
    price: 45,
    durationMinutes: 60,
    stylist: 'Amina (Nail Artist)',
    description: 'Exfoliating Dead Sea salt scrub, cuticle therapy, paraffin wax dip and chip-resistant gel polish.',
    commissionRate: 0.25,
  },
  {
    id: 'srv-6',
    name: 'Moroccan Bath (Hammam Exfoliation)',
    category: 'Massage & Spa',
    price: 75,
    durationMinutes: 75,
    stylist: 'David (Therapist & Physio)',
    description: 'Traditional steam bath, black soap application, Kessa glove exfoliation and purifying rhassoul clay wrap.',
    commissionRate: 0.30,
  },
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-1',
    memberName: 'Ayesha Malik',
    memberPhone: '+92 321 8847120',
    serviceId: 'srv-1',
    serviceName: 'HydraFacial Deluxe Glow',
    stylist: 'Dr. Hina (Skin Specialist)',
    date: 'Today',
    time: '03:00 PM',
    price: 60,
    status: 'Confirmed', // 'Confirmed' | 'In Chair' | 'Completed' | 'Cancelled'
    whatsappReminderSent: true,
  },
  {
    id: 'apt-2',
    memberName: 'Sara Khan',
    memberPhone: '+92 333 9123456',
    serviceId: 'srv-2',
    serviceName: 'Signature Blowdry & Olaplex Spa',
    stylist: 'Natasha (Master Stylist)',
    date: 'Today',
    time: '04:30 PM',
    price: 35,
    status: 'In Chair',
    whatsappReminderSent: true,
  },
  {
    id: 'apt-3',
    memberName: 'Usman Tariq',
    memberPhone: '+92 312 7789012',
    serviceId: 'srv-3',
    serviceName: 'Deep Tissue Sports Recovery Massage',
    stylist: 'David (Therapist & Physio)',
    date: 'Today',
    time: '06:00 PM',
    price: 55,
    status: 'Confirmed',
    whatsappReminderSent: true,
  },
  {
    id: 'apt-4',
    memberName: 'Bilal Ahmed',
    memberPhone: '+92 300 4567891',
    serviceId: 'srv-4',
    serviceName: 'Executive Haircut & Beard Sculpting',
    stylist: 'Kashif (Beard & Fade)',
    date: 'Tomorrow',
    time: '11:00 AM',
    price: 30,
    status: 'Confirmed',
    whatsappReminderSent: false,
  },
];

export const RETAIL_PRODUCTS = [
  {
    id: 'prd-1',
    name: '100% Pure Whey Isolate (2kg)',
    category: 'Fitness Nutrition',
    price: 65,
    cost: 42,
    stock: 24,
    sku: 'WHEY-ISO-2K',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'prd-2',
    name: 'Moroccan Argan Hair Elixir (100ml)',
    category: 'Salon Haircare',
    price: 32,
    cost: 16,
    stock: 38,
    sku: 'ARGAN-ELX-100',
    image: 'https://images.unsplash.com/photo-1608248597359-00994f31c260?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'prd-3',
    name: 'Pre-Workout Nitro Blast (30 Servings)',
    category: 'Fitness Nutrition',
    price: 45,
    cost: 26,
    stock: 19,
    sku: 'PRE-NITRO-30',
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'prd-4',
    name: 'Vitamin C + Hyaluronic Glow Serum (50ml)',
    category: 'Skincare',
    price: 38,
    cost: 18,
    stock: 42,
    sku: 'VITC-GLOW-50',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'prd-5',
    name: 'Keratin Deep Repair Hair Mask (250ml)',
    category: 'Salon Haircare',
    price: 28,
    cost: 12,
    stock: 31,
    sku: 'KER-MASK-250',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'prd-6',
    name: 'Heavy Duty Stainless Steel Gym Shaker',
    category: 'Accessories',
    price: 18,
    cost: 8,
    stock: 55,
    sku: 'SHAKER-STEEL',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200&auto=format&fit=crop&q=80',
  },
];

export const INITIAL_STAFF = [
  {
    id: 'st-1',
    name: 'Natasha (Master Stylist)',
    role: 'Salon Hairstylist',
    baseSalary: 600,
    commissionRate: '20% Services',
    servicesCompletedThisMonth: 42,
    commissionEarned: 294,
    rating: 4.9,
  },
  {
    id: 'st-2',
    name: 'Farhan Ali (Pro PT)',
    role: 'Head Fitness Coach',
    baseSalary: 750,
    commissionRate: '$25 / PT Session',
    servicesCompletedThisMonth: 34,
    commissionEarned: 850,
    rating: 4.9,
  },
  {
    id: 'st-3',
    name: 'Dr. Hina (Skin Specialist)',
    role: 'Aesthetician / HydraFacial',
    baseSalary: 650,
    commissionRate: '25% Services',
    servicesCompletedThisMonth: 38,
    commissionEarned: 570,
    rating: 5.0,
  },
  {
    id: 'st-4',
    name: 'David (Therapist & Physio)',
    role: 'Sports & Spa Masseur',
    baseSalary: 550,
    commissionRate: '30% Services',
    servicesCompletedThisMonth: 28,
    commissionEarned: 462,
    rating: 4.8,
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
    planName: 'Glow & Gains VIP (Hybrid)',
    amount: 85,
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
    planName: 'Standard Fitness Pass',
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
    planName: 'Luxury Spa & Pilates Club',
    amount: 70,
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
    planName: 'Executive PT & Recovery Spa',
    amount: 150,
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
    planName: 'Glow & Gains VIP (Hybrid)',
    amount: 85,
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
    planName: 'Standard Fitness Pass',
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
  { id: 'c1', memberName: 'Hamza Sheikh', time: '10:00 AM', plan: 'Fitness Floor', type: 'workout', method: 'Terminal QR', duration: '54m' },
  { id: 'c2', memberName: 'Sara Khan', time: '09:45 AM', plan: 'Signature Blowdry & Olaplex', type: 'salon', method: 'Salon Chair 2', duration: '45m' },
  { id: 'c3', memberName: 'Usman Tariq', time: '09:10 AM', plan: 'Executive PT & Recovery Spa', type: 'hybrid', method: 'App 1-Tap', duration: '85m' },
  { id: 'c4', memberName: 'Ayesha Malik', time: '08:30 AM', plan: 'Glow & Gains VIP', type: 'hybrid', method: 'App 1-Tap', duration: '72m' },
  { id: 'c5', memberName: 'Bilal Ahmed', time: '07:15 AM', plan: 'Standard Fitness Pass', type: 'workout', method: 'Manual Counter', duration: '65m' },
];

export const INITIAL_EXPENSES = [
  { id: 'e1', title: 'Main Facility & Salon Floor Rent', category: 'Rent', amount: 2800, date: '2026-10-01', status: 'Paid' },
  { id: 'e2', title: 'Commercial Electricity & ACs (LESCO)', category: 'Utilities', amount: 1150, date: '2026-10-04', status: 'Paid' },
  { id: 'e3', title: 'Trainer & Stylist Base Payroll + Commission', category: 'Salaries', amount: 2550, date: '2026-10-05', status: 'Paid' },
  { id: 'e4', title: 'Salon Hair Colors & HydraFacial Serums Restock', category: 'Inventory', amount: 540, date: '2026-10-06', status: 'Paid' },
  { id: 'e5', title: 'Laundry, Spa Towels & Essential Oils', category: 'Operations', amount: 210, date: '2026-10-08', status: 'Paid' },
];

export const INITIAL_LOGS = [
  { id: 'l1', type: 'checkin', title: 'Salon Service Started', detail: 'Sara Khan started Signature Blowdry with Natasha in Chair 2', time: '09:45 AM Today', actor: 'Salon Reception' },
  { id: 'l2', type: 'checkin', title: 'Gym Floor Check-In', detail: 'Hamza Sheikh tapped check-in at Reception Terminal', time: '10:00 AM Today', actor: 'Hamza Sheikh' },
  { id: 'l3', type: 'pos', title: 'Retail Product Sold', detail: 'Sold 1x Moroccan Argan Hair Elixir ($32) to Ayesha Malik', time: '09:15 AM Today', actor: 'Front Desk POS' },
  { id: 'l4', type: 'payment', title: 'Invoice #INV-1048 Paid', detail: 'Received $85 from Ayesha Malik for Glow & Gains VIP', time: '08:30 AM Today', actor: 'Front Desk' },
  { id: 'l5', type: 'reminder', title: 'WhatsApp Appointment Alert Dispatched', detail: 'Sent 2-hr booking reminder for HydraFacial to Ayesha Malik', time: '08:00 AM Today', actor: 'WhatsApp Autopilot' },
];

export const PUBLIC_GYMS = [
  {
    id: 'g1',
    name: 'Zenith Wellness, Salon & Athletic Club',
    city: 'Lahore',
    location: 'Gulberg III, Main Boulevard',
    rating: 4.9,
    reviews: 210,
    monthlyStarting: 40,
    tags: ['Hybrid Club', 'Hair Salon', 'CrossFit', 'HydraFacial', 'Sauna'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80',
    verified: true,
    website: 'https://zenithwellness.fit',
  },
  {
    id: 'g2',
    name: 'Luxe Beauty Lounge & Pilates Studio',
    city: 'Karachi',
    location: 'Clifton Block 4',
    rating: 4.9,
    reviews: 245,
    monthlyStarting: 55,
    tags: ['Reformer Pilates', 'Bridal Spa', 'Nail Bar', 'Moroccan Bath'],
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&auto=format&fit=crop&q=80',
    verified: true,
    website: 'https://luxebeautyclub.pk',
  },
  {
    id: 'g3',
    name: 'Summit Performance & Sports Recovery Spa',
    city: 'Islamabad',
    location: 'F-7/2, Markaz',
    rating: 4.8,
    reviews: 165,
    monthlyStarting: 50,
    tags: ['HIIT Gym', 'Sports Massage', 'Cryotherapy', 'Men Grooming'],
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop&q=80',
    verified: true,
    website: 'https://summitwellness.isb',
  },
  {
    id: 'g4',
    name: 'Volt Marina Luxury Gym & Spa',
    city: 'Dubai',
    location: 'Dubai Marina Walk',
    rating: 5.0,
    reviews: 430,
    monthlyStarting: 85,
    tags: ['24/7 Access', 'Beauty Salon', 'Cryo Chamber', 'Rooftop Pool'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
    verified: true,
    website: 'https://voltgym.ae',
  },
];

export function GymDataProvider({ children }) {
  // Business Mode: 'hybrid' | 'gym' | 'salon'
  const [businessMode, setBusinessMode] = useState(() => {
    return localStorage.getItem('gymsoft_business_mode') || 'hybrid';
  });

  const [gymProfile, setGymProfile] = useState(() => {
    const saved = localStorage.getItem('gymsoft_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      name: 'Zenith Glow & Fitness Club',
      tagline: 'Premier Hybrid Wellness: Fitness Training, Hair & Aesthetics Spa',
      slug: 'zenithwellness',
      customDomain: 'zenithwellness.fit',
      address: '14-C Main Boulevard, Gulberg III, Lahore, Pakistan',
      phone: '+92 300 8472910',
      whatsapp: '+923008472910',
      email: 'hello@zenithwellness.fit',
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

  // Hybrid Specific State
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [salonServices, setSalonServices] = useState(SALON_SERVICES);
  const [retailProducts, setRetailProducts] = useState(RETAIL_PRODUCTS);
  const [staff, setStaff] = useState(INITIAL_STAFF);

  // WhatsApp Automation state
  const [whatsAppConfig, setWhatsAppConfig] = useState({
    isConnected: true,
    linkedNumber: '+92 300 8472910',
    botName: 'Zenith Wellness Bot',
    daysBeforeExpiry: 3,
    sendOnInvoiceGenerated: true,
    sendOnAppointmentBooked: true,
    reminderTemplate: 'Hi {name}! 👋 Your {plan} at {gym} expires on {expiry}. Please renew today! Invoice #{invoice} total is {amount}.',
    appointmentTemplate: 'Hi {name}! 💅 Your appointment for {service} with {stylist} is confirmed for {time}. Reply 1 to confirm, 2 to reschedule.',
  });

  // Current view in the SaaS platform
  // 'landing' | 'deck' | 'dashboard' | 'members' | 'checkin' | 'appointments' | 'retailpos' | 'commissions' | 'invoices' | 'whatsapp' | 'website' | 'directory' | 'expenses' | 'logs' | 'export'
  const [currentView, setCurrentView] = useState('landing');
  const [currentMemberId, setCurrentMemberId] = useState('m1');

  useEffect(() => {
    localStorage.setItem('gymsoft_profile', JSON.stringify(gymProfile));
  }, [gymProfile]);

  useEffect(() => {
    localStorage.setItem('gymsoft_business_mode', businessMode);
  }, [businessMode]);

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
      hairFormula: memberData.hairFormula || 'Consultation pending',
      skinType: memberData.skinType || 'Normal',
      ...memberData,
    };
    setMembers([newMember, ...members]);

    const newInvoice = {
      id: `inv-${Math.floor(1000 + Math.random() * 9000)}`,
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
    addLog('member_new', 'New Client Enrolled', `${newMember.name} joined with plan ${newMember.planName}`, 'Front Desk');
  };

  const recordCheckIn = (memberId, method = 'Terminal QR', type = 'workout') => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newCheckIn = {
      id: `c-${Date.now()}`,
      memberName: member.name,
      time: `${timeStr} Today`,
      plan: member.planName,
      type: type, // 'workout' | 'salon' | 'hybrid'
      method: method,
      duration: type === 'salon' ? '45m' : '65m',
    };
    setCheckins([newCheckIn, ...checkins]);

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

    addLog('checkin', type === 'salon' ? 'Salon Client Checked-In' : 'Gym Athlete Checked-In', `${member.name} checked in (${type}) via ${method}`, member.name);
  };

  const bookAppointment = (appointmentData) => {
    const newApt = {
      id: `apt-${Date.now()}`,
      status: 'Confirmed',
      whatsappReminderSent: true,
      ...appointmentData,
    };
    setAppointments([newApt, ...appointments]);
    addLog('appointment', 'Appointment Booked', `${newApt.serviceName} booked for ${newApt.memberName} with ${newApt.stylist} at ${newApt.time}`, 'Reception Desk');
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
    const apt = appointments.find(a => a.id === id);
    if (apt) {
      addLog('appointment', `Appointment ${newStatus}`, `${apt.memberName}'s ${apt.serviceName} marked as ${newStatus}`, 'Reception Desk');
    }
  };

  const processRetailSale = (cartItems, paymentMethod = 'Cash') => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Deduct stock
    setRetailProducts(prev => prev.map(prd => {
      const inCart = cartItems.find(c => c.id === prd.id);
      if (inCart) {
        return { ...prd, stock: Math.max(0, prd.stock - inCart.quantity) };
      }
      return prd;
    }));

    // Record invoice
    const newInvoice = {
      id: `pos-${Math.floor(1000 + Math.random() * 9000)}`,
      invoiceNo: `POS-${Math.floor(1000 + Math.random() * 9000)}`,
      memberId: 'walk-in',
      memberName: 'POS Retail Customer',
      memberEmail: 'retail@zenithwellness.fit',
      memberPhone: '+92 300 0000000',
      planName: `Retail POS: ${cartItems.map(c => `${c.quantity}x ${c.name}`).join(', ')}`,
      amount: total,
      status: 'Paid',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      paidDate: new Date().toISOString().split('T')[0],
      paymentMethod,
      reminderSent: false,
    };
    setInvoices([newInvoice, ...invoices]);
    addLog('pos', 'Retail POS Sale Completed', `Collected ${currencyObj.symbol}${total} via ${paymentMethod}`, 'POS Terminal');
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
    addLog('reminder', 'WhatsApp Reminder Sent', `Sent renewal reminder for ${inv.invoiceNo} to ${inv.memberName}`, 'Autopilot');
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
  const totalRevenueMonth = invoices
    .filter(i => i.status === 'Paid')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpensesMonth = expenses
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const unpaidInvoicesCount = invoices.filter(i => i.status === 'Unpaid').length;
  const unpaidAmount = invoices
    .filter(i => i.status === 'Unpaid')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  // Salon specific metrics
  const todayAppointmentsCount = appointments.length;
  const salonServicesRevenue = appointments
    .filter(a => a.status === 'Completed' || a.status === 'In Chair')
    .reduce((acc, curr) => acc + Number(curr.price), 0);

  return (
    <GymDataContext.Provider
      value={{
        businessMode,
        setBusinessMode,
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
        appointments,
        setAppointments,
        salonServices,
        setSalonServices,
        retailProducts,
        setRetailProducts,
        staff,
        setStaff,
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
          totalRevenueMonth,
          totalExpensesMonth,
          netProfit: totalRevenueMonth - totalExpensesMonth,
          unpaidInvoicesCount,
          unpaidAmount,
          checkInsToday: checkins.length + 82,
          todayAppointmentsCount,
          salonServicesRevenue: salonServicesRevenue + 1280, // realistic monthly salon revenue
        },
        addMember,
        recordCheckIn,
        bookAppointment,
        updateAppointmentStatus,
        processRetailSale,
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
