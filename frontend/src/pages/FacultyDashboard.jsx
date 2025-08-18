import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import CourseTable from "../components/CourseTable";
import AttendanceTable from "../components/AttendanceTable";
import { currentUser, createCourse, listCoursesByFaculty, markAttendanceToday, todaysRecordForCourse } from "../services/api";

export default function FacultyDashboard(){
  const user = currentUser();
  const [name, setName] = useState("");
  const [courses, setCourses] = useState(() => listCoursesByFaculty(user?.email || ""));
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || null);
  const [uploadPreview, setUploadPreview] = useState(null);

  const todaysRecord = useMemo(() => selectedCourseId ? todaysRecordForCourse(selectedCourseId) : null, [selectedCourseId, courses]);

  function addCourse(){
    if(!name.trim()) return;
    const c = createCourse(name.trim(), user?.email || "");
    const updated = listCoursesByFaculty(user?.email || "");
    setCourses(updated);
    setSelectedCourseId(c.id);
    setName("");
  }

  function onUpload(e){
    const file = e.target.files?.[0];
    if(!file || !selectedCourseId) return;
    const reader = new FileReader();
    reader.onload = () => setUploadPreview(reader.result);
    reader.readAsDataURL(file);
    // Demo: Pretend ML recognized two emails
    const present = ["student1@example.com", "student2@example.com"];
    markAttendanceToday(selectedCourseId, present);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Faculty Dashboard</h1>

        {/* Create Course */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="font-semibold mb-3">Create a Course</h2>
          <div className="flex gap-2">
            <input value={name} onChange={e=>setName(e.target.value)} className="border rounded p-2 flex-1" placeholder="Course name" />
            <button onClick={addCourse} className="px-4 py-2 rounded bg-blue-600 text-white">Create</button>
          </div>
          <p className="text-xs text-gray-500 mt-2">A short code will be auto-generated for students to join.</p>
        </div>

        {/* Courses */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="font-semibold mb-3">My Courses</h2>
          <CourseTable courses={courses} />
          {!!courses.length && (
            <div className="mt-3">
              <label className="text-sm mr-2">Select course:</label>
              <select className="border p-2 rounded" value={selectedCourseId||""} onChange={e=>setSelectedCourseId(Number(e.target.value))}>
                {courses.map(c=> <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Take Attendance */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-3">Take Attendance from Photo</h2>
          <input type="file" accept="image/*" onChange={onUpload} />
          {uploadPreview && (
            <div className="mt-4">
              <img src={uploadPreview} alt="preview" className="max-h-56 rounded" />
              <p className="text-sm text-gray-600 mt-2">Mock recognition complete. Marked two students present for today.</p>
            </div>
          )}
          {selectedCourseId && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Today's Present List</h3>
              <AttendanceTable rows={(todaysRecord?.present || []).map(e=>({email:e}))} columns={["email"]} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}