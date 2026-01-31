import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Phone, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminPage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/service-requests`);
      if (response.ok) {
        const data = await response.json();
        setRequests(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getUrgencyColor = (urgency) => {
    const colors = {
      'immediate': 'bg-red-500',
      '24hours': 'bg-orange-500',
      '2-3days': 'bg-yellow-500',
      'flexible': 'bg-green-500'
    };
    return colors[urgency] || 'bg-gray-500';
  };

  const getUrgencyLabel = (urgency) => {
    const labels = {
      'immediate': 'Immediate',
      '24hours': '24 Hours',
      '2-3days': '2-3 Days',
      'flexible': 'Flexible'
    };
    return labels[urgency] || urgency;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4 px-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              data-testid="back-button"
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-blue-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Service Requests</h1>
              <p className="text-sm text-blue-200">{requests.length} total requests</p>
            </div>
          </div>
          <Button
            data-testid="refresh-button"
            variant="ghost"
            size="icon"
            onClick={fetchRequests}
            className="text-white hover:bg-blue-800"
          >
            <RefreshCw className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading && requests.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-600">
              Loading requests...
            </CardContent>
          </Card>
        ) : requests.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-600">
              No service requests yet
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card 
                key={request.id} 
                data-testid={`request-card-${request.id}`}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{request.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {formatDate(request.timestamp)}
                      </div>
                    </div>
                    <Badge className={`${getUrgencyColor(request.urgency)} text-white`}>
                      {getUrgencyLabel(request.urgency)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-1">Contact</div>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Phone className="w-4 h-4 text-blue-600" />
                        {request.phone}
                      </div>
                      {request.whatsapp && request.whatsapp !== request.phone && (
                        <div className="flex items-center gap-2 text-gray-700 text-sm mt-1">
                          <span>WhatsApp: {request.whatsapp}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-1">Vehicle</div>
                      <div className="text-gray-900">
                        {request.vehicleType} - {request.brand} {request.model}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Issues Reported</div>
                    <div className="flex flex-wrap gap-2">
                      {request.selectedIssues.map((issue, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {issue}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700 mb-4">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{request.location}</span>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      data-testid={`call-button-${request.id}`}
                      onClick={() => window.location.href = `tel:${request.phone}`}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Phone className="mr-2 w-4 h-4" />
                      Call Customer
                    </Button>
                    <Button
                      data-testid={`whatsapp-button-${request.id}`}
                      onClick={() => window.open(`https://wa.me/91${request.phone}?text=Hello ${request.name}, this is KB Car Clinic regarding your service request.`, '_blank')}
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                    >
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
