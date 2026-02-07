# KB Car Clinic - Automotive Service Ecosystem

## Product Overview
A mobile-first web application for vehicle service requests, designed as a comprehensive "automotive service ecosystem" for a national-level hackathon. The app targets users with no technical knowledge of cars, providing a simple, intuitive interface to find garages, book services, and manage their vehicle maintenance.

## Tech Stack
- **Frontend:** React + React Router + Tailwind CSS + Shadcn UI
- **Backend:** FastAPI + MongoDB (minimal usage - mostly frontend mocks)
- **Architecture:** Frontend-heavy prototype with simulated features

## Core Features

### Completed Features
- [x] Landing page with emergency flow entry
- [x] User Dashboard with sidebar navigation
- [x] **Find Nearby Garages** - Interactive map with garage markers, search/filter/sort, garage cards with Call/Book buttons
- [x] My Garage - Vehicle management
- [x] Book Service - Service booking form
- [x] Parts Store - Auto parts marketplace (mock)
- [x] Price Compare - Service price comparison
- [x] AI Diagnosis - Symptom-based diagnosis (mock)
- [x] Service History - Past service records (mock)
- [x] Cost Calculator - Service cost estimation
- [x] Video Consult - Video consultation booking (mock)
- [x] Documents Vault - Document storage (mock)
- [x] Insurance Claim - Claim submission form
- [x] Settings - User preferences
- [x] Articles Page - 15 informational articles
- [x] Garage Sathi - AI Assistant (hardcoded responses)
- [x] AI Emergency Flow - Simulated AI processing to find nearby garages

### Pending/Backlog (P0)
- [ ] Add images/thumbnails to 15 Articles
- [ ] Integrate real LLM for "Garage Sathi" AI assistant
- [ ] Email/WhatsApp notifications for service requests

### Future Enhancements (P1-P2)
- [ ] Backend expansion for real data persistence
- [ ] User authentication system
- [ ] Real-time garage availability
- [ ] Push notifications
- [ ] Payment integration

## Key Files
- `/app/frontend/src/App.js` - Main router
- `/app/frontend/src/components/DashboardLayout.js` - Dashboard sidebar & layout
- `/app/frontend/src/components/GarageSathi.js` - AI Assistant
- `/app/frontend/src/pages/dashboard/FindGarages.js` - Find Garages page with map
- `/app/frontend/src/data/garages.js` - Mock garage data

## API Endpoints
- `POST /api/service-requests` - Create service request
- `GET /api/service-requests` - Get all service requests
- `GET /api/` - Health check

## Last Updated
February 7, 2026 - Completed Find Nearby Garages page with interactive map
