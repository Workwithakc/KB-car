import React, { useState } from 'react';
import { Shield, Upload, CheckCircle2, AlertTriangle, FileText, Camera, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import DashboardLayout from '@/components/DashboardLayout';

const InsuranceClaim = () => {
  const [step, setStep] = useState(1);
  const [claimData, setClaimData] = useState({
    // Policy Details
    policyNumber: '',
    insuranceCompany: '',
    policyType: '',
    
    // Incident Details
    incidentType: '',
    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    incidentDescription: '',
    policeReported: false,
    firNumber: '',
    
    // Vehicle Details
    vehicleMake: '',
    vehicleModel: '',
    registrationNumber: '',
    
    // Damage Details
    damageType: [],
    estimatedDamageCost: '',
    thirdPartyInvolved: false,
    injuries: false,
    
    // Garage Details
    preferredGarage: '',
    claimType: 'cashless',
    
    // Contact
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const insuranceCompanies = [
    'HDFC ERGO', 'ICICI Lombard', 'Bajaj Allianz', 'Tata AIG', 
    'New India Assurance', 'National Insurance', 'Oriental Insurance', 'Other'
  ];

  const incidentTypes = [
    'Accident', 'Theft', 'Fire', 'Natural Calamity', 'Vandalism', 'Hit and Run'
  ];

  const damageTypes = [
    'Front Bumper', 'Rear Bumper', 'Hood', 'Doors', 'Windows/Windshield',
    'Headlights/Taillights', 'Wheels/Tires', 'Engine', 'Body Paint', 'Interior'
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    setStep(5);
  };

  const isStepValid = () => {
    if (step === 1) return claimData.policyNumber && claimData.insuranceCompany && claimData.policyType;
    if (step === 2) return claimData.incidentType && claimData.incidentDate && claimData.incidentLocation;
    if (step === 3) return claimData.damageType.length > 0 && claimData.estimatedDamageCost;
    if (step === 4) return claimData.contactName && claimData.contactPhone;
    return true;
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">File Insurance Claim</h1>
          <p className="text-gray-600 mt-1">Quick and easy claim filing process</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                s < step ? 'bg-green-600 text-white' : s === step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 4 && <div className={`w-16 h-1 ${s < step ? 'bg-green-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Policy Details */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Policy Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Policy Number *</Label>
                <Input
                  value={claimData.policyNumber}
                  onChange={(e) => setClaimData({...claimData, policyNumber: e.target.value})}
                  placeholder="Enter your policy number"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Insurance Company *</Label>
                <Select value={claimData.insuranceCompany} onValueChange={(v) => setClaimData({...claimData, insuranceCompany: v})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select insurance company" />
                  </SelectTrigger>
                  <SelectContent>
                    {insuranceCompanies.map(company => (
                      <SelectItem key={company} value={company}>{company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Policy Type *</Label>
                <Select value={claimData.policyType} onValueChange={(v) => setClaimData({...claimData, policyType: v})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select policy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                    <SelectItem value="third-party">Third Party</SelectItem>
                    <SelectItem value="own-damage">Own Damage Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Your policy details will be auto-filled from your document vault if available.
                </p>
              </div>

              <Button onClick={handleNext} disabled={!isStepValid()} className="w-full">
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Incident Details */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Incident Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Type of Incident *</Label>
                <Select value={claimData.incidentType} onValueChange={(v) => setClaimData({...claimData, incidentType: v})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    {incidentTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date of Incident *</Label>
                  <Input
                    type="date"
                    value={claimData.incidentDate}
                    onChange={(e) => setClaimData({...claimData, incidentDate: e.target.value})}
                    max={new Date().toISOString().split('T')[0]}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Time of Incident</Label>
                  <Input
                    type="time"
                    value={claimData.incidentTime}
                    onChange={(e) => setClaimData({...claimData, incidentTime: e.target.value})}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>Location of Incident *</Label>
                <Input
                  value={claimData.incidentLocation}
                  onChange={(e) => setClaimData({...claimData, incidentLocation: e.target.value})}
                  placeholder="Enter exact location"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Describe the Incident</Label>
                <Textarea
                  value={claimData.incidentDescription}
                  onChange={(e) => setClaimData({...claimData, incidentDescription: e.target.value})}
                  placeholder="Provide detailed description of what happened..."
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="police"
                    checked={claimData.policeReported}
                    onCheckedChange={(checked) => setClaimData({...claimData, policeReported: checked})}
                  />
                  <Label htmlFor="police" className="cursor-pointer">
                    Police complaint filed (FIR)
                  </Label>
                </div>

                {claimData.policeReported && (
                  <div>
                    <Label>FIR Number</Label>
                    <Input
                      value={claimData.firNumber}
                      onChange={(e) => setClaimData({...claimData, firNumber: e.target.value})}
                      placeholder="Enter FIR number"
                      className="mt-2"
                    />
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>Important:</strong> FIR is mandatory for accidents involving injuries, theft, or third-party damage.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!isStepValid()} className="flex-1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Damage Details */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Damage Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-3 block">Select Damaged Parts *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {damageTypes.map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={claimData.damageType.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setClaimData({...claimData, damageType: [...claimData.damageType, type]});
                          } else {
                            setClaimData({...claimData, damageType: claimData.damageType.filter(t => t !== type)});
                          }
                        }}
                      />
                      <Label htmlFor={type} className="cursor-pointer font-normal">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Estimated Damage Cost (₹) *</Label>
                <Input
                  type="number"
                  value={claimData.estimatedDamageCost}
                  onChange={(e) => setClaimData({...claimData, estimatedDamageCost: e.target.value})}
                  placeholder="Enter estimated cost"
                  className="mt-2"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="thirdparty"
                    checked={claimData.thirdPartyInvolved}
                    onCheckedChange={(checked) => setClaimData({...claimData, thirdPartyInvolved: checked})}
                  />
                  <Label htmlFor="thirdparty" className="cursor-pointer">
                    Third party vehicle/property involved
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="injuries"
                    checked={claimData.injuries}
                    onCheckedChange={(checked) => setClaimData({...claimData, injuries: checked})}
                  />
                  <Label htmlFor="injuries" className="cursor-pointer">
                    Personal injuries sustained
                  </Label>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Upload Damage Photos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 cursor-pointer">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">Upload multiple photos from different angles</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!isStepValid()} className="flex-1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Claim Processing */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Step 4: Claim Processing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Claim Type *</Label>
                <RadioGroup value={claimData.claimType} onValueChange={(v) => setClaimData({...claimData, claimType: v})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cashless" id="cashless" />
                    <Label htmlFor="cashless" className="cursor-pointer">
                      Cashless Claim (Network Garage)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reimbursement" id="reimbursement" />
                    <Label htmlFor="reimbursement" className="cursor-pointer">
                      Reimbursement (Own Garage)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Preferred Garage</Label>
                <Select value={claimData.preferredGarage} onValueChange={(v) => setClaimData({...claimData, preferredGarage: v})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select garage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kb-central">KB Car Clinic - Central</SelectItem>
                    <SelectItem value="autocare">AutoCare Hub</SelectItem>
                    <SelectItem value="express">Express Repair</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Details for Updates</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      value={claimData.contactName}
                      onChange={(e) => setClaimData({...claimData, contactName: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Phone Number *</Label>
                      <Input
                        value={claimData.contactPhone}
                        onChange={(e) => setClaimData({...claimData, contactPhone: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={claimData.contactEmail}
                        onChange={(e) => setClaimData({...claimData, contactEmail: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  ✓ All required documents from your vault will be automatically attached
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={!isStepValid()} className="flex-1 bg-green-600 hover:bg-green-700">
                  Submit Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <Card className="text-center">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Claim Submitted Successfully!</h2>
              <p className="text-gray-600 mb-2">Claim Reference Number</p>
              <p className="text-3xl font-bold text-blue-600 mb-6">CLM-{Date.now().toString().slice(-8)}</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-bold text-gray-900 mb-4">What Happens Next?</h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span>Insurance company will review your claim within 24-48 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span>Surveyor will be appointed for damage assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>You'll receive approval notification via SMS/WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">4.</span>
                    <span>Proceed with repairs at selected garage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">5.</span>
                    <span>Settlement typically completes in 7-15 days</span>
                  </li>
                </ol>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.location.href = '/dashboard'}>
                  Back to Dashboard
                </Button>
                <Button variant="outline">
                  Track Claim Status
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InsuranceClaim;
