import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/protectedroutes";
import OwnerDashboard from "../pages/dashboards/OnwerDashboard";

const ownerRoutes = (
  <Route
    path="/owner/dashboard"
    element={
      <ProtectedRoute allowedRoles={["owner"]}>
        <OwnerDashboard />
      </ProtectedRoute>
    }
  />
);

export default ownerRoutes;
