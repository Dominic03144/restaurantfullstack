import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Placeholder dashboards
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import MemberDashboard from "./pages/dashboards/MemberDashboard";
import OwnerDashboard from "./pages/dashboards/OnwerDashboard";
import DriverDashboard from "./pages/dashboards/DriverDashboard";
import CustomerDashboard from "./pages/dashboards/CustomerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based dashboard routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/member" element={<MemberDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
