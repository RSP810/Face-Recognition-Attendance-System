import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { currentUser, todaysAttendanceForStudent } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function TodayAttendance(){
  const user = currentUser();
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{ setRows(todaysAttendanceForStudent(user?.email||"")); },[user?.email]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Today's Attendance</h1>
        <div className="space-y-3">
          {rows.map(c => (
            <div key={c.id} className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-gray-500">Course ID: {c.id}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-white text-sm ${c.attended?'bg-green-600':'bg-red-600'}`}>
                {c.attended ? 'Present' : 'Absent'}
              </div>
              <button onClick={()=>navigate(`/student/course/${c.id}`)} className="ml-3 px-3 py-2 rounded bg-blue-600 text-white text-sm">Open</button>
            </div>
          ))}
          {!rows.length && <p className="text-gray-500">No courses for today.</p>}
        </div>
      </div>
    </div>
  );
}