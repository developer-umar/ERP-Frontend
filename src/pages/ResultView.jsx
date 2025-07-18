import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const StudentResultView = () => {
  const [results, setResults] = useState([]);
  const [examType, setExamType] = useState("");
  const [error, setError] = useState("");

  const fetchResults = async () => {
    try {
      const res = await axios.get(
        `https://erp-backend-r1uo.onrender.com/api/results/my${examType ? `?examType=${examType}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResults(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load results.");
      setResults([]);
    }
  };

useEffect(() => {
  if (!examType) return; // 👉 Only fetch when examType is selected
  fetchResults();
}, [examType]);

  return (
    <StudentDashboardLayout>
      <motion.div
        className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <BarChart3 size={28} className="text-teal-600" />
          <h2 className="text-2xl font-semibold text-teal-700">My Results</h2>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <label className="block mb-1 font-medium text-gray-700">
            Filter by Exam Type:
          </label>
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Exams</option>
            <option value="CT-I">CT-I</option>
            <option value="CT-II">CT-II</option>
            <option value="CT-III">CT-III</option>
            <option value="PUT">PUT</option>
          </select>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="text-red-600 font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Empty State */}
        {results.length === 0 && !error && (
          <motion.p
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No results available for the selected exam.
          </motion.p>
        )}

        {/* Results Table */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="overflow-x-auto"
          >
            <table className="w-full table-auto border-collapse rounded-lg overflow-hidden text-sm">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="text-left px-4 py-3">Subject</th>
                  <th className="text-left px-4 py-3">Exam Type</th>
                  <th className="text-left px-4 py-3">Marks</th>
                  <th className="text-left px-4 py-3">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <motion.tr
                    key={r._id}
                    className="border-b hover:bg-teal-50 transition"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">{r.subject}</td>
                    <td className="px-4 py-3 text-gray-700">{r.examType}</td>
                    <td className="px-4 py-3 font-semibold text-teal-700">
                      {r.marksObtained}/{r.totalMarks}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{r.attendance}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>
    </StudentDashboardLayout>
  );
};

export default StudentResultView;
