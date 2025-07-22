import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ requiredRole }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const allowedRoles = Array.isArray(requiredRole)
    ? requiredRole
    : [requiredRole];

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/error/403" replace />;
  }

  return <Outlet />;
}
