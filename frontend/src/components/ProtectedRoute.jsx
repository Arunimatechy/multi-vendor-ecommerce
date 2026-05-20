
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, role }) {
  const { access, user } = useSelector((state) => state.auth);
if (access === undefined) return null;
  // ================= NOT LOGGED IN =================
  if (!access) {
    return <Navigate to="/login" replace />;
  }

  // ================= ROLE CHECK =================
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;