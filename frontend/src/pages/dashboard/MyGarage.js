import React, { useState } from 'react';
import { Plus, Car as CarIcon, Edit, Trash2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';

const vehicleTypes = ['Car', 'Bike', 'SUV', 'Commercial Vehicle'];
const carBrands = [
  'Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota', 
  'Kia', 'MG', 'Volkswagen', 'Skoda', 'Renault', 'Nissan', 'Ford', 'Other'
];

const MyGarage = () => {
  const { vehicles, addVehicle, selectedVehicle, setSelectedVehicle } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    vehicleType: '',
    brand: '',
    model: '',
    year: '',
    number: '',
    fuelType: '',
    mileage: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicle(formData);
    setDialogOpen(false);
    setFormData({
      vehicleType: '',
      brand: '',
      model: '',
      year: '',
      number: '',
      fuelType: '',
      mileage: ''
    });
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Garage</h1>
            <p className="text-gray-600 mt-1">Manage all your vehicles in one place</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 w-4 h-4" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Vehicle Type *</Label>
                    <Select value={formData.vehicleType} onValueChange={(v) => setFormData({...formData, vehicleType: v})}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Brand *</Label>
                    <Select value={formData.brand} onValueChange={(v) => setFormData({...formData, brand: v})}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {carBrands.map(brand => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Model *</Label>
                    <Input
                      className="mt-2"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      placeholder="e.g., Swift, City"
                      required
                    />
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Input
                      className="mt-2"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      placeholder="2020"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Vehicle Number</Label>
                    <Input
                      className="mt-2"
                      value={formData.number}
                      onChange={(e) => setFormData({...formData, number: e.target.value})}
                      placeholder="DL01AB1234"
                    />
                  </div>
                  <div>
                    <Label>Fuel Type</Label>
                    <Select value={formData.fuelType} onValueChange={(v) => setFormData({...formData, fuelType: v})}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select fuel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="CNG">CNG</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Current Mileage (km)</Label>
                  <Input
                    className="mt-2"
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                    placeholder="50000"
                  />
                </div>

                <Button type="submit" className="w-full">Add Vehicle</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {vehicles.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <CarIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles added yet</h3>
              <p className="text-gray-600 mb-6">Start by adding your first vehicle to manage services</p>
              <Button onClick={() => setDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 w-4 h-4" />
                Add Your First Vehicle
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => {
              const isSelected = selectedVehicle?.id === vehicle.id;
              return (
                <Card 
                  key={vehicle.id}
                  className={`relative cursor-pointer transition-all hover:shadow-lg ${
                    isSelected ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => handleSelectVehicle(vehicle)}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-4">
                      <CarIcon className="w-20 h-20 text-blue-900" />
                    </div>
                    <CardTitle className="text-center">
                      {vehicle.brand} {vehicle.model}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-semibold">{vehicle.vehicleType}</span>
                      </div>
                      {vehicle.year && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Year:</span>
                          <span className="font-semibold">{vehicle.year}</span>
                        </div>
                      )}
                      {vehicle.number && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Number:</span>
                          <span className="font-semibold">{vehicle.number}</span>
                        </div>
                      )}
                      {vehicle.fuelType && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fuel:</span>
                          <Badge variant="outline">{vehicle.fuelType}</Badge>
                        </div>
                      )}
                      {vehicle.mileage && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mileage:</span>
                          <span className="font-semibold">{vehicle.mileage} km</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyGarage;
