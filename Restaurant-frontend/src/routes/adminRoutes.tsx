// src/routes/adminRoutes.tsx
import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/protectedroutes";
import AdminDashboard from "../pages/dashboards/AdminDashboard";

// In case you plan to add other admin tools/pages later:
import UsersPage from "../components/admin/UserTable";          // optional
import RestaurantsPage from "../components/admin/RestaurantTable";  // optional
import OrdersPage from "../components/admin/OrderTable";        // optional

const adminRoutes = (
  <>
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    {/* Optional routes — if you want direct URLs to admin subpages */}
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <UsersPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/restaurants"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <RestaurantsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/orders"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <OrdersPage />
        </ProtectedRoute>
      }
    />
  </>
);

export default adminRoutes;
