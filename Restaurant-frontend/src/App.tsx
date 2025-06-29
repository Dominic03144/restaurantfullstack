
// ✅ src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

// Public pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/unauthorized";
import ContactUs from "./pages/Contact";

// Menu page
import MenuPage from "./pages/MenuPage";

// Role routes
import adminRoutes from "./routes/adminRoutes";
import ownerRoutes from "./routes/ownerRoutes";
import customerRoutes from "./routes/customerRoutes";
import driverRoutes from "./routes/driverRoutes";
import memberRoutes from "./routes/memberRoutes";

import ProtectedRoute from "./utils/protectedroutes";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideNavbar =
    location.pathname.includes("/dashboard") ||
    location.pathname.startsWith("/member");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Protected route for menu */}
          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <MenuPage />
              </ProtectedRoute>
            }
          />

          {/* Role-based nested routes */}
          {adminRoutes}
          {ownerRoutes}
          {customerRoutes}
          {driverRoutes}
          {memberRoutes}
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}