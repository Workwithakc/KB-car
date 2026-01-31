import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

const servicePackages = [
  {
    id: 'basic',
    name: 'Basic Service',
    price: 1499,
    duration: '2 hours',
    includes: ['Engine Oil Change', 'Oil Filter Replacement', 'Basic Inspection', 'Tire Pressure Check']
  },
  {
    id: 'standard',
    name: 'Standard Service',
    price: 2999,
    duration: '3 hours',
    includes: ['All Basic Services', 'Air Filter Replacement', 'AC Filter Cleaning', 'Battery Check', 'Brake Inspection']
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive Service',
    price: 4999,
    duration: '4 hours',
    includes: ['All Standard Services', 'Wheel Alignment', 'Coolant Top-up', 'Full Car Wash', 'Interior Vacuum']
  }
];

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

const nearbyGarages = [
  { id: 1, name: 'KB Car Clinic - Central', distance: '1.2 km', rating: 4.8, address: 'MG Road' },
  { id: 2, name: 'AutoCare Service Center', distance: '2.5 km', rating: 4.6, address: 'Nehru Nagar' },
  { id: 3, name: 'Express Car Repair', distance: '3.1 km', rating: 4.7, address: 'Ring Road' }
];

const BookService = () => {
  const navigate = useNavigate();
  const { selectedVehicle, addServiceRecord, addNotification } = useApp();
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedGarage, setSelectedGarage] = useState(null);

  const handleBooking = () => {
    if (!selectedVehicle) {
      alert('Please select a vehicle first from My Garage');
      navigate('/dashboard/garage');
      return;
    }

    const booking = {
      vehicleId: selectedVehicle.id,
      vehicle: `${selectedVehicle.brand} ${selectedVehicle.model}`,
      package: servicePackages.find(p => p.id === selectedPackage),
      date: selectedDate.toDateString(),
      time: selectedTime,
      garage: nearbyGarages.find(g => g.id === selectedGarage),
      status: 'scheduled',
      cost: servicePackages.find(p => p.id === selectedPackage)?.price || 0
    };

    addServiceRecord(booking);
    addNotification({
      type: 'booking',
      title: 'Service Booked Successfully!',
      message: `Your ${booking.package.name} is scheduled for ${booking.date} at ${booking.time}`
    });

    navigate('/dashboard/confirmation-booking', { state: { booking } });
  };

  if (!selectedVehicle) {
    return (
      <DashboardLayout>
        <Card>
          <CardContent className="py-16 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">No Vehicle Selected</h3>
            <p className="text-gray-600 mb-6">Please add and select a vehicle first</p>
            <Button onClick={() => navigate('/dashboard/garage')}>Go to My Garage</Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book Service</h1>
          <p className="text-gray-600 mt-1">For {selectedVehicle.brand} {selectedVehicle.model}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 py-6">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 4 && <div className={`w-12 h-1 ${s < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Package */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Select Service Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicePackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedPackage === pkg.id ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-blue-600">₹{pkg.price}</span>
                      <span className="text-sm text-gray-600">({pkg.duration})</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              onClick={() => setStep(2)}
              disabled={!selectedPackage}
              className="w-full sm:w-auto"
            >
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Select Date & Time</h2>
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date > new Date(Date.now() + 30*24*60*60*1000)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Select Time Slot</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 border-2 rounded-lg text-sm font-semibold transition-all ${
                          selectedTime === time
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <Clock className="w-4 h-4 inline mr-2" />
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
              className="w-full sm:w-auto"
            >
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Step 3: Select Garage */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Select Garage</h2>
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
            </div>
            <div className="space-y-4">
              {nearbyGarages.map((garage) => (
                <Card
                  key={garage.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedGarage === garage.id ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => setSelectedGarage(garage.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{garage.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {garage.distance}
                          </span>
                          <Badge variant="secondary">★ {garage.rating}</Badge>
                          <span>{garage.address}</span>
                        </div>
                      </div>
                      {selectedGarage === garage.id && (
                        <Check className="w-8 h-8 text-blue-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              onClick={() => setStep(4)}
              disabled={!selectedGarage}
              className="w-full sm:w-auto"
            >
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Step 4: Confirm Booking */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Confirm Booking</h2>
              <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Vehicle</p>
                    <p className="font-semibold">{selectedVehicle.brand} {selectedVehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service Package</p>
                    <p className="font-semibold">{servicePackages.find(p => p.id === selectedPackage)?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold">{selectedDate.toDateString()} • {selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Garage</p>
                    <p className="font-semibold">{nearbyGarages.find(g => g.id === selectedGarage)?.name}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Amount</span>
                    <span className="text-blue-600">₹{servicePackages.find(p => p.id === selectedPackage)?.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button onClick={handleBooking} className="w-full bg-green-600 hover:bg-green-700 text-lg h-14">
              <Check className="mr-2 w-5 h-5" />
              Confirm Booking
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookService;
