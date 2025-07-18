
import React, { useEffect, useState } from "react";
import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout";

const TeacherMarkAttendance = () => {
  const [form, setForm] = useState({
    program: "",
    semester: "",
    section: "",
    subject: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://erp-backend-r1uo.onrender.com/api/auth/teacher/filtered-students?program=${form.program}&semester=${form.semester}&section=${form.section}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to load students");
      const json = await res.json();
      const data = json?.students || json;

      if (!Array.isArray(data)) throw new Error("Invalid student list received");

      const updated = data.map((student) => ({
        ...student,
        status: "Not Marked",
      }));

      setStudents(updated);
      setShowConfirmation(false);
    } catch (err) {
      console.error("Fetch students error:", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (index, newStatus) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[index].status = newStatus;
      return updated;
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        students: students.map((s) => ({
          studentId: s._id,
          status: s.status,
        })),
      };

      const res = await fetch("https://erp-backend-r1uo.onrender.com/api/auth/teacher/attendance/mark-batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to mark attendance");

      alert("Attendance marked successfully!");
      setStudents([]);
      setShowConfirmation(false);
    } catch (err) {
      alert("Failed to submit attendance");
    }
  };

  return (
    <TeacherDashboardLayout>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">📝 Mark Attendance</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { name: "program", label: "Program", options: ["BCA", "MCA", "BTech"] },
            { name: "semester", label: "Semester", options: ["1", "2", "3", "4"] },
            { name: "section", label: "Section", options: ["A", "B", "C"] },
            { name: "subject", label: "Subject", options: ["AI", "Maths", "OS"] },
          ].map(({ name, label, options }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-1">{label}</label>
              <select
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button
          onClick={fetchStudents}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mb-6 hover:bg-blue-700"
        >
          Load Students
        </button>

        {students.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 rounded-md shadow-sm mb-6">
              <thead className="bg-blue-100 text-blue-800 text-left">
                <tr>
                  <th className="p-3 border-b">#</th>
                  <th className="p-3 border-b">Student Name</th>
                  <th className="p-3 border-b">Roll No</th>
                  <th className="p-3 border-b">Mark As</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, idx) => (
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{idx + 1}</td>
                    <td className="p-3 border-b">{s.studentInfo?.studentName}</td>
                    <td className="p-3 border-b">{s.studentInfo?.rollNo}</td>
                    <td className="p-3 border-b space-x-2">
                      {["Present", "Absent", "Not Marked"].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(idx, status)}
                          className={`px-3 py-1 rounded-md text-sm font-medium text-white transition duration-150
                            ${status === "Present" ? "bg-green-500" :
                              status === "Absent" ? "bg-red-500" : "bg-gray-500"}
                            ${s.status === status ? "opacity-100" : "opacity-50"}`}
                        >
                          {status}
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => setShowConfirmation(true)}
              className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800"
            >
              Submit Attendance
            </button>
          </div>
        )}

        {showConfirmation && (
          <div className="mt-6 bg-yellow-50 border border-yellow-400 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Confirm Submission</h3>
            <p className="text-sm text-gray-700 mb-4">
              Present: {students.filter((s) => s.status === "Present").length} | Absent: {students.filter((s) => s.status === "Absent").length} | Not Marked: {students.filter((s) => s.status === "Not Marked").length}
            </p>
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
            >
              Confirm & Submit
            </button>
          </div>
        )}
      </div>
    </TeacherDashboardLayout>
  );
};

export default TeacherMarkAttendance;
