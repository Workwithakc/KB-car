import React, { useState } from 'react';
import { FileText, Upload, Download, Trash2, Plus, Shield, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const dummyDocuments = [
  { id: 1, name: 'Registration Certificate (RC)', type: 'RC', uploadDate: '2025-06-15', expiryDate: '2035-06-15', size: '2.4 MB', vehicle: 'Maruti Swift' },
  { id: 2, name: 'Insurance Policy', type: 'Insurance', uploadDate: '2025-08-20', expiryDate: '2026-08-20', size: '1.8 MB', vehicle: 'Maruti Swift' },
  { id: 3, name: 'Pollution Certificate', type: 'PUC', uploadDate: '2025-12-10', expiryDate: '2026-06-10', size: '456 KB', vehicle: 'Maruti Swift' },
  { id: 4, name: 'Service Invoice - Jan 2026', type: 'Invoice', uploadDate: '2026-01-15', expiryDate: '-', size: '1.2 MB', vehicle: 'Maruti Swift' },
  { id: 5, name: 'Warranty Card', type: 'Warranty', uploadDate: '2025-06-15', expiryDate: '2028-06-15', size: '890 KB', vehicle: 'Maruti Swift' }
];

const Documents = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState(dummyDocuments);
  const [selectedType, setSelectedType] = useState('all');

  const filteredDocs = selectedType === 'all' 
    ? documents 
    : documents.filter(doc => doc.type === selectedType);

  const getExpiryStatus = (expiryDate) => {
    if (expiryDate === '-') return { status: 'none', color: 'bg-gray-500', text: 'No Expiry' };
    const days = Math.floor((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (days < 0) return { status: 'expired', color: 'bg-red-500', text: 'Expired' };
    if (days < 30) return { status: 'expiring', color: 'bg-orange-500', text: `${days} days left` };
    return { status: 'valid', color: 'bg-green-500', text: 'Valid' };
  };

  const docTypes = ['all', 'RC', 'Insurance', 'PUC', 'Invoice', 'Warranty'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Vault</h1>
            <p className="text-gray-600 mt-1">Store and manage all your vehicle documents securely</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="mr-2 w-4 h-4" />
            Upload Document
          </Button>
        </div>

        {/* Insurance Claim CTA */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Need to File Insurance Claim?</h3>
                  <p className="text-gray-700">Quick and easy claim filing with document auto-fill</p>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/dashboard/insurance-claim')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                File Claim
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Document Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{documents.length}</div>
              <div className="text-sm text-gray-600">Total Documents</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {documents.filter(d => getExpiryStatus(d.expiryDate).status === 'valid').length}
              </div>
              <div className="text-sm text-gray-600">Valid Documents</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">
                {documents.filter(d => getExpiryStatus(d.expiryDate).status === 'expiring').length}
              </div>
              <div className="text-sm text-gray-600">Expiring Soon</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">
                {documents.filter(d => getExpiryStatus(d.expiryDate).status === 'expired').length}
              </div>
              <div className="text-sm text-gray-600">Expired</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {docTypes.map(type => (
            <Button
              key={type}
              variant={selectedType === type ? 'default' : 'outline'}
              onClick={() => setSelectedType(type)}
              size="sm"
            >
              {type === 'all' ? 'All Documents' : type}
              {type !== 'all' && ` (${documents.filter(d => d.type === type).length})`}
            </Button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map(doc => {
            const expiry = getExpiryStatus(doc.expiryDate);
            return (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{doc.name}</h3>
                        <p className="text-xs text-gray-600">{doc.size}</p>
                      </div>
                    </div>
                    <Badge className={expiry.color}>{expiry.text}</Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-semibold">{doc.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vehicle:</span>
                      <span className="font-semibold">{doc.vehicle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uploaded:</span>
                      <span className="font-semibold">{new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </div>
                    {doc.expiryDate !== '-' && (
                      <div className="flex justify-between">
                        <span>Expires:</span>
                        <span className="font-semibold">{new Date(doc.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Security Notice */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">🔒 Your Documents Are Secure</h3>
                <p className="text-sm text-gray-700">
                  All documents are encrypted and stored securely. Only you can access them. 
                  We never share your documents with third parties without your explicit consent.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
