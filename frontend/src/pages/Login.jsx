import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Mock auth -> persist current user in localStorage via services/api
    login(role, email || role + "@example.com");
    navigate(role === "faculty" ? "/faculty" : "/student");
  }

  return (
    <>
      <style>{`
        /* Minimal, embedded CSS so this file is self-contained */
        .auth-page { min-height: 100vh; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#eceff1,#f5f7fa); font-family: 'Segoe UI', sans-serif; }
        .auth-card { background:#fff; padding:2rem; border-radius:16px; box-shadow:0 8px 20px rgba(0,0,0,0.1); width:100%; max-width:380px; }
        .auth-title { font-size:1.5rem; font-weight:700; margin-bottom:1.5rem; text-align:center; color:#333; }
        .auth-input { width:100%; padding:0.75rem; margin-bottom:1rem; border:1px solid #ccc; border-radius:8px; font-size:0.95rem; outline:none; transition:border .2s ease; }
        .auth-input:focus { border-color:#3b82f6; }
        .password-wrap { position:relative; margin-bottom:1rem; }
        .password-input { padding-right:15px; } /* extra padding for eye button */
        .password-toggle {
          position:absolute;
          right:-10px;
          top:35%;
          transform:translateY(-50%);
          background:none;
          border:none;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:0;
          line-height:0;
        }
        .password-toggle svg { width:20px; height:20px; stroke:#111; }
        .password-toggle:hover svg { stroke:#000; }
        .auth-button { width:100%; background:#3b82f6; color:#fff; font-size:1rem; padding:0.75rem; border:none; border-radius:8px; cursor:pointer; transition:background .2s ease; }
        .auth-button:hover { background:#2563eb; }
        .auth-footer { text-align:center; margin-top:1rem; font-size:.85rem; color:#555; }
        .auth-link { color:#3b82f6; text-decoration:none; font-weight:500; }
        .auth-link:hover { text-decoration:underline; }
      `}</style>

      <div className="auth-page">
        <form onSubmit={handleSubmit} className="auth-card">
          <h2 className="auth-title">Login</h2>

          {/* Email */}
          <input
            className="auth-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password with centered eye toggle */}
          <div className="password-wrap">
            <input
              className="auth-input password-input"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye-off SVG
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 3l18 18" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.4-4.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.5 12C4.3 7.6 8 5 12 5c4 0 7.7 2.6 9.5 7-1.1 2.7-3 4.9-5.4 6.1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                // Eye SVG
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M2.5 12C4.3 7.6 8 5 12 5s7.7 2.6 9.5 7c-1.8 4.4-5.5 7-9.5 7S4.3 16.4 2.5 12z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          {/* Role */}
          <select
            className="auth-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          <button className="auth-button">Continue</button>

          <p className="auth-footer">
            New here? <Link to="/register" className="auth-link">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}
