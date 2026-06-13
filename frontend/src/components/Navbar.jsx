import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // const res = await API.get("/auth/me");
        const res = await API.get("/api/auth/check");

        if (res.data.authenticated) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    loadUser();
  }, []);

  const logout = async () => {
    try {
      await API.get("/auth/logout");
      setUser(null);
      navigate("/");
    } catch {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/dashboard">Chat Summarizer</Link>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/servers">Servers</Link>
        <Link to="/history">History</Link>
      </div>
      <div className="navbar-user">
        {user ? (
          <div className="profile-menu">
            <button className="profile-trigger" onClick={() => setOpen((prev) => !prev)} type="button">
              <img src={user.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.username || "User") + "&background=6366f1&color=fff"} alt="profile" />
            </button>
            {open && (
              <div className="profile-dropdown">
                <strong>{user.username || "Your profile"}</strong>
                <span>{user.email}</span>
                <button onClick={logout} type="button">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link className="login-pill" to="/">Sign in</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;