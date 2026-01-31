import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login(formData);
    navigate('/dashboard');
  };

  const quickLogin = () => {
    login({ name: 'Demo User', phone: '9876543210' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo & Title */}
        <div className="text-center">
          <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-12 h-12 text-blue-900" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">KB Car Clinic</h1>
          <p className="text-blue-200">Complete Automotive Ecosystem</p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <p className="text-sm text-gray-600">Login to access your garage</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  data-testid="login-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your name"
                  required
                  className="mt-2 h-12"
                />
              </div>
              <div>
                <Label htmlFor="phone">Mobile Number</Label>
                <Input
                  id="phone"
                  data-testid="login-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="10-digit mobile number"
                  required
                  className="mt-2 h-12"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-base">
                Login
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={quickLogin}
              className="w-full h-12"
            >
              Quick Demo Login
            </Button>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center text-white text-sm">
          <div>
            <div className="text-2xl mb-1">🚗</div>
            <div>Multi-Vehicle</div>
          </div>
          <div>
            <div className="text-2xl mb-1">📅</div>
            <div>Easy Booking</div>
          </div>
          <div>
            <div className="text-2xl mb-1">🤖</div>
            <div>AI Diagnosis</div>
          </div>
        </div>

        {/* Guest Access */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-blue-200 hover:text-white"
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
