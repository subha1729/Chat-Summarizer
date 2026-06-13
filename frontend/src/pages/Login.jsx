import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/login.css";


console.log("API URL:", import.meta.env.VITE_API_URL);
function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/api/auth/check");

        if (res.data.authenticated) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
  }, [navigate]);

  const heading = useMemo(
    () => (mode === "signin" ? "Welcome back" : "Create your workspace"),
    [mode]
  );

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = mode === "signin" ? "/auth/login" : "/auth/register";
      const payload = mode === "signin"
        ? { email: form.email, password: form.password }
        : { username: form.username, email: form.email, password: form.password };

      await API.post(endpoint, payload);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to continue with that account.");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    // window.location.href =
    //   "https://chat-summarizer-api.onrender.com/api/auth/google";

    window.location.href =
       `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <main className="auth-shell">
      <section className="hero-card">
        <p className="eyebrow">AI Discord Summaries</p>
        <h1>Make every server <span className="gradient-word">conversation</span> easy to scan and act on.</h1>
        <p className="hero-copy">
          Bring your channels into one polished workspace with instant summaries, smart topic recaps, and quick access to your server activity.
        </p>
        <div className="feature-list">
          <article className="feature-pill">
            <span className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
            </span>
            <div><strong>Fast summaries</strong><p>Daily standups and key updates in seconds.</p></div>
          </article>
          <article className="feature-pill">
            <span className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            </span>
            <div><strong>Topic & User Insights</strong><p>Spot key topics and track who is driving the chat.</p></div>
          </article>
          <article className="feature-pill">
            <span className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </span>
            <div><strong>Server & Channel Analytics</strong><p>Select servers and track channels, users, and message stats.</p></div>
          </article>
        </div>
      </section>

      <section className="auth-card">
        <div className="auth-card__top">
          <p className="eyebrow">Access your workspace</p>
          <h2>{heading}</h2>
          <p>Sign in with your email or continue with Google.</p>
        </div>

        <div className="mode-switch" role="tablist" aria-label="Authentication mode">
          <button className={mode === "signin" ? "mode-switch__btn active" : "mode-switch__btn"} onClick={() => setMode("signin")}>Sign in</button>
          <button className={mode === "signup" ? "mode-switch__btn active" : "mode-switch__btn"} onClick={() => setMode("signup")}>Sign up</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <label>
              Full name
              <input name="username" value={form.username} onChange={handleChange} placeholder="Alex Morgan" required />
            </label>
          )}

          <label>
            Email address
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required />
          </label>

          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required minLength="6" />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="divider"><span>or</span></div>

        <button className="google-btn" onClick={loginWithGoogle} type="button">
        <span className="google-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C36.9 2.9 30.9 0 24 0 14.6 0 6.4 5.4 2.6 13.2l7.9 6.1C12.1 13.2 17.6 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.5c-.5 2.7-2 5-4.2 6.6l6.5 5.1c3.8-3.5 6.3-8.6 6.3-16.2z"/>
            <path fill="#FBBC05" d="M10.5 28.7c-1-2.7-1.5-5.6-1.5-8.7s.5-6 1.5-8.7l-7.9-6.1C.9 9.8 0 14.8 0 20c0 5.2.9 10.2 2.6 14.8l7.9-6.1z"/>
            <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-6.5-5.1c-2.1 1.4-4.8 2.3-9.5 2.3-6.4 0-11.9-3.7-14.5-9l-7.9 6.1C6.4 42.6 14.6 48 24 48z"/>
          </svg>
        </span>
        Continue with Google
      </button>

      </section>
    </main>
  );
}

export default Login;