import React from "react";
import { Link } from "react-router-dom";
import { currentUser, logout } from "../services/api";

export default function Navbar() {
  const user = currentUser();
  return (
    <nav className="w-full bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
      <Link to={user?.role === 'faculty' ? '/faculty' : '/student'} className="font-bold">Smart Attendance</Link>
      <div className="flex items-center gap-4 text-sm">
        {user?.role === 'student' && (
          <>
            <Link to="/student" className="hover:underline">Dashboard</Link>
            <Link to="/student/today" className="hover:underline">Today</Link>
          </>
        )}
        {user?.role === 'faculty' && (
          <Link to="/faculty" className="hover:underline">Dashboard</Link>
        )}
        <Link to="/login" onClick={logout} className="hover:underline">Logout</Link>
      </div>
    </nav>
  );
}