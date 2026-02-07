import React, { useState } from 'react';
import { History, Calendar, DollarSign, Wrench, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';

const dummyHistory = [
  { id: 1, date: '2026-01-15', service: 'Engine Oil Change + Filter', garage: 'KB Car Clinic', cost: 1299, status: 'Completed', invoice: 'INV-001' },
  { id: 2, date: '2025-12-20', service: 'Brake Pad Replacement', garage: 'AutoCare Hub', cost: 2499, status: 'Completed', invoice: 'INV-002' },
  { id: 3, date: '2025-11-10', service: 'AC Gas Refill', garage: 'KB Car Clinic', cost: 1199, status: 'Completed', invoice: 'INV-003' },
  { id: 4, date: '2025-10-05', service: 'General Service + Inspection', garage: 'Express Repair', cost: 3499, status: 'Completed', invoice: 'INV-004' },
  { id: 5, date: '2025-09-12', service: 'Battery Replacement', garage: 'Premium Motors', cost: 4999, status: 'Completed', invoice: 'INV-005' },
  { id: 6, date: '2025-08-18', service: 'Tire Rotation & Alignment', garage: 'KB Car Clinic', cost: 899, status: 'Completed', invoice: 'INV-006' },
  { id: 7, date: '2025-07-25', service: 'Suspension Repair', garage: 'AutoCare Hub', cost: 5499, status: 'Completed', invoice: 'INV-007' },
  { id: 8, date: '2025-06-30', service: 'Engine Oil Change', garage: 'KB Car Clinic', cost: 899, status: 'Completed', invoice: 'INV-008' }
];

const ServiceHistory = () => {
  const [filterYear, setFilterYear] = useState('2026');
  const [filterGarage, setFilterGarage] = useState('all');

  const filteredHistory = dummyHistory.filter(record => {
    const matchYear = record.date.startsWith(filterYear);
    const matchGarage = filterGarage === 'all' || record.garage === filterGarage;
    return matchYear && matchGarage;
  });

  const totalSpent = filteredHistory.reduce((sum, record) => sum + record.cost, 0);
  const uniqueGarages = [...new Set(dummyHistory.map(r => r.garage))];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service History</h1>
            <p className="text-gray-600 mt-1">Track all your vehicle maintenance records</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 w-4 h-4" />
            Export PDF
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <History className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Services</div>
                  <div className="text-2xl font-bold text-gray-900">{filteredHistory.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                  <div className="text-2xl font-bold text-gray-900">₹{totalSpent.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Avg per Service</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{Math.round(totalSpent / filteredHistory.length).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex gap-4 flex-1">
                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterGarage} onValueChange={setFilterGarage}>
                  <SelectTrigger className="w-60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Garages</SelectItem>
                    {uniqueGarages.map(garage => (
                      <SelectItem key={garage} value={garage}>{garage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History Records */}
        <div className="space-y-4">
          {filteredHistory.map(record => (
            <Card key={record.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{record.service}</h3>
                      <Badge className="bg-green-500">Completed</Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(record.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Wrench className="w-4 h-4" />
                        {record.garage}
                      </span>
                    </div>

                    <div className="text-xs text-gray-500">
                      Invoice: {record.invoice}
                    </div>
                  </div>

                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-blue-600 mb-3">
                      ₹{record.cost.toLocaleString()}
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No service records found for selected filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ServiceHistory;
