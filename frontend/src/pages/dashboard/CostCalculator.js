import React, { useState } from 'react';
import { Calculator, Plus, Trash2, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';

const serviceCatalog = {
  'Engine': [
    { id: 'oil-change', name: 'Engine Oil Change', price: 899 },
    { id: 'oil-filter', name: 'Oil Filter Replacement', price: 299 },
    { id: 'air-filter', name: 'Air Filter Replacement', price: 399 },
    { id: 'spark-plugs', name: 'Spark Plugs (Set of 4)', price: 799 }
  ],
  'Brakes': [
    { id: 'brake-pads-front', name: 'Brake Pads - Front', price: 1499 },
    { id: 'brake-pads-rear', name: 'Brake Pads - Rear', price: 1299 },
    { id: 'brake-fluid', name: 'Brake Fluid Change', price: 499 }
  ],
  'AC': [
    { id: 'ac-gas', name: 'AC Gas Refill', price: 1299 },
    { id: 'ac-filter', name: 'AC Filter Cleaning', price: 349 },
    { id: 'ac-compressor', name: 'AC Compressor Service', price: 2499 }
  ],
  'Electrical': [
    { id: 'battery', name: 'Battery Replacement', price: 4499 },
    { id: 'alternator', name: 'Alternator Check', price: 599 }
  ],
  'Tires': [
    { id: 'tire-rotation', name: 'Tire Rotation', price: 499 },
    { id: 'wheel-alignment', name: 'Wheel Alignment', price: 799 },
    { id: 'wheel-balancing', name: 'Wheel Balancing', price: 599 }
  ]
};

const CostCalculator = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [laborCharges, setLaborCharges] = useState(500);

  const addService = (categoryServices, serviceId) => {
    const service = categoryServices.find(s => s.id === serviceId);
    if (service && !selectedServices.find(s => s.id === serviceId)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (serviceId) => {
    setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
  };

  const resetCalculator = () => {
    setSelectedServices([]);
    setLaborCharges(500);
  };

  const partsTotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const subtotal = partsTotal + laborCharges;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cost Calculator</h1>
            <p className="text-gray-600 mt-1">Estimate your service costs before booking</p>
          </div>
          <Button variant="outline" onClick={resetCalculator}>
            <RotateCcw className="mr-2 w-4 h-4" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Service Selection */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(serviceCatalog).map(([category, services]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category} Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {services.map(service => {
                      const isAdded = selectedServices.find(s => s.id === service.id);
                      return (
                        <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-900">{service.name}</p>
                            <p className="text-sm text-gray-600">₹{service.price}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => isAdded ? removeService(service.id) : addService(services, service.id)}
                            className={isAdded ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
                          >
                            {isAdded ? <Trash2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cost Summary - Sticky */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Cost Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Selected Services ({selectedServices.length})
                  </label>
                  {selectedServices.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No services selected</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedServices.map(service => (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">{service.name}</span>
                          <span className="font-semibold">₹{service.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Parts Total</span>
                    <span className="font-semibold">₹{partsTotal}</span>
                  </div>
                  
                  <div className="mb-2">
                    <label className="text-sm text-gray-700 mb-1 block">Labor Charges</label>
                    <Input
                      type="number"
                      value={laborCharges}
                      onChange={(e) => setLaborCharges(Number(e.target.value))}
                      className="h-10"
                    />
                  </div>

                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between mb-4">
                    <span className="text-gray-700">GST (18%)</span>
                    <span className="font-semibold">₹{gst}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Grand Total</span>
                    <span className="text-2xl font-bold text-blue-600">₹{grandTotal}</span>
                  </div>
                </div>

                <Button className="w-full h-12 bg-green-600 hover:bg-green-700 mt-4" disabled={selectedServices.length === 0}>
                  Proceed to Book
                </Button>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-gray-700">
                  <p className="font-semibold mb-1">💡 Note:</p>
                  <p>Final costs may vary based on vehicle make/model and actual condition. This is an estimate.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CostCalculator;
