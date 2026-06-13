import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/auth/me");
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return authenticated
    ? children
    : <Navigate to="/" />;
}

export default ProtectedRoute;