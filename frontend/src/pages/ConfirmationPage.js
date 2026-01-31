import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Phone, MessageCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};

  const handleWhatsApp = () => {
    const message = `Hi, I just submitted a service request.\nName: ${formData.name}\nVehicle: ${formData.brand} ${formData.model}\nIssues: ${formData.selectedIssues.join(', ')}`;
    window.open(`https://wa.me/918140900112?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:8140900112';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <main className="max-w-2xl mx-auto px-4 py-16">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 className="w-16 h-16 text-green-600" data-testid="success-icon" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Request Received!
          </h1>
          <p className="text-xl text-gray-600">
            Our team will contact you shortly
          </p>
        </div>

        {/* Summary Card */}
        <Card className="mb-8" data-testid="confirmation-summary">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Request Summary</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <span className="font-semibold">Name:</span> {formData.name}
              </div>
              <div>
                <span className="font-semibold">Phone:</span> {formData.phone}
              </div>
              <div>
                <span className="font-semibold">Vehicle:</span> {formData.vehicleType} - {formData.brand} {formData.model}
              </div>
              <div>
                <span className="font-semibold">Issues:</span> {formData.selectedIssues?.join(', ')}
              </div>
              <div>
                <span className="font-semibold">Location:</span> {formData.location}
              </div>
              <div>
                <span className="font-semibold">Urgency:</span> {formData.urgency}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">What Happens Next?</h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <span>Our team reviews your request</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <span>We'll call or WhatsApp you within 30 minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <span>Schedule inspection or pickup as needed</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            data-testid="whatsapp-follow-up-button"
            onClick={handleWhatsApp}
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg font-semibold"
          >
            <MessageCircle className="mr-2 w-5 h-5" />
            Chat on WhatsApp
          </Button>

          <Button
            data-testid="call-support-button"
            onClick={handleCall}
            variant="outline"
            className="w-full h-14 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg font-semibold"
          >
            <Phone className="mr-2 w-5 h-5" />
            Call Support
          </Button>

          <Button
            data-testid="back-home-button"
            onClick={() => navigate('/')}
            variant="ghost"
            className="w-full h-14 text-gray-600 hover:bg-gray-100 text-lg font-semibold"
          >
            <Home className="mr-2 w-5 h-5" />
            Back to Home
          </Button>
        </div>

        {/* Trust Message */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            No charges without approval • Human support available • Local service partners
          </p>
        </div>
      </main>
    </div>
  );
};

export default ConfirmationPage;
