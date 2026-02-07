// 10 Dummy Garages across different locations
export const allGarages = [
  {
    id: 1,
    name: "KB Car Clinic - Central",
    distance: "1.2 km",
    estimatedTime: "5 mins",
    status: "OPEN",
    rating: 4.8,
    phone: "8140900112",
    address: "MG Road, City Center",
    services: ["Emergency Support", "24/7 Available", "Towing Service"],
    specialization: "Multi-brand expert"
  },
  {
    id: 2,
    name: "AutoCare Service Hub",
    distance: "2.5 km",
    estimatedTime: "8 mins",
    status: "OPEN",
    rating: 4.6,
    phone: "9876543210",
    address: "Nehru Nagar, Sector 12",
    services: ["Quick Repair", "Spare Parts", "Battery Service"],
    specialization: "Fast service"
  },
  {
    id: 3,
    name: "Express Car Repair",
    distance: "3.1 km",
    estimatedTime: "10 mins",
    status: "OPEN",
    rating: 4.7,
    phone: "8765432109",
    address: "Ring Road, Industrial Area",
    services: ["Engine Repair", "AC Service", "Body Work"],
    specialization: "Engine specialist"
  },
  {
    id: 4,
    name: "24/7 Vehicle Assistance",
    distance: "1.8 km",
    estimatedTime: "6 mins",
    status: "OPEN",
    rating: 4.9,
    phone: "7654321098",
    address: "Highway Circle, Exit 4",
    services: ["Emergency Support", "Roadside Assistance", "Jump Start"],
    specialization: "Emergency expert"
  },
  {
    id: 5,
    name: "SpeedFix Auto Solutions",
    distance: "4.2 km",
    estimatedTime: "12 mins",
    status: "OPEN",
    rating: 4.5,
    phone: "9123456789",
    address: "Mall Road, Block C",
    services: ["Quick Diagnosis", "Oil Change", "Tire Service"],
    specialization: "Quick fixes"
  },
  {
    id: 6,
    name: "Premium Motors Care",
    distance: "2.8 km",
    estimatedTime: "9 mins",
    status: "OPEN",
    rating: 4.8,
    phone: "8912345678",
    address: "Park Street, Near Metro",
    services: ["Luxury Car Service", "Electronics", "Paint Job"],
    specialization: "Premium vehicles"
  },
  {
    id: 7,
    name: "City Garage Network",
    distance: "3.5 km",
    estimatedTime: "11 mins",
    status: "OPEN",
    rating: 4.4,
    phone: "7891234567",
    address: "Station Road, Gate 2",
    services: ["General Repair", "Inspection", "Spare Parts"],
    specialization: "All brands"
  },
  {
    id: 8,
    name: "TurboFix Workshop",
    distance: "1.5 km",
    estimatedTime: "5 mins",
    status: "OPEN",
    rating: 4.7,
    phone: "8140900113",
    address: "Lake View Road, Plot 15",
    services: ["Turbo Service", "Performance Tuning", "Exhaust"],
    specialization: "Performance cars"
  },
  {
    id: 9,
    name: "SafeDrive Service Center",
    distance: "3.8 km",
    estimatedTime: "12 mins",
    status: "OPEN",
    rating: 4.6,
    phone: "9087654321",
    address: "Airport Link Road, Phase 3",
    services: ["Brake Service", "Suspension", "Safety Check"],
    specialization: "Safety focused"
  },
  {
    id: 10,
    name: "ElectroAuto Tech",
    distance: "2.2 km",
    estimatedTime: "7 mins",
    status: "OPEN",
    rating: 4.8,
    phone: "8140900114",
    address: "Tech Park, Building B",
    services: ["EV Service", "Electronics", "Battery Replacement"],
    specialization: "Electric vehicles"
  }
];

// Function to get 4 random garages
export const getRandomGarages = (count = 4) => {
  const shuffled = [...allGarages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to get best match (first random garage)
export const getBestMatch = () => {
  const random = getRandomGarages(4);
  return random[0];
};
