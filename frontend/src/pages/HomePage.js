import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Wrench, AlertCircle, MapPin, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench className="w-10 h-10 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold">KB Car Clinic</h1>
                <p className="text-sm text-blue-200">Complete Automotive Ecosystem</p>
              </div>
            </div>
            <div className="flex gap-3">
              {user ? (
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold"
                >
                  <LayoutDashboard className="mr-2 w-5 h-5" />
                  Dashboard
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="border-white text-white hover:bg-blue-800"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* HERO EMERGENCY BUTTON - PROMINENT */}
        <div className="mb-16 text-center">
          <div 
            onClick={() => navigate('/emergency-ai')}
            className="relative inline-block cursor-pointer group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 animate-pulse"></div>
            <button className="relative bg-gradient-to-r from-red-600 to-red-700 text-white px-16 py-8 rounded-3xl text-3xl font-bold shadow-2xl transform transition-all hover:scale-105 active:scale-95">
              <div className="flex items-center gap-4">
                <AlertCircle className="w-12 h-12 animate-bounce" />
                <div className="text-left">
                  <div className="text-4xl font-black">🚨 EMERGENCY HELP</div>
                  <div className="text-sm text-red-100 font-normal mt-1">AI will find nearest open garage instantly</div>
                </div>
              </div>
            </button>
          </div>
          <p className="text-gray-600 mt-6 text-lg">Click if your vehicle is stuck or broken down right now</p>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Need Vehicle Help?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Choose what fits your situation right now
          </p>
        </div>

        {/* Two Main Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Emergency Card */}
          <Card 
            data-testid="emergency-card"
            className="border-2 border-red-500 hover:shadow-2xl transition-all cursor-pointer group"
            onClick={() => navigate('/emergency')}
          >
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <AlertCircle className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Vehicle Stopped or Unsafe
                </h3>
                <p className="text-gray-600">
                  If your car is stuck or won't move, get immediate help
                </p>
                <Button 
                  data-testid="emergency-button"
                  className="w-full h-14 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Get Help Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Regular Service Card */}
          <Card 
            data-testid="regular-service-card"
            className="border-2 border-blue-500 hover:shadow-2xl transition-all cursor-pointer group"
            onClick={() => navigate('/service-request')}
          >
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wrench className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Schedule Service or Inspection
                </h3>
                <p className="text-gray-600">
                  For regular checkups or minor issues
                </p>
                <Button 
                  data-testid="service-request-button"
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold"
                >
                  <MapPin className="mr-2 w-5 h-5" />
                  Request Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Elements */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-blue-600 font-semibold text-lg mb-2">Expert Service</div>
            <p className="text-gray-600 text-sm">Certified technicians</p>
          </div>
          <div className="p-4">
            <div className="text-blue-600 font-semibold text-lg mb-2">Genuine Care</div>
            <p className="text-gray-600 text-sm">Your satisfaction first</p>
          </div>
          <div className="p-4">
            <div className="text-blue-600 font-semibold text-lg mb-2">Affordable Price</div>
            <p className="text-gray-600 text-sm">No hidden charges</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <p className="font-bold text-gray-900 mb-1">KB Car Clinic</p>
            <p className="text-sm text-gray-600">Multi Brand Car Service & Repair Center</p>
          </div>
          <div className="text-gray-600 space-y-1">
            <p className="text-sm">📞 8140 900 112 • 8140 900 114</p>
            <p className="text-sm">✉️ kbcarclinic@gmail.com</p>
            <p className="text-sm">📍 Available across India • 24/7 Support</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
