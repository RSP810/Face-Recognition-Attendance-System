import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AttendanceTable from "../components/AttendanceTable";
import { findCourseById, todaysRecordForCourse } from "../services/api";

export default function CourseDashboard(){
  const { courseId } = useParams();
  const course = findCourseById(courseId);
  const todays = todaysRecordForCourse(courseId);

  if(!course) return <div className="p-6">Course not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{course.name}</h1>
        <p className="text-sm text-gray-600 mb-4">Code: {course.code}</p>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Today's Attendance</h2>
          <AttendanceTable rows={(todays.present||[]).map(e=>({email:e}))} columns={["email"]} />
        </div>
      </div>
    </div>
  );
}