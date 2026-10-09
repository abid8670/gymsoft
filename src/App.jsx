import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { GymDataProvider, useGymData } from './context/GymDataContext';
import Navbar from './components/Navbar';
import ThemeCustomizerModal from './components/ThemeCustomizerModal';
import AddMemberModal from './components/AddMemberModal';
import LandingPageView from './components/LandingPageView';
import DeckViewer from './components/DeckViewer';
import DashboardView from './components/DashboardView';
import MembersView from './components/MembersView';
import CheckInTerminal from './components/CheckInTerminal';
import AppointmentsView from './components/AppointmentsView';
import RetailPosView from './components/RetailPosView';
import StaffCommissionsView from './components/StaffCommissionsView';
import ClientCardsView from './components/ClientCardsView';
import InvoicesView from './components/InvoicesView';
import WhatsAppAutomationView from './components/WhatsAppAutomationView';
import GymWebsiteView from './components/GymWebsiteView';
import GymsDirectoryView from './components/GymsDirectoryView';
import ExpensesView from './components/ExpensesView';
import ActivityLogsView from './components/ActivityLogsView';
import ExportCenterView from './components/ExportCenterView';

import { 
  LayoutDashboard, Users, CalendarCheck, Receipt, MessageSquare, 
  Globe, Building2, DollarSign, FileText, Download, Scissors, 
  ShoppingBag, Award, Sparkles 
} from 'lucide-react';

function MainAppContent() {
  const { currentView, setCurrentView, activeRole, setActiveRole } = useGymData();
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  const isPublicPage = currentView === 'landing' || currentView === 'deck';

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPageView 
            onEnterApp={() => setCurrentView('dashboard')}
            onViewDeck={() => setCurrentView('deck')}
            onViewDirectory={() => setCurrentView('directory')}
          />
        );
      case 'deck':
        return (
          <DeckViewer 
            onLaunchApp={() => setCurrentView('dashboard')}
          />
        );
      case 'dashboard':
        return (
          <DashboardView 
            onNavigate={(view) => setCurrentView(view)}
            onOpenAddMember={() => setAddMemberOpen(true)}
            onOpenCheckIn={() => setCurrentView('checkin')}
          />
        );
      case 'appointments':
        return <AppointmentsView />;
      case 'retailpos':
        return <RetailPosView />;
      case 'commissions':
        return <StaffCommissionsView />;
      case 'clientcards':
        return <ClientCardsView />;
      case 'members':
        return (
          <MembersView 
            onOpenAddMember={() => setAddMemberOpen(true)}
          />
        );
      case 'checkin':
        return (
          <CheckInTerminal 
            onOpenAddMember={() => setAddMemberOpen(true)}
          />
        );
      case 'invoices':
        return <InvoicesView />;
      case 'whatsapp':
        return <WhatsAppAutomationView />;
      case 'website':
        return <GymWebsiteView />;
      case 'directory':
        return <GymsDirectoryView />;
      case 'expenses':
        return <ExpensesView />;
      case 'logs':
        return <ActivityLogsView />;
      case 'export':
        return <ExportCenterView />;
      default:
        return (
          <DashboardView 
            onNavigate={(view) => setCurrentView(view)} 
            onOpenAddMember={() => setAddMemberOpen(true)} 
            onOpenCheckIn={() => setCurrentView('checkin')} 
          />
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Navbar */}
      <Navbar onOpenThemeModal={() => setThemeModalOpen(true)} />

      {/* Role Notice Banner */}
      {activeRole !== 'owner' && (
        <div style={{
          backgroundColor: 'var(--color-primary-light)',
          borderBottom: '1px solid rgba(var(--color-primary-rgb), 0.3)',
          padding: '8px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8125rem',
          zIndex: 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800 }}>Role Simulation:</span>
            <span>You are viewing ZenithSoft as <strong>{activeRole.toUpperCase()}</strong>.</span>
          </div>
          <button
            onClick={() => setActiveRole('owner')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-primary)',
              fontWeight: 800,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Switch back to Owner
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: isPublicPage ? '0' : '28px 20px 80px 20px' }}>
        <div className={isPublicPage ? '' : 'container-wide'}>
          {renderActiveView()}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar (Visible only when inside the SaaS platform) */}
      {!isPublicPage && (
        <div className="mobile-only glass" style={{
          position: 'fixed',
          bottom: 0,
          insetInline: 0,
          height: 'var(--bottom-nav-height)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 49,
          backgroundColor: 'var(--glass-bg)',
        }}>
          {[
            { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
            { id: 'appointments', label: 'Salon', icon: Scissors },
            { id: 'retailpos', label: 'POS', icon: ShoppingBag },
            { id: 'checkin', label: 'Check-In', icon: CalendarCheck },
            { id: 'invoices', label: 'Billing', icon: Receipt },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '0.6875rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  padding: '6px',
                }}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <ThemeCustomizerModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
      />

      <AddMemberModal
        isOpen={addMemberOpen}
        onClose={() => setAddMemberOpen(false)}
      />

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        padding: '28px 20px',
        fontSize: '0.8125rem',
        color: 'var(--color-text-muted)',
      }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
              Zenith<span style={{ color: 'var(--color-primary)' }}>Soft</span>
            </span>
            <span>· All-in-One Operating System for Fitness Gyms, Beauty Salons & Spas</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span 
              onClick={() => setCurrentView('deck')} 
              style={{ cursor: 'pointer', color: 'var(--color-text-muted)' }}
            >
              22-Slide Deck
            </span>
            <span 
              onClick={() => setCurrentView('directory')} 
              style={{ cursor: 'pointer', color: 'var(--color-text-muted)' }}
            >
              Wellness Directory
            </span>
            <button
              onClick={() => setThemeModalOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-primary)',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.8125rem',
              }}
            >
              Theme & Branding
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GymDataProvider>
        <MainAppContent />
      </GymDataProvider>
    </ThemeProvider>
  );
}
