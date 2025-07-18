import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

const AdminCreateTimetable = () => {
  const [form, setForm] = useState({
    program: "",
    semester: "",
    section: "",
    day: "",
  });

  const [periods, setPeriods] = useState(
    Array.from({ length: 7 }, (_, i) => ({
      lectureNo: i + 1,
      subject: "",
      startTime: "",
      endTime: "",
      teacher: "",
    }))
  );

  const [teachers, setTeachers] = useState([]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePeriodChange = (index, e) => {
    const updated = [...periods];
    updated[index] = { ...updated[index], [e.target.name]: e.target.value };
    setPeriods(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formatTime = (time) => {
        if (!time) return "";
        const [h, m] = time.trim().split(":");
        const hours = String(parseInt(h)).padStart(2, "0");
        const minutes = String(parseInt(m)).padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      const formattedPeriods = periods.map((p) => ({
        ...p,
        startTime: formatTime(p.startTime),
        endTime: formatTime(p.endTime),
      }));

      const payload = {
        ...form,
        periods: formattedPeriods,
      };

      const res = await axios.post(
        "https://erp-backend-r1uo.onrender.com/api/auth/admin/createTimetable",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(res.data.message);
      setForm({ program: "", semester: "", section: "", day: "" });
      setPeriods(
        Array.from({ length: 7 }, (_, i) => ({
          lectureNo: i + 1,
          subject: "",
          startTime: "",
          endTime: "",
          teacher: "",
        }))
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create timetable");
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("https://erp-backend-r1uo.onrender.com/api/auth/admin/teachers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTeachers(res.data.data);
    } catch (err) {
      console.error("Error loading teachers:", err.message);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <AdminDashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-2xl my-10"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Create Timetable
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "program", options: ["BBA", "BCA", "BTech", "MCA", "MBA"], label: "Program" },
              { name: "semester", options: [1, 2, 3, 4, 5, 6, 7, 8], label: "Semester" },
              { name: "section", options: ["A", "B", "C", "D", "E"], label: "Section" },
              { name: "day", options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], label: "Day" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <select
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Lecture Periods
            </h2>
            <div className="space-y-4">
              {periods.map((period, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Lecture No
                    </label>
                    <input
                      type="number"
                      name="lectureNo"
                      placeholder="Lecture No"
                      value={period.lectureNo}
                      onChange={(e) => handlePeriodChange(index, e)}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={period.subject}
                      onChange={(e) => handlePeriodChange(index, e)}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={period.startTime}
                      onChange={(e) => handlePeriodChange(index, e)}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      End Time
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={period.endTime}
                      onChange={(e) => handlePeriodChange(index, e)}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Teacher
                    </label>
                    <select
                      name="teacher"
                      value={period.teacher}
                      onChange={(e) => handlePeriodChange(index, e)}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Teacher</option>
                      {teachers.map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.teacherInfo?.teacherName} ({t.teacherInfo?.teacherId})
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
          >
            Create Timetable
          </motion.button>
        </form>
      </motion.div>
    </AdminDashboardLayout>
  );
};

export default AdminCreateTimetable;
