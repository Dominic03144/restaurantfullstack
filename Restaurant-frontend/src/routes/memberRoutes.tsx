// ✅ src/routes/memberRoutes.tsx
import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/protectedroutes";
import MemberLayout from "../components/MemberLayout"; // must include <Outlet />
import MemberDashboard from "../pages/dashboards/MemberDashboard";
import MenuPage from "../pages/MenuPage";
import MyOrders from "../orders/MyOrders";

const memberRoutes = (
  <Route
    path="/member"
    element={
      <ProtectedRoute allowedRoles={["member"]}>
        <MemberLayout />
      </ProtectedRoute>
    }
  >
    <Route path="dashboard" element={<MemberDashboard />} />
    <Route path="menu" element={<MenuPage />} />
    <Route path="my-orders" element={<MyOrders />} />
  </Route>
);

export default memberRoutes;

