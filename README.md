# KB Car Clinic - Vehicle Service Request Platform

A production-grade, mobile-first web application for vehicle service requests with emergency assistance features.

## 🚗 Overview

KB Car Clinic is a customer-friendly vehicle service request platform designed for people who don't understand car mechanics. The app removes technical pressure from customers and converts their observations, urgency, and logistics into clean service requests for garages.

## ✨ Key Features

### For Customers
- **Dual Flow System**
  - **Emergency Flow**: Immediate help for stuck/unsafe vehicles
  - **Regular Service Flow**: Simple 3-step form for planned services

- **Panic-Safe Design**
  - No technical jargon
  - Observation-based questions
  - Large touch targets for mobile
  - Clear reassurance at every step

- **Smart Emergency Assistance**
  - Automatic location detection
  - Nearby garage finder with ratings
  - Direct call dialer integration
  - WhatsApp support option

- **Simple Service Request Form**
  - Step 1: Personal details (Name, Phone, WhatsApp)
  - Step 2: Vehicle basics (Type, Brand, Model)
  - Step 3: Issue description & urgency
  - Progress indicators throughout

### For Service Providers
- **Admin Dashboard** (`/admin`)
  - View all service requests
  - Sort by urgency (Immediate, 24hrs, 2-3 days, Flexible)
  - Direct call & WhatsApp integration
  - Request timestamps and full details

## 🎨 Design Philosophy

- **Brand Colors**: Deep Blue (#1e3a8a), Red (#dc2626), Yellow (#fbbf24), White
- **Typography**: Inter font family for modern, professional look
- **Mobile-First**: Optimized for stressed users on mobile devices
- **Trust Elements**: "Expert Service", "Genuine Care", "Affordable Price"

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM for navigation
- Tailwind CSS for styling
- Shadcn/UI components
- Lucide React icons

### Backend
- FastAPI (Python)
- MongoDB for data storage
- Motor (async MongoDB driver)
- Pydantic for data validation

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with Emergency/Regular service choice |
| `/emergency` | Emergency assistance with nearby garages |
| `/service-request` | Multi-step service request form |
| `/confirmation` | Success page after form submission |
| `/admin` | Admin dashboard for service providers |

## 🚀 Getting Started

### Prerequisites
- Node.js & Yarn
- Python 3.8+
- MongoDB

### Installation

1. **Frontend Setup**
```bash
cd /app/frontend
yarn install
yarn start
```

2. **Backend Setup**
```bash
cd /app/backend
pip install -r requirements.txt
# Backend runs on port 8001 via supervisor
```

### Environment Variables

**Frontend (`.env`)**
```
REACT_APP_BACKEND_URL=https://your-domain.com
```

**Backend (`.env`)**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=kb_car_clinic
CORS_ORIGINS=*
```

## 📊 API Endpoints

### Service Requests

**Create Service Request**
```http
POST /api/service-requests
Content-Type: application/json

{
  "name": "Rahul Kumar",
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

**Get All Requests**
```http
GET /api/service-requests
```

## 🎯 User Journey

### Emergency Flow
1. User selects "Vehicle Stopped or Unsafe"
2. Location is detected automatically
3. Nearby garages displayed with ratings & distance
4. User calls garage directly via phone dialer

### Regular Service Flow
1. User selects "Schedule Service or Inspection"
2. Fills 3-step form (Personal → Vehicle → Issue)
3. Reviews information
4. Submits request
5. Receives confirmation with next steps
6. Can follow up via WhatsApp or call

## 🔐 Security & Privacy

- No payment processing (reduces liability)
- No sensitive data stored
- Phone numbers used only for service coordination
- MongoDB ObjectId properly excluded from responses

## 📈 Future Enhancements

- Real-time garage availability
- GPS-based automatic routing
- SMS notifications
- Garage rating system
- Service history tracking
- Push notifications
- Multi-language support

## 🌍 Coverage

Currently supports All India with plans to expand internationally.

## 📞 Contact Information

**KB Car Clinic**
- Phone: 8140 900 112 / 8140 900 114
- WhatsApp: Available 24/7
- Email: kbcarclinic@gmail.com

## 🏆 Why This App Wins

1. **Panic-Safe Design**: Works when users are stressed
2. **No Technical Jargon**: Anyone can use it
3. **Fast**: Less than 2 minutes to request service
4. **Trust-First**: No charges without approval
5. **Infrastructure-Light**: No complex backend required for MVP
6. **MSME-Friendly**: Helps local garages get qualified leads

## 📝 License

This project is built for KB Car Clinic.

---

**Built with ❤️ using Emergent AI Platform**
