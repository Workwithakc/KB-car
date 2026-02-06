import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Car, ShoppingCart, Calendar, History, FileText, 
  MessageSquare, Gift, Settings, Bell, Menu, X, LogOut, 
  Wrench, Package, TrendingUp, Users, AlertCircle, Video,
  Calculator, Award, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, notifications, selectedVehicle } = useApp();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', badge: null },
    { icon: Car, label: 'My Garage', path: '/dashboard/garage', badge: null },
    { icon: Calendar, label: 'Book Service', path: '/dashboard/booking', badge: null },
    { icon: ShoppingCart, label: 'Parts Store', path: '/dashboard/parts', badge: 'New' },
    { icon: TrendingUp, label: 'Price Compare', path: '/dashboard/compare', badge: null },
    { icon: AlertCircle, label: 'AI Diagnosis', path: '/dashboard/diagnosis', badge: 'AI' },
    { icon: History, label: 'Service History', path: '/dashboard/history', badge: null },
    { icon: Video, label: 'Video Consult', path: '/dashboard/consult', badge: null },
    { icon: Calculator, label: 'Cost Calculator', path: '/dashboard/calculator', badge: null },
    { icon: MapPin, label: 'Find Garages', path: '/dashboard/garages', badge: null },
    { icon: Package, label: 'Subscriptions', path: '/dashboard/subscriptions', badge: null },
    { icon: FileText, label: 'Documents', path: '/dashboard/documents', badge: null },
    { icon: MessageSquare, label: 'Articles', path: '/dashboard/articles', badge: null },
    { icon: Gift, label: 'Rewards', path: '/dashboard/rewards', badge: null },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings', badge: null },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-blue-900 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white hover:bg-blue-800"
              >
                <Menu className="w-6 h-6" />
              </Button>
              <Wrench className="w-8 h-8 text-yellow-400" />
              <div>
                <h1 className="text-xl font-bold">KB Car Clinic</h1>
                <p className="text-xs text-blue-200">Automotive Ecosystem</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-blue-800"
                onClick={() => navigate('/dashboard/notifications')}
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 p-0 flex items-center justify-center text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
              <div className="hidden sm:flex items-center gap-3 px-3 py-2 bg-blue-800 rounded-lg">
                <div className="text-right">
                  <p className="text-sm font-semibold">{user?.name || 'Guest User'}</p>
                  {selectedVehicle && (
                    <p className="text-xs text-blue-200">{selectedVehicle.brand} {selectedVehicle.model}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-white hover:bg-blue-700"
                  data-testid="logout-button"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-[57px] h-[calc(100vh-57px)] bg-white shadow-xl z-40 transition-transform duration-300 w-72 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-blue-100 text-blue-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  data-testid={`sidebar-${item.label.toLowerCase().replace(/ /g, '-')}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant={item.badge === 'AI' ? 'default' : 'secondary'} className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Logout */}
        <div className="lg:hidden p-4 border-t">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-[57px] lg:pl-72 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
