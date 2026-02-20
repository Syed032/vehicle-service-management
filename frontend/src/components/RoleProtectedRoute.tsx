import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface RoleProtectedRouteProps {
  children: JSX.Element;
  allowedRole: string;
}

const RoleProtectedRoute = ({
  children,
  allowedRole,
}: RoleProtectedRouteProps) => {

  const token = localStorage.getItem("token");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    // ✅ Decode token
    const payload = JSON.parse(atob(token.split(".")[1]));

    const role = payload.role;
    const exp = payload.exp;

    // ⏰ Check expiry
    if (exp * 1000 < Date.now()) {
      localStorage.clear();
      return <Navigate to="/" replace />;
    }

    // 🚫 Role mismatch
    if (role !== allowedRole) {
      if (role === "ROLE_ADMIN") {
        return <Navigate to="/admin-dashboard" replace />;
      } else {
        return <Navigate to="/user-dashboard" replace />;
      }
    }

    return children;

  } catch (error) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }
};

export default RoleProtectedRoute;
