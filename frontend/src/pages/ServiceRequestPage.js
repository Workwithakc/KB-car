import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const vehicleTypes = ['Car', 'Bike', 'SUV', 'Commercial Vehicle'];
const carBrands = [
  'Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota', 
  'Kia', 'MG', 'Volkswagen', 'Skoda', 'Renault', 'Nissan', 'Other'
];
const issues = [
  'Vehicle not starting',
  'Strange noise',
  'Warning light on dashboard',
  'Performance issue',
  'Regular servicing',
  'Something feels off',
  'Not sure'
];

const ServiceRequestPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    sameAsPhone: true,
    vehicleType: '',
    brand: '',
    model: '',
    selectedIssues: [],
    location: '',
    urgency: ''
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleIssue = (issue) => {
    setFormData(prev => ({
      ...prev,
      selectedIssues: prev.selectedIssues.includes(issue)
        ? prev.selectedIssues.filter(i => i !== issue)
        : [...prev.selectedIssues, issue]
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      // Submit to backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/service-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          whatsapp: formData.sameAsPhone ? formData.phone : formData.whatsapp,
          vehicleType: formData.vehicleType,
          brand: formData.brand,
          model: formData.model,
          selectedIssues: formData.selectedIssues,
          location: formData.location,
          urgency: formData.urgency,
        }),
      });

      if (response.ok) {
        console.log('Request submitted successfully');
        navigate('/confirmation', { state: { formData } });
      } else {
        console.error('Failed to submit request');
        // Still navigate to confirmation for demo purposes
        navigate('/confirmation', { state: { formData } });
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      // Still navigate to confirmation for demo purposes
      navigate('/confirmation', { state: { formData } });
    }
  };

  const isStepValid = () => {
    if (step === 1) return formData.name && formData.phone;
    if (step === 2) return formData.vehicleType && formData.brand;
    if (step === 3) return formData.selectedIssues.length > 0 && formData.location && formData.urgency;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            data-testid="back-button"
            variant="ghost"
            size="icon"
            onClick={() => step === 1 ? navigate('/') : handleBack()}
            className="text-white hover:bg-blue-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Request Vehicle Service</h1>
            <p className="text-sm text-blue-200">Step {step} of 3</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`flex-1 h-2 rounded ${s <= step ? 'bg-blue-600' : 'bg-gray-200'} ${s !== 1 ? 'ml-2' : ''}`} />
            ))}
          </div>
        </div>

        {/* Reassurance Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-900 text-center font-medium">
            You don't need to know what's wrong. Just tell us what you notice.
          </p>
        </div>

        {/* Step 1: Personal Details */}
        {step === 1 && (
          <Card data-testid="step-1-card">
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  data-testid="name-input"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label htmlFor="phone">Mobile Number *</Label>
                <Input
                  id="phone"
                  data-testid="phone-input"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="10-digit mobile number"
                  className="mt-2 h-12"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sameAsPhone"
                  data-testid="same-as-phone-checkbox"
                  checked={formData.sameAsPhone}
                  onCheckedChange={(checked) => {
                    updateField('sameAsPhone', checked);
                    if (checked) updateField('whatsapp', formData.phone);
                  }}
                />
                <Label htmlFor="sameAsPhone" className="cursor-pointer">
                  WhatsApp number is same as mobile
                </Label>
              </div>

              {!formData.sameAsPhone && (
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    data-testid="whatsapp-input"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    placeholder="10-digit WhatsApp number"
                    className="mt-2 h-12"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Vehicle Details */}
        {step === 2 && (
          <Card data-testid="step-2-card">
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="vehicleType">Vehicle Type *</Label>
                <Select value={formData.vehicleType} onValueChange={(value) => updateField('vehicleType', value)}>
                  <SelectTrigger data-testid="vehicle-type-select" className="mt-2 h-12">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="brand">Brand *</Label>
                <Select value={formData.brand} onValueChange={(value) => updateField('brand', value)}>
                  <SelectTrigger data-testid="brand-select" className="mt-2 h-12">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {carBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="model">Model (Optional)</Label>
                <Input
                  id="model"
                  data-testid="model-input"
                  value={formData.model}
                  onChange={(e) => updateField('model', e.target.value)}
                  placeholder="e.g., Swift, City, Nexon"
                  className="mt-2 h-12"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Issue & Location */}
        {step === 3 && (
          <Card data-testid="step-3-card">
            <CardHeader>
              <CardTitle>What's Happening?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Select all that apply *</Label>
                <div className="mt-3 space-y-3">
                  {issues.map((issue) => (
                    <div key={issue} className="flex items-center space-x-3">
                      <Checkbox
                        id={issue}
                        data-testid={`issue-${issue.toLowerCase().replace(/ /g, '-')}`}
                        checked={formData.selectedIssues.includes(issue)}
                        onCheckedChange={() => toggleIssue(issue)}
                      />
                      <Label htmlFor={issue} className="cursor-pointer font-normal">
                        {issue}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="location">Current Location *</Label>
                <Input
                  id="location"
                  data-testid="location-input"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="e.g., Home, Office, Roadside"
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label htmlFor="urgency">How urgent is this? *</Label>
                <Select value={formData.urgency} onValueChange={(value) => updateField('urgency', value)}>
                  <SelectTrigger data-testid="urgency-select" className="mt-2 h-12">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediately</SelectItem>
                    <SelectItem value="24hours">Within 24 hours</SelectItem>
                    <SelectItem value="2-3days">2-3 days</SelectItem>
                    <SelectItem value="flexible">No urgency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-2xl mx-auto flex gap-4">
            {step < 3 ? (
              <Button
                data-testid="next-button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
              >
                Continue
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <Button
                data-testid="submit-button"
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg font-semibold"
              >
                <CheckCircle2 className="mr-2 w-5 h-5" />
                Confirm Request
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceRequestPage;
