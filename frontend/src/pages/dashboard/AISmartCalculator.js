import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Upload, Camera, Car, Wrench, MapPin, Star, Clock, 
  CheckCircle2, ArrowRight, Sparkles, TrendingDown, Shield,
  ChevronDown, ChevronUp, Phone, IndianRupee, Zap, Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';

const AISmartCalculator = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [expandedPart, setExpandedPart] = useState(null);
  
  const [formData, setFormData] = useState({
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    fuelType: '',
    problemDescription: '',
    photos: [],
    urgency: 'normal'
  });

  // AI Generated Results (Mock)
  const [aiResults, setAiResults] = useState(null);

  const vehicleBrands = ['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota', 'Kia', 'MG', 'Volkswagen', 'Skoda'];
  
  const modelsByBrand = {
    'Maruti Suzuki': ['Swift', 'Baleno', 'Brezza', 'Ertiga', 'Dzire', 'Alto', 'WagonR', 'Celerio'],
    'Hyundai': ['Creta', 'Venue', 'i20', 'Verna', 'Tucson', 'Alcazar', 'Aura'],
    'Tata': ['Nexon', 'Punch', 'Harrier', 'Safari', 'Altroz', 'Tiago', 'Tigor'],
    'Mahindra': ['XUV700', 'Scorpio', 'Thar', 'XUV300', 'Bolero', 'XUV400'],
    'Honda': ['City', 'Amaze', 'Elevate', 'WR-V'],
    'Toyota': ['Innova', 'Fortuner', 'Glanza', 'Urban Cruiser', 'Camry'],
    'Kia': ['Seltos', 'Sonet', 'Carens', 'EV6'],
    'MG': ['Hector', 'Astor', 'ZS EV', 'Gloster'],
    'Volkswagen': ['Taigun', 'Virtus', 'Tiguan'],
    'Skoda': ['Kushaq', 'Slavia', 'Kodiaq']
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      name: file.name,
      preview: URL.createObjectURL(file),
      size: file.size
    }));
    setFormData({ ...formData, photos: [...formData.photos, ...newPhotos] });
  };

  const removePhoto = (index) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: newPhotos });
  };

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setAiResults({
        diagnosis: {
          primary: 'Brake Pad Wear & Rotor Damage',
          confidence: 94,
          severity: 'Medium',
          description: 'Based on your description and uploaded images, the AI has detected significant brake pad wear and possible rotor scoring. Immediate attention recommended.'
        },
        estimatedCost: {
          low: 3500,
          average: 5200,
          high: 7800,
          laborIncluded: true
        },
        parts: [
          {
            id: 1,
            name: 'Front Brake Pads (Set)',
            category: 'Best Value',
            brand: 'Brembo',
            price: 2499,
            rating: 4.8,
            warranty: '2 Years',
            inStock: true,
            aiRecommended: true
          },
          {
            id: 2,
            name: 'Front Brake Pads (Set)',
            category: 'Budget Friendly',
            brand: 'Bosch',
            price: 1799,
            rating: 4.5,
            warranty: '1 Year',
            inStock: true,
            aiRecommended: false
          },
          {
            id: 3,
            name: 'Front Brake Pads (Set)',
            category: 'Economy',
            brand: 'Generic OEM',
            price: 999,
            rating: 3.9,
            warranty: '6 Months',
            inStock: true,
            aiRecommended: false
          },
          {
            id: 4,
            name: 'Brake Rotor (Per Piece)',
            category: 'Premium',
            brand: 'Brembo',
            price: 3999,
            rating: 4.9,
            warranty: '3 Years',
            inStock: true,
            aiRecommended: true
          },
          {
            id: 5,
            name: 'Brake Rotor (Per Piece)',
            category: 'Standard',
            brand: 'Bosch',
            price: 2499,
            rating: 4.4,
            warranty: '2 Years',
            inStock: true,
            aiRecommended: false
          }
        ],
        garages: [
          {
            id: 1,
            name: 'KB Car Clinic - Central',
            distance: '1.2 km',
            rating: 4.8,
            reviews: 342,
            priceCategory: 'Premium',
            waitTime: '30 mins',
            specialization: 'Multi-brand Expert',
            aiMatch: 98,
            features: ['Cashless Insurance', 'Genuine Parts', 'AC Waiting Area']
          },
          {
            id: 2,
            name: 'Budget Auto Care',
            distance: '2.5 km',
            rating: 4.3,
            reviews: 186,
            priceCategory: 'Budget',
            waitTime: '1 hour',
            specialization: 'Cost-effective repairs',
            aiMatch: 85,
            features: ['Lowest Prices', 'Quick Service']
          },
          {
            id: 3,
            name: 'Express Service Hub',
            distance: '1.8 km',
            rating: 4.6,
            reviews: 256,
            priceCategory: 'Mid-Range',
            waitTime: '45 mins',
            specialization: 'Fast turnaround',
            aiMatch: 91,
            features: ['Same Day Service', 'Pick & Drop']
          }
        ],
        additionalServices: [
          { name: 'Brake Fluid Change', price: 499, recommended: true },
          { name: 'Wheel Alignment Check', price: 299, recommended: true },
          { name: 'Full Brake Inspection', price: 199, recommended: false }
        ]
      });
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setStep(3);
    }, 3000);
  };

  const isStep1Valid = formData.vehicleBrand && formData.vehicleModel && formData.vehicleYear;
  const isStep2Valid = formData.problemDescription.length > 10;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Smart Calculator</h1>
                <p className="text-gray-600">Get AI-powered repair estimates, parts & garage recommendations</p>
              </div>
            </div>
          </div>
          <Badge className="bg-purple-100 text-purple-700 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by AI
          </Badge>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2">
          {[
            { num: 1, label: 'Vehicle Info' },
            { num: 2, label: 'Problem Details' },
            { num: 3, label: 'AI Results' }
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step > s.num ? 'bg-green-600 text-white' : 
                  step === s.num ? 'bg-blue-600 text-white' : 
                  'bg-gray-200 text-gray-500'
                }`}>
                  {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                </div>
                <span className="text-xs mt-1 text-gray-600">{s.label}</span>
              </div>
              {idx < 2 && <div className={`w-24 h-1 mx-2 ${step > s.num ? 'bg-green-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Vehicle Information */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" />
                Step 1: Tell us about your vehicle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Vehicle Brand *</Label>
                  <Select value={formData.vehicleBrand} onValueChange={(v) => setFormData({...formData, vehicleBrand: v, vehicleModel: ''})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleBrands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Vehicle Model *</Label>
                  <Select 
                    value={formData.vehicleModel} 
                    onValueChange={(v) => setFormData({...formData, vehicleModel: v})}
                    disabled={!formData.vehicleBrand}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {(modelsByBrand[formData.vehicleBrand] || []).map(model => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Manufacturing Year *</Label>
                  <Select value={formData.vehicleYear} onValueChange={(v) => setFormData({...formData, vehicleYear: v})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 15}, (_, i) => 2025 - i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Fuel Type</Label>
                  <Select value={formData.fuelType} onValueChange={(v) => setFormData({...formData, fuelType: v})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="cng">CNG</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700" 
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
              >
                Continue to Problem Details
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Problem Description & Photos */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-orange-600" />
                Step 2: Describe the problem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>What issue are you facing? *</Label>
                <Textarea
                  value={formData.problemDescription}
                  onChange={(e) => setFormData({...formData, problemDescription: e.target.value})}
                  placeholder="Describe your vehicle problem in detail. For example: 'Grinding noise when braking, especially at low speeds. Brake pedal feels soft and car pulls to one side when braking.'"
                  rows={4}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 10 characters. More details = better AI analysis</p>
              </div>

              <div>
                <Label>Urgency Level</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {[
                    { value: 'low', label: 'Can Wait', color: 'bg-green-100 border-green-300 text-green-700' },
                    { value: 'normal', label: 'Soon', color: 'bg-yellow-100 border-yellow-300 text-yellow-700' },
                    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 border-red-300 text-red-700' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setFormData({...formData, urgency: opt.value})}
                      className={`p-3 rounded-lg border-2 text-center font-medium transition-all ${
                        formData.urgency === opt.value 
                          ? opt.color + ' ring-2 ring-offset-2 ring-blue-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Upload Photos (Optional but Recommended)
                </Label>
                <p className="text-xs text-gray-500 mb-3">Photos help AI provide more accurate estimates</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click or drag photos here</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB each</p>
                </div>

                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {formData.photos.map((photo, idx) => (
                      <div key={idx} className="relative group">
                        <img 
                          src={photo.preview} 
                          alt={`Upload ${idx + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(idx)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={runAIAnalysis}
                  disabled={!isStep2Valid}
                >
                  <Brain className="mr-2 w-5 h-5" />
                  Analyze with AI
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Analyzing Screen */}
        {isAnalyzing && (
          <Card className="text-center py-16">
            <CardContent>
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Brain className="w-12 h-12 text-white animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">AI is Analyzing...</h2>
              <p className="text-gray-600 mb-6">Processing your vehicle details and images</p>
              <div className="max-w-md mx-auto space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Analyzing problem description</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-gray-700">Matching with repair database</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  <span className="text-sm text-gray-500">Finding best parts & garages</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: AI Results */}
        {step === 3 && aiResults && (
          <div className="space-y-6">
            {/* AI Diagnosis Summary */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    AI Diagnosis Result
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {aiResults.diagnosis.confidence}% Confidence
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{aiResults.diagnosis.primary}</h3>
                    <Badge className={`mt-2 ${
                      aiResults.diagnosis.severity === 'High' ? 'bg-red-100 text-red-700' :
                      aiResults.diagnosis.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {aiResults.diagnosis.severity} Severity
                    </Badge>
                  </div>
                  <p className="text-gray-600">{aiResults.diagnosis.description}</p>
                  
                  {/* Cost Range */}
                  <div className="bg-white rounded-xl p-6 border">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-green-600" />
                      Estimated Cost Range
                    </h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">₹{aiResults.estimatedCost.low.toLocaleString()}</p>
                        <p className="text-xs text-gray-600 mt-1">Budget Option</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
                        <p className="text-2xl font-bold text-blue-600">₹{aiResults.estimatedCost.average.toLocaleString()}</p>
                        <p className="text-xs text-gray-600 mt-1">Recommended</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">₹{aiResults.estimatedCost.high.toLocaleString()}</p>
                        <p className="text-xs text-gray-600 mt-1">Premium Option</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">* Includes parts + labor charges</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommended Parts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-blue-600" />
                  AI Recommended Parts (Best to Budget)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiResults.parts.map((part) => (
                    <div 
                      key={part.id}
                      className={`border rounded-xl overflow-hidden transition-all ${
                        part.aiRecommended ? 'border-green-300 bg-green-50' : 'border-gray-200'
                      }`}
                    >
                      <div 
                        className="p-4 cursor-pointer"
                        onClick={() => setExpandedPart(expandedPart === part.id ? null : part.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {part.aiRecommended && (
                              <Badge className="bg-green-600 text-white">
                                <Award className="w-3 h-3 mr-1" />
                                AI Pick
                              </Badge>
                            )}
                            <Badge variant="outline">{part.category}</Badge>
                            <span className="font-semibold text-gray-900">{part.name}</span>
                            <span className="text-gray-500">by {part.brand}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xl font-bold text-gray-900">₹{part.price.toLocaleString()}</p>
                              <div className="flex items-center gap-1 text-sm">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{part.rating}</span>
                              </div>
                            </div>
                            {expandedPart === part.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>
                      
                      {expandedPart === part.id && (
                        <div className="px-4 pb-4 border-t bg-white">
                          <div className="grid grid-cols-3 gap-4 py-4 text-sm">
                            <div>
                              <p className="text-gray-500">Warranty</p>
                              <p className="font-semibold">{part.warranty}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Availability</p>
                              <p className="font-semibold text-green-600">{part.inStock ? 'In Stock' : 'Out of Stock'}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Brand Rating</p>
                              <p className="font-semibold flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                {part.rating}/5
                              </p>
                            </div>
                          </div>
                          <Button className="w-full" size="sm">
                            Add to Estimate
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommended Garages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  AI Matched Garages Near You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiResults.garages.map((garage, idx) => (
                    <div 
                      key={garage.id}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        idx === 0 ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            {idx === 0 && (
                              <Badge className="bg-green-600 text-white">
                                <Zap className="w-3 h-3 mr-1" />
                                Best Match
                              </Badge>
                            )}
                            <h3 className="font-bold text-gray-900">{garage.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{garage.specialization}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="font-bold text-purple-600">{garage.aiMatch}% Match</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-3 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{garage.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{garage.rating} ({garage.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{garage.waitTime}</span>
                        </div>
                        <div>
                          <Badge variant="outline" className={
                            garage.priceCategory === 'Budget' ? 'border-green-500 text-green-700' :
                            garage.priceCategory === 'Premium' ? 'border-purple-500 text-purple-700' :
                            'border-blue-500 text-blue-700'
                          }>
                            {garage.priceCategory}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {garage.features.map((feature, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1" variant={idx === 0 ? 'default' : 'outline'}>
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                        <Button className="flex-1" onClick={() => navigate('/dashboard/booking')}>
                          Book Service
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Services */}
            <Card>
              <CardHeader>
                <CardTitle>AI Also Recommends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {aiResults.additionalServices.map((service, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border ${service.recommended ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{service.name}</span>
                        <span className="font-bold">₹{service.price}</span>
                      </div>
                      {service.recommended && (
                        <p className="text-xs text-green-600 mt-1">Recommended with your repair</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => { setStep(1); setAnalysisComplete(false); setAiResults(null); }}>
                Start New Analysis
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => navigate('/dashboard/booking')}>
                Proceed to Book Service
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AISmartCalculator;
