import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, Navigation, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Dummy garage data for demo
const dummyGarages = [
  { id: 1, name: "KB Car Clinic - Central", phone: "8140900112", distance: "1.2 km", address: "MG Road, City Center", rating: 4.8 },
  { id: 2, name: "AutoCare Service Center", phone: "9876543210", distance: "2.5 km", address: "Nehru Nagar, Sector 12", rating: 4.6 },
  { id: 3, name: "Express Car Repair", phone: "8765432109", distance: "3.1 km", address: "Ring Road, Industrial Area", rating: 4.7 },
  { id: 4, name: "24/7 Vehicle Assistance", phone: "7654321098", distance: "4.0 km", address: "Highway Circle", rating: 4.5 },
];

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [nearbyGarages, setNearbyGarages] = useState([]);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          // Simulate finding nearby garages
          setTimeout(() => {
            setNearbyGarages(dummyGarages);
            setLoadingLocation(false);
          }, 1500);
        },
        (error) => {
          console.error('Location error:', error);
          // Even without location, show garages
          setNearbyGarages(dummyGarages);
          setLoadingLocation(false);
        }
      );
    } else {
      // Browser doesn't support geolocation
      setNearbyGarages(dummyGarages);
      setLoadingLocation(false);
    }
  }, []);

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="bg-red-600 text-white py-4 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            data-testid="back-button"
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-white hover:bg-red-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Emergency Assistance</h1>
            <p className="text-sm text-red-100">Finding help near you...</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Emergency Warning */}
        <Card className="bg-red-50 border-red-200 mb-8" data-testid="emergency-warning">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-900 mb-2">
                  If you are unsafe, please call immediately
                </h2>
                <p className="text-red-700 mb-4">
                  We'll guide you through the situation. Our team is ready to help 24/7.
                </p>
                <Button
                  data-testid="direct-call-button"
                  onClick={() => handleCall('8140900112')}
                  className="bg-red-600 hover:bg-red-700 h-12"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call KB Car Clinic Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Status */}
        {loadingLocation ? (
          <Card className="mb-6">
            <CardContent className="p-8 text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Detecting your location and finding nearby garages...</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {location && (
              <div className="flex items-center gap-2 text-gray-600 mb-6 justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Location detected • Showing {nearbyGarages.length} nearby garages</span>
              </div>
            )}

            {/* Nearby Garages List */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Garages</h2>
            <div className="space-y-4">
              {nearbyGarages.map((garage) => (
                <Card 
                  key={garage.id} 
                  data-testid={`garage-card-${garage.id}`}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{garage.name}</h3>
                          <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded text-sm">
                            <span className="text-green-700 font-semibold">★ {garage.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Navigation className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-600">{garage.distance}</span>
                          <span>•</span>
                          <span className="text-sm">{garage.address}</span>
                        </div>
                        <div className="text-gray-700 font-mono text-sm">
                          <Phone className="w-4 h-4 inline mr-1" />
                          {garage.phone}
                        </div>
                      </div>
                      <Button
                        data-testid={`call-button-${garage.id}`}
                        onClick={() => handleCall(garage.phone)}
                        className="bg-blue-600 hover:bg-blue-700 h-12 sm:h-14 px-8 text-base font-semibold"
                      >
                        <Phone className="mr-2 w-5 h-5" />
                        Call Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* WhatsApp Support */}
            <Card className="mt-8 bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Prefer to Chat on WhatsApp?
                </h3>
                <p className="text-gray-600 mb-4">
                  Send us your location and we'll coordinate immediate help
                </p>
                <Button
                  data-testid="whatsapp-button"
                  onClick={() => window.open('https://wa.me/918140900112?text=Emergency%20vehicle%20help%20needed', '_blank')}
                  className="bg-green-600 hover:bg-green-700 h-12"
                >
                  Open WhatsApp
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default EmergencyPage;
