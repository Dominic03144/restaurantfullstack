import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  // If user is authenticated, render child routes
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
