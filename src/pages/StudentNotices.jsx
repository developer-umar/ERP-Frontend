import React, { useEffect, useState } from "react";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";
import { motion } from "framer-motion";

const StudentNotices = () => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("https://erp-backend-r1uo.onrender.com/api/notices", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch notices");
        const data = await res.json();
        setNotices(data);
      } catch (err) {
        setError(err.message || "Failed to load notices");
      }
    };

    fetchNotices();
  }, []);

  return (
    <StudentDashboardLayout>
      <motion.div
        className="max-w-5xl mx-auto p-8 mt-10 bg-white shadow-2xl rounded-xl border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-teal-700 mb-6 border-b pb-3">
          Notices
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-600 font-medium">{error}</p>}

        {/* No Notice */}
        {notices.length === 0 && !error && (
          <p className="text-gray-500">No notices found.</p>
        )}

        {/* Notices List */}
        <div className="space-y-5">
          {notices.map((notice, idx) => (
            <motion.div
              key={notice._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {notice.title}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(notice.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-gray-700">{notice.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </StudentDashboardLayout>
  );
};

export default StudentNotices;
