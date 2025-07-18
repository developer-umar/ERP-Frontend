import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout"

const AdminViewTimetables = () => {
  const [timetables, setTimetables] = useState([]);
  const [filters, setFilters] = useState({
    program: "",
    semester: "",
    section: "",
  });

  const fetchTimetables = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`https://erp-backend-r1uo.onrender.com/api/auth/admin/timetables?${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTimetables(res.data.timetables || []);
    } catch (err) {
      console.error("❌ Error fetching timetables:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this timetable?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/auth/admin/delete-timetables/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchTimetables();
    } catch (err) {
      console.error("❌ Error deleting timetable:", err.message);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <AdminDashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto p-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">📋 All Created Timetables</h1>

        {/* Filters */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <select name="program" value={filters.program} onChange={handleChange} className="border p-2 rounded">
            <option value="">All Programs</option>
            {["BBA", "BCA", "BTech", "MCA", "MBA"].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select name="semester" value={filters.semester} onChange={handleChange} className="border p-2 rounded">
            <option value="">All Semesters</option>
            {[1,2,3,4,5,6,7,8].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select name="section" value={filters.section} onChange={handleChange} className="border p-2 rounded">
            <option value="">All Sections</option>
            {["A", "B", "C", "D", "E"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Timetable Cards */}
        {timetables.length === 0 ? (
          <p className="text-center text-gray-500">No timetables found for selected filters.</p>
        ) : (
          <div className="grid gap-6">
            {timetables.map((timetable) => (
              <motion.div 
                key={timetable._id} 
                className="bg-white shadow-xl rounded-2xl p-5 border border-teal-100"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="font-semibold text-teal-700">
                      {timetable.program} - Sem {timetable.semester} - Section {timetable.section} ({timetable.day})
                    </p>
                    <p className="text-sm text-gray-500">Created by: {timetable.createdBy?.email || "N/A"}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleDelete(timetable._id)}
                      className="text-red-500 border border-red-300 px-3 py-1 rounded hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-teal-100 text-teal-900">
                        <th className="px-4 py-2 border">Lecture</th>
                        <th className="px-4 py-2 border">Subject</th>
                        <th className="px-4 py-2 border">Start Time</th>
                        <th className="px-4 py-2 border">End Time</th>
                        <th className="px-4 py-2 border">Teacher</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timetable.periods.map((p, idx) => (
                        <tr key={idx} className="text-center">
                          <td className="border px-2 py-1">{p.lectureNo}</td>
                          <td className="border px-2 py-1">{p.subject}</td>
                          <td className="border px-2 py-1">{p.startTime}</td>
                          <td className="border px-2 py-1">{p.endTime}</td>
                          <td className="border px-2 py-1">
                            {p.teacher?.teacherInfo?.teacherName} ({p.teacher?.teacherInfo?.teacherId})
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AdminDashboardLayout>
  );
};

export default AdminViewTimetables;
