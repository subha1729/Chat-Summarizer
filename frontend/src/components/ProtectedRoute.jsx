import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {
    // const checkAuth = async () => {
    //   try {
    //     // await API.get("/auth/me");
    //     API.get("/api/auth/check"),
    //     setAuthenticated(true);
    //   } catch {
    //     setAuthenticated(false);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const checkAuth = async () => {
      try {
        const res = await API.get("/api/auth/check");

        setAuthenticated(
          res.data.authenticated
        );
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