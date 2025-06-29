// src/routes/driverRoutes.tsx
import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/protectedroutes";
import DriverDashboard from "../pages/dashboards/DriverDashboard";

const driverRoutes = (
  <Route
    path="/driver/dashboard"
    element={
      <ProtectedRoute allowedRoles={["driver"]}>
        <DriverDashboard />
      </ProtectedRoute>
    }
  />
);

export default driverRoutes;
