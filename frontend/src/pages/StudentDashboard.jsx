import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CourseTable from "../components/CourseTable";
import { currentUser, enrolledCourses, joinCourseByCode } from "../services/api";

export default function StudentDashboard() {
  const user = currentUser();
  const [code, setCode] = useState("");
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setCourses(enrolledCourses(user?.email || ""));
  }, [user?.email]);

  function join() {
    setError("");
    try {
      joinCourseByCode(user?.email || "", code.trim());
      setCourses(enrolledCourses(user?.email || ""));
      setCode("");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-purple-700 text-white flex flex-col py-6 px-4 shadow-lg">
          <h1 className="text-2xl font-bold mb-8 tracking-wide">FRAS</h1>
          <nav className="space-y-4">
            <Link to="/student" className="nav-link">Dashboard</Link>
            <Link to="/student/today" className="nav-link">Today's Attendance</Link>
            <Link to="/student/profile" className="nav-link">Profile</Link>
          </nav>
          <div className="mt-auto pt-6 border-t border-purple-500">
            <Link to="/settings" className="nav-link">Settings</Link>
            <Link to="/help" className="nav-link">Help & Support</Link>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <Navbar />
          <div className="p-6 max-w-6xl mx-auto">
            
            {/* Student Header */}
            <div className="bg-white rounded-2xl shadow p-6 mb-6 flex items-center gap-6 hover:shadow-lg transition">
              <img
                src="/student-avatar.jpg"
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-purple-500 object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user?.name || "Student Name"}</h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>

            {/* Join Course */}
            <div className="bg-white rounded-2xl shadow p-6 mb-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-3">Join a Course</h3>
              <div className="flex gap-2">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="custom-input"
                  placeholder="Enter course code"
                />
                <button
                  onClick={join}
                  className="btn-purple"
                >
                  Join
                </button>
              </div>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            {/* Courses */}
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">My Courses</h3>
                <Link to="/student/today" className="text-purple-600 text-sm hover:underline">
                  View Today's Attendance →
                </Link>
              </div>
              <CourseTable courses={courses} />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .nav-link {
          display: block;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          transition: background 0.2s ease-in-out;
        }
        .nav-link:hover {
          background-color: #6b21a8; /* Tailwind purple-800 */
        }
        .custom-input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #d1d5db; /* gray-300 */
          border-radius: 0.5rem;
          outline: none;
          transition: all 0.2s ease-in-out;
        }
        .custom-input:focus {
          border-color: #9333ea; /* purple-600 */
          box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.3);
        }
        .btn-purple {
          padding: 0.625rem 1.25rem;
          border-radius: 0.5rem;
          background-color: #7e22ce; /* purple-700 */
          color: white;
          font-weight: 500;
          transition: background 0.2s ease-in-out;
        }
        .btn-purple:hover {
          background-color: #6b21a8; /* purple-800 */
        }
      `}</style>
    </>
  );
}
