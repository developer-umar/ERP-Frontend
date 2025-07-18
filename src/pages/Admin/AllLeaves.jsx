import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trash2, Search } from "lucide-react";

const AllLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeaves = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://erp-backend-r1uo.onrender.com/api/auth/admin/allLeaves", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLeaves(res.data.leaves || []);
      setFilteredLeaves(res.data.leaves || []);
      setIsLoading(false);
    } catch (err) {
      setError("❌ Failed to fetch leave records");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  useEffect(() => {
    setFilteredLeaves(
      leaves.filter(
        (leave) =>
          leave.applicant?.studentInfo?.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          leave.applicant?.rollNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          leave.reason?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, leaves]);

  const updateStatus = async (id, status) => {
    const confirm = window.confirm(`Are you sure you want to ${status} this leave?`);
    if (!confirm) return;

    try {
      await axios.put(
        `https://erp-backend-r1uo.onrender.com/api/auth/admin/leaves/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLeaves((prev) =>
        prev.map((leave) =>
          leave._id === id ? { ...leave, status } : leave
        )
      );
      setMessage(`✅ Leave ${status.toLowerCase()} successfully!`);
      setError("");
    } catch (err) {
      setError("❌ Failed to update status");
      setMessage("");
    }
  };

  const deleteLeave = async (id) => {
    const confirm = window.confirm("⚠️ Are you sure you want to delete this leave?");
    if (!confirm) return;

    try {
      await axios.delete(`https://erp-backend-r1uo.onrender.com/api/auth/admin/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setLeaves((prev) => prev.filter((leave) => leave._id !== id));
      setMessage("Leave deleted successfully!");
      setError("");
    } catch (err) {
      setError("❌ Failed to delete leave");
      setMessage("");
    }
  };

  const SkeletonLoader = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="flex flex-col items-end justify-between space-y-4">
              <div className="h-6 bg-gray-200 rounded-full w-24"></div>
              <div className="flex gap-3">
                <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <AdminDashboardLayout>
      <motion.div
        className="max-w-7xl mx-auto mt-12 p-8 bg-gradient-to-br from-teal-50 via-white to-teal-100 shadow-2xl rounded-2xl min-h-[calc(100vh-6rem)]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500 tracking-tight">
            Leave Management
          </h2>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, roll no, or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm"
            />
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 shadow-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <XCircle size={20} />
              {error}
            </motion.div>
          )}
          {message && (
            <motion.div
              className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 shadow-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle size={20} />
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <SkeletonLoader />
        ) : filteredLeaves.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-white rounded-xl shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-600 font-medium">No leave requests found.</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your search or check back later.</p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {filteredLeaves.map((leave) => (
                <motion.div
                  key={leave._id}
                  className="bg-white border border-gray-100 rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        {leave.applicant?.studentInfo?.studentName || "N/A"}
                        {leave.applicant?.rollNo && (
                          <span className="text-sm text-gray-500">({leave.applicant.rollNo})</span>
                        )}
                      </h3>
                      <div className="mt-3 text-sm text-gray-600 space-y-2">
                        <p><span className="font-medium text-teal-700">Program:</span> {leave.applicant?.studentInfo?.program}</p>
                        <p><span className="font-medium text-teal-700">Semester:</span> {leave.applicant?.studentInfo?.semester} | <span className="font-medium text-teal-700">Section:</span> {leave.applicant?.studentInfo?.section}</p>
                        <p><span className="font-medium text-teal-700">Reason:</span> {leave.reason}</p>
                        <p><span className="font-medium text-teal-700">Duration:</span> {new Date(leave.fromDate).toLocaleDateString()} – {new Date(leave.toDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <div
                        className={`px-4 py-1.5 rounded-full text-sm font-medium w-fit shadow-sm ${
                          leave.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : leave.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {leave.status}
                      </div>
                      <div className="flex gap-3 mt-4">
                        <motion.button
                          onClick={() => updateStatus(leave._id, "Approved")}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:from-green-600 hover:to-green-700 flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <CheckCircle size={16} />
                          Approve
                        </motion.button>
                        <motion.button
                          onClick={() => updateStatus(leave._id, "Rejected")}
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:from-red-600 hover:to-red-700 flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <XCircle size={16} />
                          Reject
                        </motion.button>
                        <motion.button
                          onClick={() => deleteLeave(leave._id)}
                          className="bg-gray-100 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium shadow-md flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 size={16} />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </AdminDashboardLayout>
  );
};

export default AllLeaves;
