import React from "react";

export default function AttendanceTable({ rows, columns }) {
  if (!rows?.length) return <p className="text-gray-500">No attendance records.</p>;
  const cols = columns || Object.keys(rows[0] || {});
  return (
    <table className="w-full border mt-2 text-sm">
      <thead>
        <tr className="bg-gray-100">
          {cols.map(h => <th key={h} className="border p-2 capitalize text-left">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {cols.map(c => (
              <td key={c} className="border p-2">{String(r[c])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}