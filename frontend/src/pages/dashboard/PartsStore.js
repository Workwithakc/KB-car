import React, { useState } from 'react';
import { Search, ShoppingCart, Star, Filter, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';

const parts = [
  { id: 1, name: 'Engine Oil - Synthetic 5W-40', brand: 'Castrol', price: 899, rating: 4.8, image: '🛢️', category: 'Engine', genuine: true },
  { id: 2, name: 'Air Filter', brand: 'Mann Filter', price: 599, rating: 4.6, image: '🔧', category: 'Filters', genuine: true },
  { id: 3, name: 'Brake Pads (Front)', brand: 'Bosch', price: 1499, rating: 4.9, image: '🔩', category: 'Brakes', genuine: true },
  { id: 4, name: 'Spark Plugs (Set of 4)', brand: 'NGK', price: 799, rating: 4.7, image: '⚡', category: 'Engine', genuine: true },
  { id: 5, name: 'Wiper Blades (Pair)', brand: 'Bosch', price: 449, rating: 4.5, image: '💨', category: 'Accessories', genuine: false },
  { id: 6, name: 'Battery 12V 50Ah', brand: 'Amaron', price: 4499, rating: 4.8, image: '🔋', category: 'Electrical', genuine: true },
  { id: 7, name: 'AC Filter', brand: 'Fram', price: 349, rating: 4.4, image: '❄️', category: 'Filters', genuine: true },
  { id: 8, name: 'Coolant (1L)', brand: 'Valvoline', price: 299, rating: 4.6, image: '🧪', category: 'Fluids', genuine: true },
];

const categories = ['All', 'Engine', 'Filters', 'Brakes', 'Electrical', 'Accessories', 'Fluids'];

const PartsStore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [cart, setCart] = useState([]);

  const filteredParts = parts
    .filter(part => 
      (selectedCategory === 'All' || part.category === selectedCategory) &&
      part.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const addToCart = (part) => {
    setCart([...cart, part]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Spare Parts Store</h1>
            <p className="text-gray-600 mt-1">Genuine parts with warranty</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 relative">
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500">{cart.length}</Badge>
            )}
          </Button>
        </div>

        {/* Search & Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search parts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 mt-4 overflow-x-auto">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredParts.map(part => (
            <Card key={part.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="text-6xl text-center mb-2">{part.image}</div>
                <CardTitle className="text-base">{part.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{part.brand}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{part.rating}</span>
                  {part.genuine && (
                    <Badge variant="secondary" className="ml-auto text-xs">Genuine</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-600">₹{part.price}</span>
                </div>
                <Button 
                  onClick={() => addToCart(part)}
                  className="w-full"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PartsStore;
