import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      setAuthorized(false);
      navigate("/login", { replace: true });
    } else if (allowedRoles && !allowedRoles.includes(user.userType)) {
      setAuthorized(false);
      navigate("/unauthorized", { replace: true });
    } else {
      setAuthorized(true);
    }
  }, [allowedRoles, navigate]);

  if (authorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-gray-500">Checking access...</p>
      </div>
    );
  }

  if (!authorized) {
    return null; // Already redirected
  }

  return <>{children}</>;
}
