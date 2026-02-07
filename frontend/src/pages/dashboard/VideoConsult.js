import React, { useState } from 'react';
import { Video, Calendar, Clock, User, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';

const experts = [
  { id: 1, name: 'Rajesh Kumar', specialization: 'Engine Expert', rating: 4.9, experience: '15 years', available: true },
  { id: 2, name: 'Amit Sharma', specialization: 'Electronics Specialist', rating: 4.8, experience: '12 years', available: true },
  { id: 3, name: 'Suresh Patel', specialization: 'All-rounder Mechanic', rating: 4.7, experience: '10 years', available: true },
  { id: 4, name: 'Vikram Singh', specialization: 'Suspension & Brakes', rating: 4.8, experience: '13 years', available: false }
];

const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

const VideoConsult = () => {
  const [step, setStep] = useState(1);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [issue, setIssue] = useState('');

  const handleBooking = () => {
    setStep(4);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Video Consultation</h1>
          <p className="text-gray-600 mt-1">Get expert advice from certified mechanics via video call</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-1 ${s < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Expert */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Select an Expert</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experts.filter(e => e.available).map(expert => (
                <Card
                  key={expert.id}
                  className={`cursor-pointer transition-all ${
                    selectedExpert?.id === expert.id ? 'ring-2 ring-blue-600' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedExpert(expert)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{expert.name}</h3>
                        <p className="text-sm text-gray-600">{expert.specialization}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge>★ {expert.rating}</Badge>
                          <span className="text-xs text-gray-600">{expert.experience}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              onClick={() => setStep(2)}
              disabled={!selectedExpert}
              className="w-full h-12"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setStep(1)}>← Back</Button>
            <h2 className="text-2xl font-bold text-gray-900">Select Date & Time</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date > new Date(Date.now() + 14*24*60*60*1000)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Select Time Slot</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 border-2 rounded-lg font-semibold transition-all ${
                          selectedTime === time
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button
              onClick={() => setStep(3)}
              disabled={!selectedTime}
              className="w-full h-12"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 3: Describe Issue */}
        {step === 3 && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setStep(2)}>← Back</Button>
            <h2 className="text-2xl font-bold text-gray-900">Describe Your Issue</h2>
            
            <Card>
              <CardContent className="p-6">
                <Select value={issue} onValueChange={setIssue}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engine">Engine Problems</SelectItem>
                    <SelectItem value="brakes">Brake Issues</SelectItem>
                    <SelectItem value="ac">AC Not Working</SelectItem>
                    <SelectItem value="electrical">Electrical Problems</SelectItem>
                    <SelectItem value="noise">Strange Noises</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consultation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Expert</span>
                  <span className="font-semibold">{selectedExpert?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold">{selectedDate.toDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-semibold">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">30 minutes</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-lg font-bold">Consultation Fee</span>
                  <span className="text-2xl font-bold text-blue-600">₹299</span>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleBooking}
              disabled={!issue}
              className="w-full h-12 bg-green-600 hover:bg-green-700"
            >
              Confirm Booking
            </Button>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <Card className="text-center">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Your video consultation with {selectedExpert?.name} is scheduled for<br />
                <strong>{selectedDate.toDateString()} at {selectedTime}</strong>
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  You'll receive a video call link via SMS and WhatsApp 15 minutes before your scheduled time.
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.location.href = '/dashboard'}>
                  Back to Dashboard
                </Button>
                <Button variant="outline">
                  Add to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VideoConsult;
