import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Phone, Clock, Star, Filter, Search, Zap, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';
import { allGarages } from '@/data/garages';

const FindGarages = () => {
  const navigate = useNavigate();
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({ lat: 23.0225, lng: 72.5714 }); // Ahmedabad coords

  // Simulate loading the map
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
                {isLoading ? (
                  <div className="h-[500px] flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Loading map...</p>
                      <p className="text-sm text-gray-500">Finding garages near you</p>
                    </div>
                  </div>
                ) : (
                <div className="relative h-[500px] overflow-hidden rounded-b-lg">
                  {/* Realistic Map Background with Streets */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e8f4e8] via-[#f0f4e8] to-[#e8ece8]">
                    {/* Major Roads */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Main Highway - Horizontal */}
                      <rect x="0" y="45" width="100" height="4" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="0.3"/>
                      <line x1="0" y1="47" x2="100" y2="47" stroke="#fff" strokeWidth="0.2" strokeDasharray="2,1"/>
                      
                      {/* Secondary Road - Vertical */}
                      <rect x="48" y="0" width="3" fill="#f5f5f5" stroke="#ddd" strokeWidth="0.2" height="100"/>
                      
                      {/* Ring Road */}
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#ffeaa7" strokeWidth="2"/>
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#fff" strokeWidth="0.3" strokeDasharray="1,1"/>
                      
                      {/* Smaller Streets */}
                      <line x1="20" y1="0" x2="20" y2="100" stroke="#e0e0e0" strokeWidth="0.8"/>
                      <line x1="35" y1="0" x2="35" y2="100" stroke="#e0e0e0" strokeWidth="0.8"/>
                      <line x1="65" y1="0" x2="65" y2="100" stroke="#e0e0e0" strokeWidth="0.8"/>
                      <line x1="80" y1="0" x2="80" y2="100" stroke="#e0e0e0" strokeWidth="0.8"/>
                      
                      <line x1="0" y1="25" x2="100" y2="25" stroke="#e0e0e0" strokeWidth="0.8"/>
                      <line x1="0" y1="70" x2="100" y2="70" stroke="#e0e0e0" strokeWidth="0.8"/>
                      <line x1="0" y1="85" x2="100" y2="85" stroke="#e0e0e0" strokeWidth="0.8"/>
                      
                      {/* Parks/Green Areas */}
                      <rect x="5" y="5" width="12" height="15" rx="2" fill="#c8e6c9" opacity="0.6"/>
                      <rect x="75" y="75" width="20" height="20" rx="2" fill="#c8e6c9" opacity="0.6"/>
                      <circle cx="30" cy="75" r="8" fill="#a5d6a7" opacity="0.5"/>
                      
                      {/* Buildings/Blocks */}
                      <rect x="8" y="30" width="8" height="10" fill="#ddd" rx="1"/>
                      <rect x="60" y="10" width="15" height="12" fill="#e0e0e0" rx="1"/>
                      <rect x="72" y="55" width="10" height="8" fill="#ddd" rx="1"/>
                      <rect x="10" y="55" width="6" height="10" fill="#e0e0e0" rx="1"/>
                      
                      {/* Water Body */}
                      <ellipse cx="85" cy="25" rx="10" ry="6" fill="#81d4fa" opacity="0.6"/>
                    </svg>
                    
                    {/* Location Labels */}
                    <div className="absolute top-[12%] left-[15%] text-[8px] text-gray-500 font-medium bg-white/70 px-1 rounded">City Park</div>
                    <div className="absolute top-[42%] left-[2%] text-[8px] text-gray-500 font-medium bg-yellow-100/80 px-1 rounded">Main Highway</div>
                    <div className="absolute top-[68%] left-[25%] text-[8px] text-gray-500 font-medium bg-white/70 px-1 rounded">Lake Garden</div>
                  </div>

                  {/* Your Location - Center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative">
                      {/* Accuracy Circle */}
                      <div className="absolute -top-8 -left-8 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
                      {/* Center Dot */}
                      <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Your Location
                      </div>
                      {/* Pulse Effect */}
                      <div className="absolute top-0 left-0 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>

                  {/* Garage Markers */}
                  {filteredGarages.map((garage, index) => {
                    const isSelected = selectedGarage?.id === garage.id;
                    return (
                      <div
                        key={garage.id}
                        data-testid={`garage-marker-${garage.id}`}
                        className="absolute z-10 cursor-pointer transform transition-all duration-300 hover:scale-110"
                        style={{
                          left: `${garage.coordinates.x}%`,
                          top: `${garage.coordinates.y}%`,
                          animationDelay: `${index * 100}ms`
                        }}
                        onClick={() => setSelectedGarage(garage)}
                      >
                        {/* Marker */}
                        <div className={`relative transition-transform duration-200 ${isSelected ? 'scale-125' : ''}`}>
                          {/* Drop Shadow */}
                          <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-sm`}></div>
                          
                          {/* Pin */}
                          <div className={`relative w-10 h-10 flex items-center justify-center ${isSelected ? 'animate-bounce' : ''}`}>
                            <div className={`absolute w-10 h-10 rounded-full ${garage.isOpen ? 'bg-green-500' : 'bg-red-500'} ${isSelected ? 'ring-4 ring-blue-400 ring-opacity-50' : ''} shadow-lg`}></div>
                            <MapPin className="w-5 h-5 text-white relative z-10" />
                          </div>
                          
                          {/* Info Popup */}
                          {isSelected && (
                            <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 w-52 bg-white rounded-xl shadow-2xl p-3 border border-gray-200 animate-fadeIn z-30">
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>
                              <div className="font-bold text-gray-900 text-sm truncate">{garage.name}</div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                                <Navigation className="w-3 h-3 text-blue-500" />
                                <span className="font-semibold text-blue-600">{garage.distance}</span>
                                <span>•</span>
                                <span>{garage.estimatedTime}</span>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-bold">{garage.rating}</span>
                                </div>
                                <Badge className={`text-[10px] px-2 ${garage.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
                                  {garage.isOpen ? 'OPEN NOW' : 'CLOSED'}
                                </Badge>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-xl shadow-lg p-3 space-y-2">
                    <div className="text-xs font-bold text-gray-900 border-b pb-1 mb-2">Map Legend</div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow"></div>
                      <span className="text-xs text-gray-700">Your Location</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
                      <span className="text-xs text-gray-700">Open Garage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow"></div>
                      <span className="text-xs text-gray-700">Closed Garage</span>
                    </div>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button size="icon" className="bg-white text-gray-700 hover:bg-gray-100 shadow-lg h-10 w-10 rounded-lg">
                      <span className="text-xl font-bold">+</span>
                    </Button>
                    <Button size="icon" className="bg-white text-gray-700 hover:bg-gray-100 shadow-lg h-10 w-10 rounded-lg">
                      <span className="text-xl font-bold">−</span>
                    </Button>
                    <Button size="icon" className="bg-white text-gray-700 hover:bg-gray-100 shadow-lg h-10 w-10 rounded-lg mt-2" title="Re-center">
                      <Navigation className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  {/* Current Location Pill */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-700">Live Location Active</span>
                  </div>
                </div>
                )}
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
