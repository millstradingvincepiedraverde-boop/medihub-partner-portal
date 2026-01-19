import React, { useState, useEffect } from 'react';
import Sidebar from '../(frontend)/components/Sidebar';
import Dashboard from '../(frontend)/pages/Dashboard/Dashboard';
import Sales from '../(frontend)/pages/Sales/Sales';
import Locations from '../(frontend)/pages/Locations/Locations';
import Devices from '../(frontend)/pages/Devices/Devices';
import ReportProblem from '../(frontend)/pages/ReportProblem/ReportProblem';
import Feedback from '../(frontend)/pages/Feedback/Feedback';
import { PARTNERS } from '../../constants';
import { Partner } from '../../types';
import { getPartnerDevices, getPartnerLocations, getPartnerOrders } from '../(backend)/services/dataService';
import { Menu } from 'lucide-react';
import Logo from '../(frontend)/components/Logo';

const App: React.FC = () => {
  // Auth State (Mock)
  const [currentUser, setCurrentUser] = useState<Partner | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation State
  const [activePage, setActivePage] = useState('dashboard');

  // Data State
  const [data, setData] = useState({
    orders: [],
    locations: [],
    devices: []
  });

  // Load data when user changes
  useEffect(() => {
    if (currentUser) {
      const id = currentUser.partner_id;
      setData({
        orders: getPartnerOrders(id) as any,
        locations: getPartnerLocations(id) as any,
        devices: getPartnerDevices(id) as any
      });
      setActivePage('dashboard');
    }
  }, [currentUser]);

  // Mock Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-800">
          <div className="text-center mb-8">
            <Logo className="h-12 w-auto mx-auto mb-6 text-white" />
            <p className="text-zinc-400">Partner Access Point</p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm font-medium text-zinc-500 mb-2">Select a demo partner to log in:</p>
            {PARTNERS.map(p => (
              <button
                key={p.partner_id}
                onClick={() => setCurrentUser(p)}
                className="w-full p-4 text-left rounded-xl border border-zinc-800 bg-zinc-950 hover:border-white hover:bg-zinc-900 transition-all group"
              >
                <div className="font-bold text-white group-hover:text-white">{p.partner_name}</div>
                <div className="text-sm text-zinc-500">{p.email}</div>
              </button>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-600">
            Secure Partner Access v1.0.0
          </div>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard orders={data.orders} />;
      case 'sales': return <Sales orders={data.orders} locations={data.locations} />;
      case 'locations': return <Locations locations={data.locations} />;
      case 'devices': return <Devices devices={data.devices} locations={data.locations} />;
      case 'report': return <ReportProblem locations={data.locations} devices={data.devices} partner={currentUser} />;
      case 'feedback': return <Feedback partner={currentUser} />;
      default: return <Dashboard orders={data.orders} />;
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden font-sans text-zinc-100">
      <Sidebar 
        activePage={activePage} 
        onNavigate={setActivePage} 
        onLogout={() => setCurrentUser(null)}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
        partnerName={currentUser.partner_name}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Mobile Header */}
        <header className="lg:hidden bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between">
          <Logo className="h-6 w-auto text-white" />
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-zinc-400 hover:text-white">
            <Menu size={24} />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
             {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;