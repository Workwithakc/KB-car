import React, { useState } from 'react';
import { Brain, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';

const symptoms = [
  { id: 'engine-noise', label: 'Strange engine noise', category: 'Engine' },
  { id: 'smoke', label: 'Smoke from exhaust', category: 'Engine' },
  { id: 'vibration', label: 'Excessive vibration', category: 'Engine' },
  { id: 'starting-issue', label: 'Difficulty starting', category: 'Electrical' },
  { id: 'warning-light', label: 'Check engine light on', category: 'Engine' },
  { id: 'brake-noise', label: 'Squeaking brakes', category: 'Brakes' },
  { id: 'ac-issue', label: 'AC not cooling', category: 'AC' },
  { id: 'steering', label: 'Steering wheel shaking', category: 'Steering' },
  { id: 'overheating', label: 'Engine overheating', category: 'Engine' },
  { id: 'fuel-economy', label: 'Poor fuel economy', category: 'Engine' },
];

const diagnoses = {
  'engine-noise,vibration': {
    issue: 'Engine Mount Problem',
    severity: 'Medium',
    description: 'Your engine mounts may be worn out, causing excessive vibration and noise.',
    solutions: ['Replace engine mounts', 'Inspect transmission mounts'],
    estimatedCost: '₹2,500 - ₹5,000',
    urgency: 'Schedule within 1 week'
  },
  'starting-issue,warning-light': {
    issue: 'Battery or Alternator Issue',
    severity: 'High',
    description: 'Your battery might be weak or alternator failing, causing starting problems.',
    solutions: ['Battery load test', 'Alternator inspection', 'Check battery terminals'],
    estimatedCost: '₹1,500 - ₹6,000',
    urgency: 'Immediate attention needed'
  },
  'brake-noise': {
    issue: 'Brake Pad Wear',
    severity: 'High',
    description: 'Brake pads are likely worn and need replacement to ensure safety.',
    solutions: ['Replace brake pads', 'Inspect rotors', 'Brake fluid check'],
    estimatedCost: '₹2,000 - ₹4,000',
    urgency: 'Schedule within 2-3 days'
  },
  'ac-issue': {
    issue: 'AC Gas Leak or Compressor Issue',
    severity: 'Low',
    description: 'AC refrigerant may be low or compressor might need servicing.',
    solutions: ['AC gas refill', 'Compressor check', 'AC filter cleaning'],
    estimatedCost: '₹1,200 - ₹8,000',
    urgency: 'Non-urgent, can schedule flexibly'
  }
};

const AIDiagnosis = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const analyzeSy

mptoms = () => {
    setAnalyzing(true);
    setTimeout(() => {
      // Simple matching logic
      const key = selectedSymptoms.sort().join(',');
      const matchedDiagnosis = diagnoses[key] || diagnoses[selectedSymptoms[0]] || {
        issue: 'Multiple Issues Detected',
        severity: 'Medium',
        description: 'Based on your symptoms, we recommend a comprehensive inspection.',
        solutions: ['Full vehicle inspection', 'Diagnostic scan'],
        estimatedCost: '₹500 - ₹1,500',
        urgency: 'Schedule within 1 week'
      };
      setDiagnosis(matchedDiagnosis);
      setAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity) => {
    if (severity === 'High') return 'bg-red-500';
    if (severity === 'Medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Diagnosis</h1>
            <p className="text-gray-600 mt-1">Smart symptom analysis powered by AI</p>
          </div>
        </div>

        {!diagnosis ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>What symptoms are you experiencing?</CardTitle>
                <p className="text-sm text-gray-600">Select all that apply</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {symptoms.map(symptom => (
                    <div key={symptom.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <Checkbox
                        id={symptom.id}
                        checked={selectedSymptoms.includes(symptom.id)}
                        onCheckedChange={() => toggleSymptom(symptom.id)}
                      />
                      <Label htmlFor={symptom.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{symptom.label}</div>
                        <Badge variant="outline" className="text-xs mt-1">{symptom.category}</Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={analyzeSy mptoms}
              disabled={selectedSymptoms.length === 0 || analyzing}
              className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {analyzing ? (
                <>
                  <Brain className="mr-2 w-5 h-5 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze with AI
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Diagnosis Result</CardTitle>
                  <Badge className={`${getSeverityColor(diagnosis.severity)} text-white`}>
                    {diagnosis.severity} Priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{diagnosis.issue}</h3>
                  <p className="text-gray-700">{diagnosis.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Recommended Solutions
                  </h4>
                  <ul className="space-y-2">
                    {diagnosis.solutions.map((solution, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600">•</span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Estimated Cost</p>
                    <p className="text-xl font-bold text-blue-600">{diagnosis.estimatedCost}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Urgency</p>
                    <p className="font-semibold text-gray-900">{diagnosis.urgency}</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">Disclaimer</p>
                    <p>This is an AI-powered preliminary diagnosis. For accurate assessment, please book an inspection with a certified mechanic.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setDiagnosis(null);
                  setSelectedSymptoms([]);
                }}
                variant="outline"
                className="flex-1"
              >
                New Diagnosis
              </Button>
              <Button
                onClick={() => window.location.href = '/dashboard/booking'}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Book Service Now
              </Button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AIDiagnosis;
