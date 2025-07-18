// 🧠 Ye sab same imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";

const StudentApplyLeave = () => {
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchMyLeaves = async () => {
    try {
      const res = await axios.get("https://erp-backend-r1uo.onrender.com/api/leaves/myleaves", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLeaves(res.data.leaves);
    } catch (err) {
      console.log(err);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!reason || !fromDate || !toDate) {
      return setError("⚠️ Please fill all fields");
    }

    try {
      await axios.post(
        "https://erp-backend-r1uo.onrender.com/api/leaves/apply",
        { reason, fromDate, toDate },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccessMsg("✅ Leave applied successfully!");
      setReason("");
      setFromDate("");
      setToDate("");
      setError("");
      fetchMyLeaves();
    } catch (err) {
      setError("❌ Failed to apply for leave");
    }
  };

  // 👇 New Delete Function
  const handleDelete = async (leaveId) => {
    const confirm = window.confirm("⚠️ Are you sure you want to delete this leave?");
    if (!confirm) return;

    try {
      await axios.delete(`https://erp-backend-r1uo.onrender.com/api/leaves/${leaveId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccessMsg("🗑️ Leave deleted successfully!");
      fetchMyLeaves(); // refresh list
    } catch (err) {
      setError("❌ Failed to delete leave");
    }
  };

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  return (
    <StudentDashboardLayout>
      <motion.div
        className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-teal-700 mb-6">📝 Apply for Leave</h2>

        {/* Apply Form */}
        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label className="font-semibold">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-teal-500"
              rows="3"
              placeholder="Explain your reason..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full border px-4 py-2 rounded focus:outline-teal-500"
              />
            </div>
            <div>
              <label className="font-semibold">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full border px-4 py-2 rounded focus:outline-teal-500"
              />
            </div>
          </div>

          {error && <div className="text-red-600 font-medium">{error}</div>}
          {successMsg && (
            <div className="text-green-600 font-medium">{successMsg}</div>
          )}

          <button
            type="submit"
            className="bg-teal-600 text-white font-semibold px-5 py-2 rounded hover:bg-teal-700 transition"
          >
            Submit Leave
          </button>
        </form>

        {/* My Leave Applications */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📜 My Leave Applications
          </h3>

          {leaves.length === 0 ? (
            <p className="text-gray-500">
              You haven't applied for any leaves yet.
            </p>
          ) : (
            <div className="space-y-4">
              {leaves.map((l) => (
                <div
                  key={l._id}
                  className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center flex-wrap">
                    <div className="text-gray-800">
                      <p className="font-semibold text-teal-700">
                        Reason: <span className="text-gray-900">{l.reason}</span>
                      </p>
                      <p className="text-sm mt-1 text-gray-600">
                        From: <span>{new Date(l.fromDate).toLocaleDateString()}</span> — To:{" "}
                        <span>{new Date(l.toDate).toLocaleDateString()}</span>
                      </p>
                    </div>

                    {/* 🧱 Status + Delete Button */}
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          l.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : l.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {l.status}
                      </div>

                      {/* 🗑️ Delete Button */}
                      <button
                        onClick={() => handleDelete(l._id)}
                        className="bg-red-100 text-red-600 px-3 py-1 text-sm rounded hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </StudentDashboardLayout>
  );
};

export default StudentApplyLeave;
