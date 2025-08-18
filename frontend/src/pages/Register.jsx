import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register(){
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  function submit(e){ e.preventDefault(); navigate('/login'); }

  return (
    <>
      <style>{`
        /* Embedded CSS (keeps page self-contained and consistent with Login) */
        .auth-page { min-height:100vh; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#eceff1,#f5f7fa); font-family:'Segoe UI', sans-serif; }
        .auth-card { background:#fff; padding:2rem; border-radius:16px; box-shadow:0 8px 20px rgba(0,0,0,0.1); width:100%; max-width:400px; }
        .auth-title { font-size:1.5rem; font-weight:700; margin-bottom:1.5rem; text-align:center; color:#333; }
        .auth-input { width:100%; padding:0.75rem; margin-bottom:1rem; border:1px solid #ccc; border-radius:8px; font-size:0.95rem; outline:none; transition:border .2s ease; }
        .auth-input:focus { border-color:#10b981; }
        .auth-button { width:100%; background:#10b981; color:#fff; font-size:1rem; padding:0.75rem; border:none; border-radius:8px; cursor:pointer; transition:background .2s ease; }
        .auth-button:hover { background:#059669; }
        .auth-footer { text-align:center; margin-top:1rem; font-size:.85rem; color:#555; }
        .auth-link { color:#10b981; text-decoration:none; font-weight:500; }
        .auth-link:hover { text-decoration:underline; }
      `}</style>

      <div className="auth-page">
        <form onSubmit={submit} className="auth-card">
          <h2 className="auth-title">Register</h2>
          <input className="auth-input" placeholder="Full Name" required />
          <input className="auth-input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="auth-input" placeholder="Password" type="password" required />
          <input className="auth-input" placeholder="Confirm Password" type="password" required />
          <select className="auth-input" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
          <button className="auth-button">Create Account</button>
          <p className="auth-footer">Have an account? <Link className="auth-link" to="/login">Login</Link></p>
        </form>
      </div>
    </>
  );
}