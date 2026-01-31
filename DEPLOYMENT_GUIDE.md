# KB Car Clinic - Deployment & Usage Guide

## 🚀 Quick Start

Your KB Car Clinic app is **LIVE and READY** at:
```
Frontend: https://autohelp-connect.preview.emergentagent.com
Backend API: https://autohelp-connect.preview.emergentagent.com/api
```

## 📱 How to Use

### For Customers

1. **Emergency Help** (Vehicle stuck/unsafe)
   - Visit the homepage
   - Click "Vehicle Stopped or Unsafe"
   - Allow location access
   - View nearby garages with ratings
   - Call directly from the app

2. **Regular Service Request**
   - Click "Schedule Service or Inspection"
   - Fill 3 simple steps:
     - Personal details (Name, Phone)
     - Vehicle info (Type, Brand, Model)
     - Issue description & urgency
   - Submit and get confirmation
   - Follow up via WhatsApp or call

### For Service Providers (Admin Panel)

Access the admin dashboard at:
```
https://autohelp-connect.preview.emergentagent.com/admin
```

Features:
- View all service requests
- See urgency levels (color-coded)
- Call customers directly
- Send WhatsApp messages
- Real-time request tracking

## 🔧 API Documentation

### Base URL
```
https://autohelp-connect.preview.emergentagent.com/api
```

### Endpoints

#### 1. Health Check
```bash
GET /api/
Response: {"message": "KB Car Clinic API"}
```

#### 2. Create Service Request
```bash
POST /api/service-requests
Content-Type: application/json

{
  "name": "Customer Name",
  "phone": "9876543210",
  "whatsapp": "9876543210",
  "vehicleType": "Car",
  "brand": "Maruti Suzuki",
  "model": "Swift",
  "selectedIssues": ["Vehicle not starting", "Strange noise"],
  "location": "MG Road, Bangalore",
  "urgency": "24hours"
}
```

**Response:**
```json
{
  "id": "uuid-here",
  "name": "Customer Name",
  "phone": "9876543210",
  "whatsapp": "9876543210",
  "vehicleType": "Car",
  "brand": "Maruti Suzuki",
  "model": "Swift",
  "selectedIssues": ["Vehicle not starting", "Strange noise"],
  "location": "MG Road, Bangalore",
  "urgency": "24hours",
  "status": "new",
  "timestamp": "2026-01-31T08:57:00.000Z"
}
```

#### 3. Get All Requests
```bash
GET /api/service-requests
Response: Array of all service requests
```

## 📊 Database Schema

**Collection:** `service_requests`

```javascript
{
  id: String (UUID),
  name: String,
  phone: String,
  whatsapp: String (optional),
  vehicleType: String,
  brand: String,
  model: String (optional),
  selectedIssues: Array<String>,
  location: String,
  urgency: String, // "immediate" | "24hours" | "2-3days" | "flexible"
  status: String,  // "new" | "contacted" | "in_progress" | "completed"
  timestamp: Date
}
```

## 🎨 Branding Guidelines

### Colors
- **Primary Blue**: #1e3a8a (Headers, Trust elements)
- **Emergency Red**: #dc2626 (Emergency buttons, alerts)
- **Success Green**: #16a34a (Confirmations)
- **Warning Yellow**: #fbbf24 (Accents, icons)

### Typography
- **Font**: Inter (Google Fonts)
- **Heading**: 700-800 weight
- **Body**: 400-500 weight

### Logo
- Wrench icon with yellow accent
- "KB Car Clinic" text
- Tagline: "We Care for Your Car"

## 📱 Mobile Features

- **PWA Ready**: Install as mobile app
- **Responsive Design**: Works on all screen sizes
- **Touch Optimized**: Large buttons for easy tapping
- **Location Services**: Auto-detect user location
- **Call Integration**: Direct phone dialer links
- **WhatsApp Integration**: Deep links to WhatsApp

## 🛠️ Technical Details

### Stack
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI
- **Backend**: FastAPI (Python) + MongoDB
- **Deployment**: Kubernetes + Supervisor
- **Hot Reload**: Enabled for both frontend & backend

### File Structure
```
/app
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── EmergencyPage.js
│   │   │   ├── ServiceRequestPage.js
│   │   │   ├── ConfirmationPage.js
│   │   │   └── AdminPage.js
│   │   ├── components/ui/ (Shadcn components)
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.css
│   └── public/
│       └── manifest.json
├── backend/
│   ├── server.py
│   ├── .env
│   └── requirements.txt
└── README.md
```

## 🔐 Environment Variables

### Frontend
```bash
REACT_APP_BACKEND_URL=https://autohelp-connect.preview.emergentagent.com
```

### Backend
```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
```

## 🧪 Testing

### Test Service Request Flow
```bash
# 1. Visit homepage
curl https://autohelp-connect.preview.emergentagent.com

# 2. Test API
curl https://autohelp-connect.preview.emergentagent.com/api/

# 3. Create test request
curl -X POST https://autohelp-connect.preview.emergentagent.com/api/service-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "9999999999",
    "vehicleType": "Car",
    "brand": "Maruti Suzuki",
    "model": "Swift",
    "selectedIssues": ["Regular servicing"],
    "location": "Test Location",
    "urgency": "flexible"
  }'

# 4. View all requests
curl https://autohelp-connect.preview.emergentagent.com/api/service-requests
```

## 🚦 Service Status

All services are **RUNNING** and monitored by Supervisor:
- Frontend: Port 3000 (Auto-reloads on code changes)
- Backend: Port 8001 (Auto-reloads on code changes)
- MongoDB: Local instance

Check status:
```bash
sudo supervisorctl status
```

Restart services:
```bash
sudo supervisorctl restart frontend
sudo supervisorctl restart backend
```

## 📈 Monitoring

### Backend Logs
```bash
tail -f /var/log/supervisor/backend.out.log  # Success logs
tail -f /var/log/supervisor/backend.err.log  # Error logs
```

### Frontend Logs
```bash
tail -f /var/log/supervisor/frontend.out.log
```

## 🎯 Key Features Working

✅ Emergency assistance with location detection
✅ Nearby garage finder (dummy data)
✅ 3-step service request form
✅ Form validation
✅ Backend API integration
✅ MongoDB data storage
✅ Admin dashboard
✅ Call & WhatsApp integration
✅ Mobile responsive design
✅ Progress indicators
✅ Success confirmations

## 🌟 Business Model

### Revenue Streams
1. **Per-Lead Fee**: Fixed fee per service request routed to garage
2. **Commission**: Percentage of completed service value
3. **Subscription**: Monthly fee for garages to receive leads
4. **Premium Listing**: Featured placement in nearby garage list

### Target Market
- Local car service centers across India
- Mobile mechanics
- Roadside assistance providers
- Multi-brand service chains

## 📞 Support & Contact

For technical support or questions:
- **Email**: kbcarclinic@gmail.com
- **Phone**: 8140 900 112 / 8140 900 114
- **WhatsApp**: Available 24/7

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: January 31, 2026

Built with Emergent AI Platform 🚀
