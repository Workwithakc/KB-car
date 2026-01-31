import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import EmergencyPage from "./pages/EmergencyPage";
import ServiceRequestPage from "./pages/ServiceRequestPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import MainDashboard from "./pages/dashboard/MainDashboard";
import MyGarage from "./pages/dashboard/MyGarage";
import BookService from "./pages/dashboard/BookService";
import PartsStore from "./pages/dashboard/PartsStore";
import AIDiagnosis from "./pages/dashboard/AIDiagnosis";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
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
            
            {/* Placeholder routes for other dashboard pages */}
            <Route path="/dashboard/*" element={<MainDashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
