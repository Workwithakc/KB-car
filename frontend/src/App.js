import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmergencyPage from "./pages/EmergencyPage";
import ServiceRequestPage from "./pages/ServiceRequestPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/service-request" element={<ServiceRequestPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
