// src/App.tsx or src/routes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberDashboard from "../pages/dashboards/MemberDashboard";
// Import other pages
import LoginPage from "../pages/Login";  // if exists
import HomePage from "../pages/Landing";    // if exists

function App() {
  return (
    <Router>
      <Routes>
        {/* Member routes nested in MemberDashboard */}
        <Route path="/member/*" element={<MemberDashboard />} />

        {/* Other routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
