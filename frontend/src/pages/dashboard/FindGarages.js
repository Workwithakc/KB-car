import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Star, Filter, Search, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';
import { allGarages } from '@/data/garages';

const FindGarages = () => {
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');

  // Add open/closed status to garages (randomly for demo)
  const garagesWithStatus = allGarages.map((garage, idx) => ({
    ...garage,
    isOpen: idx % 3 !== 2, // 2 out of 3 are open
    coordinates: {
      x: 15 + (idx * 8) % 60 + Math.random() * 10,
      y: 20 + (idx * 12) % 50 + Math.random() * 10
    }
  }));

  const filteredGarages = garagesWithStatus
    .filter(g => filterStatus === 'all' || (filterStatus === 'open' ? g.isOpen : !g.isOpen))
    .filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Find Nearby Garages</h1>
          <p className="text-gray-600 mt-1">Locate garages near you with real-time availability</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{garagesWithStatus.length}</div>
                  <div className="text-xs text-gray-600">Total Garages</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{garagesWithStatus.filter(g => g.isOpen).length}</div>
                  <div className="text-xs text-gray-600">Open Now</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{garagesWithStatus.filter(g => !g.isOpen).length}</div>
                  <div className="text-xs text-gray-600">Closed</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">4.7</div>
                  <div className="text-xs text-gray-600">Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search garages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Garages</SelectItem>
                  <SelectItem value="open">Open Now</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Nearest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mock Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Map View
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 h-[500px] overflow-hidden">
                  {/* Mock Map Background */}
                  <svg className="absolute inset-0 w-full h-full opacity-20">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>

                  {/* Mock Roads */}
                  <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-300"></div>
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300"></div>
                  <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gray-200"></div>
                  <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gray-200"></div>

                  {/* Your Location - Center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative">
                      <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        You
                      </div>
                      {/* Pulse Effect */}
                      <div className="absolute top-0 left-0 w-6 h-6 bg-blue-400 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  {/* Garage Markers */}
                  {filteredGarages.map((garage) => {
                    const isSelected = selectedGarage?.id === garage.id;
                    return (
                      <div
                        key={garage.id}
                        className="absolute z-10 cursor-pointer transform transition-all duration-300 hover:scale-125"
                        style={{
                          left: `${garage.coordinates.x}%`,
                          top: `${garage.coordinates.y}%`,
                          transform: isSelected ? 'scale(1.3)' : 'scale(1)'
                        }}
                        onClick={() => setSelectedGarage(garage)}
                        onMouseEnter={() => setSelectedGarage(garage)}
                      >
                        {/* Marker Pin */}
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-3 border-white ${
                            garage.isOpen ? 'bg-green-500 animate-bounce' : 'bg-red-500'
                          } ${isSelected ? 'ring-4 ring-blue-400' : ''}`}>
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          
                          {/* Label */}
                          {isSelected && (
                            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-48 bg-white rounded-lg shadow-xl p-3 border-2 border-blue-400 animate-fadeIn">
                              <div className="text-xs font-bold text-gray-900 truncate">{garage.name}</div>
                              <div className="text-xs text-gray-600 mt-1">{garage.distance}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-semibold">{garage.rating}</span>
                                <Badge className={`ml-2 text-xs ${garage.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
                                  {garage.isOpen ? 'OPEN' : 'CLOSED'}
                                </Badge>
                              </div>
                            </div>
                          )}

                          {/* Distance Circle */}
                          {isSelected && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-blue-400 border-dashed rounded-full animate-ping-slow"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 space-y-2">
                    <div className="text-xs font-bold text-gray-900 mb-2">Legend</div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span className="text-xs text-gray-700">Your Location</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-700">Open Garage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-gray-700">Closed Garage</span>
                    </div>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button size="icon" className="bg-white text-gray-700 hover:bg-gray-100 shadow-lg">
                      +
                    </Button>
                    <Button size="icon" className="bg-white text-gray-700 hover:bg-gray-100 shadow-lg">
                      -
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Garage List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              {filteredGarages.length} Garages Found
            </h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {filteredGarages.map((garage) => {
                const isSelected = selectedGarage?.id === garage.id;
                return (
                  <Card
                    key={garage.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      isSelected ? 'ring-2 ring-blue-600 shadow-xl' : ''
                    }`}
                    onClick={() => setSelectedGarage(garage)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900 text-sm">{garage.name}</h3>
                        <Badge className={garage.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}>
                          {garage.isOpen ? 'OPEN' : 'CLOSED'}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <Navigation className="w-3 h-3 text-blue-600" />
                          <span className="font-semibold text-blue-600">{garage.distance}</span>
                          <span>• {garage.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{garage.rating}</span>
                          <span>• {garage.specialization}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>{garage.address}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 h-8 text-xs"
                          onClick={() => window.location.href = `tel:${garage.phone}`}
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 h-8 text-xs"
                          onClick={() => navigate(`/dashboard/booking`)}
                        >
                          Book
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes ping-slow {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }

          .animate-ping-slow {
            animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default FindGarages;
