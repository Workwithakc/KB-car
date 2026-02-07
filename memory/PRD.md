# KB Car Clinic - Automotive Service Ecosystem

## Product Overview
A mobile-first web application for vehicle service requests, designed as a comprehensive "automotive service ecosystem" for a national-level hackathon. The app targets users with no technical knowledge of cars, providing a simple, intuitive interface to find garages, book services, and manage their vehicle maintenance.

## Tech Stack
- **Frontend:** React + React Router + Tailwind CSS + Shadcn UI
- **Backend:** FastAPI + MongoDB (minimal usage - mostly frontend mocks)
- **Architecture:** Frontend-heavy prototype with simulated AI features

## Core Features

### Completed Features
- [x] Landing page with emergency flow entry
- [x] User Dashboard with sidebar navigation
- [x] **AI Smart Calculator** - NEW! Photo upload, problem description, AI diagnosis, cost estimates, parts recommendations (best to budget), garage matching
- [x] **Find Nearby Garages (AI Enhanced)** - Interactive map with AI recommendations, quality/price filters, sentiment analysis, AI-analyzed reviews
- [x] **Subscriptions & Pricing Page** - Three tiers (Free/Standard ₹199/Premium ₹499), commission structure, garage partner benefits
- [x] **Insurance Claim (AI Advisor)** - Multi-step claim form with AI recommendations, success probability, settlement estimates
- [x] My Garage - Vehicle management
- [x] Book Service - Service booking form
- [x] Parts Store - Auto parts marketplace (mock)
- [x] Price Compare - Service price comparison
- [x] AI Diagnosis - Symptom-based diagnosis (mock)
- [x] Service History - Past service records (mock)
- [x] Cost Calculator - Basic service cost estimation
- [x] Video Consult - Video consultation booking (mock)
- [x] Documents Vault - Document storage (mock)
- [x] Settings - User preferences
- [x] Articles Page - 15 informational articles
- [x] Garage Sathi - AI Assistant (hardcoded responses)
- [x] AI Emergency Flow - Simulated AI processing to find nearby garages

### AI Features Summary
| Feature | Description |
|---------|-------------|
| AI Smart Calculator | Photo upload → AI diagnosis → Cost range → Parts suggestions → Garage matching |
| Find Garages AI | AI-powered sorting, quality filters, sentiment analysis, review summaries |
| Insurance AI Advisor | Claim success probability, settlement estimates, recommendations |
| AI Diagnosis | Symptom-based vehicle diagnosis |

### Pending/Backlog (P1)
- [ ] Add images/thumbnails to 15 Articles
- [ ] Integrate real LLM for "Garage Sathi" AI assistant
- [ ] Email/WhatsApp notifications for service requests

### Future Enhancements (P2)
- [ ] Backend expansion for real data persistence
- [ ] User authentication system
- [ ] Real-time garage availability
- [ ] Push notifications
- [ ] Payment integration with Stripe/Razorpay

## Key Files
- `/app/frontend/src/App.js` - Main router
- `/app/frontend/src/components/DashboardLayout.js` - Dashboard sidebar & layout
- `/app/frontend/src/components/GarageSathi.js` - AI Assistant
- `/app/frontend/src/pages/dashboard/AISmartCalculator.js` - AI Smart Calculator page
- `/app/frontend/src/pages/dashboard/FindGarages.js` - AI-enhanced Find Garages page
- `/app/frontend/src/pages/dashboard/Subscriptions.js` - Pricing & subscription page
- `/app/frontend/src/pages/dashboard/InsuranceClaim.js` - Insurance claim with AI advisor
- `/app/frontend/src/data/garages.js` - Mock garage data

## API Endpoints
- `POST /api/service-requests` - Create service request
- `GET /api/service-requests` - Get all service requests
- `GET /api/` - Health check

## Subscription Tiers
| Plan | Price | Key Features |
|------|-------|--------------|
| Free | ₹0 | Basic features, 3 bookings/month |
| Standard | ₹199/mo | AI Diagnosis (5/mo), AI Calculator, 5% cashback |
| Premium | ₹499/mo | Unlimited AI, Insurance Advisor, 10% cashback |

## Commission Structure (for Garage Partners)
- Service Booking: 5%
- Parts Order: 3-8%
- Insurance Claim: 2%
- Video Consultation: 15%
- Premium Listing: ₹999/month

## Last Updated
February 7, 2026 - Added AI Smart Calculator, Subscriptions page, enhanced Find Garages with AI features, added AI Insurance Advisor
