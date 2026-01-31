import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmergencyPage from "./pages/EmergencyPage";
import ServiceRequestPage from "./pages/ServiceRequestPage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/service-request" element={<ServiceRequestPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
