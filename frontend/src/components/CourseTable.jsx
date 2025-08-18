import React from "react";

export default function CourseTable({ courses }) {
  if (!courses?.length) return <p className="text-gray-500">No courses yet.</p>;
  return (
    <table className="w-full border mt-2 text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left">Course</th>
          <th className="border p-2">Code</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(c => (
          <tr key={c.id}>
            <td className="border p-2">{c.name}</td>
            <td className="border p-2 font-mono">{c.code}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}