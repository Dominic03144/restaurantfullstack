// src/routes/customerRoutes.tsx
import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/protectedroutes";
import CustomerDashboard from "../pages/dashboards/CustomerDashboard";
import MenuPage from "../pages/MenuPage";
import MyOrders from "../orders/MyOrders";

const customerRoutes = (
  <>
    <Route
      path="/customer/dashboard"
      element={
        <ProtectedRoute allowedRoles={["customer"]}>
          <CustomerDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/customer/menu"
      element={
        <ProtectedRoute allowedRoles={["customer"]}>
          <MenuPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/customer/my-orders"
      element={
        <ProtectedRoute allowedRoles={["customer"]}>
          <MyOrders />
        </ProtectedRoute>
      }
    />
  </>
);

export default customerRoutes;
