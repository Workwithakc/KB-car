import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car, Calendar, AlertTriangle, TrendingUp, Clock, 
  DollarSign, Award, ArrowRight, Bell, ShoppingCart, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';

const MainDashboard = () => {
  const navigate = useNavigate();
  const { user, vehicles, selectedVehicle, serviceHistory, addNotification } = useApp();
  const [stats, setStats] = useState({
    totalSpent: 0,
    servicesCompleted: 0,
    nextService: null,
    healthScore: 85
  });

  useEffect(() => {
    // Check if user is logged in, if not redirect to login
    if (!user) {
      navigate('/login');
      return;
    }

    // Calculate stats
    const totalSpent = serviceHistory.reduce((sum, service) => sum + (service.cost || 0), 0);
    setStats({
      ...stats,
      totalSpent,
      servicesCompleted: serviceHistory.length
    });
  }, [user, serviceHistory]);

  const quickActions = [
    { icon: Calendar, label: 'Book Service', path: '/dashboard/booking', color: 'bg-blue-500' },
    { icon: AlertTriangle, label: 'Emergency SOS', path: '/emergency-ai', color: 'bg-red-500' },
    { icon: ShoppingCart, label: 'Buy Parts', path: '/dashboard/parts', color: 'bg-green-500' },
    { icon: TrendingUp, label: 'Compare Prices', path: '/dashboard/compare', color: 'bg-purple-500' },
  ];

  const upcomingReminders = [
    { id: 1, type: 'service', title: 'Regular Service Due', date: '15 Feb 2026', urgent: false },
    { id: 2, type: 'insurance', title: 'Insurance Renewal', date: '10 Mar 2026', urgent: true },
    { id: 3, type: 'pollution', title: 'Pollution Check', date: '20 Feb 2026', urgent: false },
  ];

  const recentServices = serviceHistory.slice(0, 3);

  const trendingOffers = [
    { id: 1, title: 'Winter Service Package', discount: '30% OFF', price: '₹1,999', savings: '₹857' },
    { id: 2, title: 'Complete Car Wash', discount: 'FLAT ₹299', price: '₹299', savings: '₹201' },
    { id: 3, title: 'AC Service Special', discount: '25% OFF', price: '₹749', savings: '₹250' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(' ')[0] || 'Guest'}! 👋
            </h1>
            <p className="text-gray-600 mt-1">Here's your vehicle health overview</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/dashboard/booking')}>
            <Calendar className="mr-2 w-4 h-4" />
            Book Service Now
          </Button>
        </div>

        {/* EMERGENCY SOS BANNER - PROMINENT */}
        <Card className="border-4 border-red-500 bg-gradient-to-r from-red-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-900 mb-1">Need Emergency Help?</h3>
                  <p className="text-red-700">AI will find nearest open garage in seconds</p>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/emergency-ai')}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 h-14 px-8 text-lg font-bold"
                data-testid="emergency-sos-banner"
              >
                <AlertTriangle className="mr-2 w-5 h-5" />
                Get Emergency Help
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vehicle Health</p>
                  <p className="text-3xl font-bold text-green-600">{stats.healthScore}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <Progress value={stats.healthScore} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Services Done</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.servicesCompleted}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Total services completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                  <p className="text-3xl font-bold text-purple-600">₹{stats.totalSpent.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Reward Points</p>
                  <p className="text-3xl font-bold text-yellow-600">1,250</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Redeem for discounts</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.path}
                    onClick={() => navigate(action.path)}
                    className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all hover:shadow-lg group"
                  >
                    <div className={`w-14 h-14 ${action.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 text-center">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Reminders */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  Upcoming Reminders
                </CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${reminder.urgent ? 'bg-red-100' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
                        <AlertTriangle className={`w-5 h-5 ${reminder.urgent ? 'text-red-600' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{reminder.title}</p>
                        <p className="text-sm text-gray-600">{reminder.date}</p>
                      </div>
                    </div>
                    {reminder.urgent && (
                      <Badge variant="destructive">Urgent</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Vehicle */}
          <Card>
            <CardHeader>
              <CardTitle>Current Vehicle</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedVehicle ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                    <Car className="w-20 h-20 text-blue-900" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedVehicle.brand} {selectedVehicle.model}
                    </h3>
                    <p className="text-sm text-gray-600">{selectedVehicle.vehicleType}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedVehicle.number || 'No plate added'}</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard/garage')}>
                    Change Vehicle
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No vehicle added yet</p>
                  <Button onClick={() => navigate('/dashboard/garage')}>
                    Add Your First Vehicle
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Trending Offers */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Trending Offers
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/subscriptions')}>
                View All Offers
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trendingOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="relative p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl hover:shadow-lg transition-all cursor-pointer group"
                >
                  <Badge className="absolute top-3 right-3 bg-green-500">{offer.discount}</Badge>
                  <h3 className="font-bold text-gray-900 mb-2 pr-16">{offer.title}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-blue-600">{offer.price}</span>
                    <span className="text-sm text-gray-500 line-through">Save {offer.savings}</span>
                  </div>
                  <Button size="sm" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 group-hover:scale-105 transition-transform">
                    Book Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Service History */}
        {recentServices.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Services</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/history')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{service.service || 'Service'}</p>
                      <p className="text-sm text-gray-600">{new Date(service.timestamp).toLocaleDateString()}</p>
                    </div>
                    <span className="font-bold text-blue-600">₹{service.cost || 0}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MainDashboard;
