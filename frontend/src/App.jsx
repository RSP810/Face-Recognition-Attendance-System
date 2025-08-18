/**
 * App.jsx
 * ------------------------------
 * This is the main entry point of the React app.
 * It defines routes for Login, Register, Faculty Dashboard,
 * Student Dashboard, Today’s Attendance, and Course Dashboard.
 * 
 * Purpose: Keeps routing centralized.
 */
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TodayAttendance from "./pages/TodayAttendance";
import CourseDashboard from "./pages/CourseDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/today" element={<TodayAttendance />} />
        <Route path="/student/course/:courseId" element={<CourseDashboard />} />
      </Routes>
    </Router>
  );
}