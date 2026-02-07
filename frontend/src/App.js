import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import GarageSathi from "./components/GarageSathi";
import HomePage from "./pages/HomePage";
import EmergencyPage from "./pages/EmergencyPage";
import AIProcessingScreen from "./pages/AIProcessingScreen";
import EmergencyResultScreen from "./pages/EmergencyResultScreen";
import ServiceRequestPage from "./pages/ServiceRequestPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import MainDashboard from "./pages/dashboard/MainDashboard";
import MyGarage from "./pages/dashboard/MyGarage";
import BookService from "./pages/dashboard/BookService";
import PartsStore from "./pages/dashboard/PartsStore";
import AIDiagnosis from "./pages/dashboard/AIDiagnosis";
import ArticlesPage from "./pages/dashboard/ArticlesPage";
import ArticleDetail from "./pages/dashboard/ArticleDetail";
import PriceCompare from "./pages/dashboard/PriceCompare";
import ServiceHistory from "./pages/dashboard/ServiceHistory";
import CostCalculator from "./pages/dashboard/CostCalculator";
import VideoConsult from "./pages/dashboard/VideoConsult";
import Settings from "./pages/dashboard/Settings";
import Documents from "./pages/dashboard/Documents";
import InsuranceClaim from "./pages/dashboard/InsuranceClaim";
import FindGarages from "./pages/dashboard/FindGarages";

function AppContent() {
  const location = useLocation();
  const hideAI = location.pathname.includes('/emergency-ai') || location.pathname.includes('/emergency-result');

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* AI Emergency Flow - NEW HACKATHON FEATURE */}
        <Route path="/emergency-ai" element={<AIProcessingScreen />} />
        <Route path="/emergency-result" element={<EmergencyResultScreen />} />
        
        {/* Original Emergency */}
        <Route path="/emergency" element={<EmergencyPage />} />
        
        <Route path="/service-request" element={<ServiceRequestPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin" element={<AdminPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/dashboard/garage" element={<MyGarage />} />
        <Route path="/dashboard/booking" element={<BookService />} />
        <Route path="/dashboard/parts" element={<PartsStore />} />
        <Route path="/dashboard/diagnosis" element={<AIDiagnosis />} />
        <Route path="/dashboard/community" element={<ArticlesPage />} />
        <Route path="/dashboard/articles" element={<ArticlesPage />} />
        <Route path="/dashboard/articles/:id" element={<ArticleDetail />} />
        <Route path="/dashboard/compare" element={<PriceCompare />} />
        <Route path="/dashboard/history" element={<ServiceHistory />} />
        <Route path="/dashboard/calculator" element={<CostCalculator />} />
        <Route path="/dashboard/consult" element={<VideoConsult />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/documents" element={<Documents />} />
        <Route path="/dashboard/insurance-claim" element={<InsuranceClaim />} />
        <Route path="/dashboard/garages" element={<FindGarages />} />
        
        {/* Placeholder routes for other dashboard pages */}
        <Route path="/dashboard/*" element={<MainDashboard />} />
      </Routes>
      
      {/* Global AI Assistant - hide on AI processing screens */}
      {!hideAI && <GarageSathi />}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="App">
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
