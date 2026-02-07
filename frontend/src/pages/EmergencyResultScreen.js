import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Clock, Star, CheckCircle2, Navigation, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const EmergencyResultScreen = () => {
  const navigate = useNavigate();

  // Mock garage data - best match found by AI
  const bestGarage = {
    name: "KB Car Clinic - Central",
    distance: "1.2 km",
    estimatedTime: "5 mins",
    status: "OPEN",
    rating: 4.8,
    phone: "8140900112",
    address: "MG Road, City Center",
    services: ["Emergency Support", "24/7 Available", "Towing Service"],
    lastUpdated: "2 mins ago"
  };

  const handleCall = () => {
    window.location.href = `tel:${bestGarage.phone}`;
  };

  const handleWhatsApp = () => {
    const message = `🚨 EMERGENCY REQUEST\n\nI need immediate vehicle assistance!\n\nLocation: Near ${bestGarage.address}\n\nPlease respond ASAP.`;
    window.open(`https://wa.me/91${bestGarage.phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Garage Found!</h1>
          <p className="text-green-100 text-lg">AI has matched you with the best available garage</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* AI Match Badge */}
        <div className="flex justify-center mb-6">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 text-lg">
            🤖 AI Recommended • Best Match
          </Badge>
        </div>

        {/* Garage Card */}
        <Card className="border-4 border-green-500 shadow-2xl mb-6">
          <CardContent className="p-8">
            {/* Garage Info */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{bestGarage.name}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500 text-white text-lg px-4 py-1 animate-pulse">
                      {bestGarage.status}
                    </Badge>
                    <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                      <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      <span className="font-bold text-gray-900">{bestGarage.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Navigation className="w-5 h-5" />
                    <span className="font-semibold">Distance</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{bestGarage.distance}</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-600 mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">ETA</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{bestGarage.estimatedTime}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-xl col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">Status</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">Available Now</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl mb-6">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Location</p>
                  <p className="text-gray-700">{bestGarage.address}</p>
                  <p className="text-xs text-gray-500 mt-1">Updated {bestGarage.lastUpdated}</p>
                </div>
              </div>

              {/* Services */}
              <div className="mb-6">
                <p className="font-semibold text-gray-900 mb-3">Available Services:</p>
                <div className="flex flex-wrap gap-2">
                  {bestGarage.services.map((service, idx) => (
                    <Badge key={idx} variant="outline" className="text-base px-4 py-2">
                      ✓ {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleCall}
                className="w-full h-16 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xl font-bold shadow-lg"
                data-testid="call-garage-button"
              >
                <Phone className="mr-3 w-6 h-6" />
                Call Garage Now
              </Button>

              <Button
                onClick={handleWhatsApp}
                className="w-full h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl font-bold shadow-lg"
                data-testid="whatsapp-button"
              >
                <MessageCircle className="mr-3 w-6 h-6" />
                Send Emergency Request
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="bg-blue-50 border-blue-200 mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-xl">💡</span>
              What Happens Next?
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Call the garage or send WhatsApp message</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Share your exact location with them</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Mechanic will arrive within {bestGarage.estimatedTime}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                <span>Emergency assistance provided on-site</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex-1 h-12"
          >
            <Home className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/emergency-ai')}
            className="flex-1 h-12"
          >
            Find Another Garage
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            ⚡ This prototype simulates AI-based garage matching.
            <br />
            Live AI and real-time data will be integrated in production.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResultScreen;
