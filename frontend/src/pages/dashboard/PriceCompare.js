import React, { useState } from 'react';
import { TrendingUp, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';

const services = [
  { id: 'oil-change', name: 'Engine Oil Change', category: 'Maintenance' },
  { id: 'brake-service', name: 'Brake Pad Replacement', category: 'Brakes' },
  { id: 'ac-service', name: 'AC Gas Refill', category: 'AC' },
  { id: 'battery', name: 'Battery Replacement', category: 'Electrical' },
  { id: 'tire-rotation', name: 'Tire Rotation & Balancing', category: 'Tires' }
];

const garagesPricing = [
  { id: 1, name: 'KB Car Clinic', rating: 4.8, distance: '1.2 km', 
    prices: { 'oil-change': 899, 'brake-service': 2499, 'ac-service': 1299, 'battery': 4499, 'tire-rotation': 799 },
    features: ['Genuine Parts', '6 Month Warranty', 'Free Pickup']
  },
  { id: 2, name: 'AutoCare Hub', rating: 4.6, distance: '2.5 km',
    prices: { 'oil-change': 799, 'brake-service': 2299, 'ac-service': 1499, 'battery': 4299, 'tire-rotation': 699 },
    features: ['Fast Service', '3 Month Warranty', 'Doorstep Service']
  },
  { id: 3, name: 'Express Repair', rating: 4.7, distance: '3.1 km',
    prices: { 'oil-change': 849, 'brake-service': 2399, 'ac-service': 1199, 'battery': 4599, 'tire-rotation': 749 },
    features: ['Quality Parts', '1 Year Warranty', 'Free Inspection']
  },
  { id: 4, name: 'Premium Motors', rating: 4.8, distance: '2.8 km',
    prices: { 'oil-change': 999, 'brake-service': 2699, 'ac-service': 1399, 'battery': 4999, 'tire-rotation': 899 },
    features: ['Original Parts', '1 Year Warranty', 'Premium Service']
  }
];

const PriceCompare = () => {
  const [selectedService, setSelectedService] = useState('oil-change');
  const [sortBy, setSortBy] = useState('price');

  const selectedServiceName = services.find(s => s.id === selectedService)?.name;
  
  const sortedGarages = [...garagesPricing].sort((a, b) => {
    if (sortBy === 'price') return a.prices[selectedService] - b.prices[selectedService];
    if (sortBy === 'rating') return b.rating - a.rating;
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  const lowestPrice = Math.min(...sortedGarages.map(g => g.prices[selectedService]));
  const highestPrice = Math.max(...sortedGarages.map(g => g.prices[selectedService]));
  const avgPrice = Math.round(sortedGarages.reduce((sum, g) => sum + g.prices[selectedService], 0) / sortedGarages.length);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Price Comparison</h1>
          <p className="text-gray-600 mt-1">Compare prices across garages and save money</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Select Service</label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map(service => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Lowest Price</SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-1">Lowest Price</div>
              <div className="text-3xl font-bold text-green-600">₹{lowestPrice}</div>
              <div className="text-xs text-gray-500 mt-1">Save up to ₹{highestPrice - lowestPrice}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-1">Average Price</div>
              <div className="text-3xl font-bold text-blue-600">₹{avgPrice}</div>
              <div className="text-xs text-gray-500 mt-1">Market average</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-1">Highest Price</div>
              <div className="text-3xl font-bold text-red-600">₹{highestPrice}</div>
              <div className="text-xs text-gray-500 mt-1">Premium option</div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">{selectedServiceName} - Price Comparison</h2>
          {sortedGarages.map((garage, index) => (
            <Card key={garage.id} className={`${garage.prices[selectedService] === lowestPrice ? 'border-2 border-green-500' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{garage.name}</h3>
                      {garage.prices[selectedService] === lowestPrice && (
                        <Badge className="bg-green-500">Best Price</Badge>
                      )}
                      <Badge variant="outline">★ {garage.rating}</Badge>
                      <span className="text-sm text-gray-600">{garage.distance}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {garage.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          <Check className="w-3 h-3 mr-1 text-green-600" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ₹{garage.prices[selectedService]}
                    </div>
                    {garage.prices[selectedService] !== lowestPrice && (
                      <div className="text-sm text-red-600">
                        +₹{garage.prices[selectedService] - lowestPrice} more
                      </div>
                    )}
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Savings Tip */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">💡 Smart Savings Tip</h3>
                <p className="text-gray-700">
                  By choosing {sortedGarages[0].name}, you save ₹{highestPrice - lowestPrice} compared to the most expensive option. 
                  That's a {Math.round(((highestPrice - lowestPrice) / highestPrice) * 100)}% discount!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PriceCompare;
