import React from 'react';
import { LayoutDashboard, ShoppingCart, MapPin, Tablet, AlertTriangle, MessageSquare, LogOut, X } from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  partnerName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, onLogout, isMobileOpen, setIsMobileOpen, partnerName }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sales', label: 'Sales', icon: ShoppingCart },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'devices', label: 'Devices', icon: Tablet },
    { id: 'report', label: 'Report a Problem', icon: AlertTriangle },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-black border-r border-zinc-800 text-white transform transition-transform duration-200 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col h-full`}>
        
        {/* Logo / Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <div className="flex items-center h-10">
            <Logo className="h-9 w-auto" />
          </div>
          <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setIsMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-zinc-800 text-white border border-zinc-700' 
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-zinc-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;