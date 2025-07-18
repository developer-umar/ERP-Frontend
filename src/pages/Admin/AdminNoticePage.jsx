import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Megaphone, XCircle, CheckCircle } from "lucide-react";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

const AdminNoticePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchNotices = async () => {
    try {
      const res = await axios.get("https://erp-backend-r1uo.onrender.com/api/notices", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotices(res.data);
    } catch (err) {
      setError("❌ Failed to fetch notices");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://erp-backend-r1uo.onrender.com/api/notices/create",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("✅ Notice posted successfully!");
      setTitle("");
      setContent("");
      setError("");
      fetchNotices();
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post notice");
      setTimeout(() => setError(""), 4000);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("⚠️ Are you sure you want to delete this notice?");
    if (!confirm) return;

    try {
      await axios.delete(`https://erp-backend-r1uo.onrender.com/api/auth/admin/notices/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Notice deleted successfully!");
      setError("");
      fetchNotices();
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setError("❌ Failed to delete notice");
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <AdminDashboardLayout>
      {/* ✅ Floating Toast Notification */}
      <div className="fixed top-6 right-6 z-50">
        <AnimatePresence>
          {message && (
            <motion.div
              className="bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle size={20} />
              {message}
            </motion.div>
          )}
          {error && (
            <motion.div
              className="bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <XCircle size={20} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg space-y-8">

        {/* 🔥 Title */}
        <div className="flex items-center gap-3 text-3xl font-bold text-teal-700">
          <Megaphone /> All Notices
        </div>

        {/* 📩 Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-teal-50 p-6 rounded-lg space-y-4 border border-teal-100"
        >
          <div>
            <label className="block text-teal-700 font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter notice title"
            />
          </div>
          <div>
            <label className="block text-teal-700 font-semibold mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 h-28"
              placeholder="Write your notice content here..."
            ></textarea>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow"
          >
            <Send size={18} /> Post Notice
          </motion.button>
        </form>

        {/* 📃 Notices */}
        <div className="space-y-4">
          {notices.length === 0 ? (
            <p className="text-gray-500">No notices posted yet.</p>
          ) : (
            notices.map((notice) => (
              <motion.div
                key={notice._id}
                className="border border-gray-200 bg-gray-50 p-4 rounded-md shadow-sm relative group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{notice.title}</h3>
                  <p className="text-gray-700 mt-1 whitespace-pre-line">{notice.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Posted by: {notice.postedBy?.name} ({notice.postedBy?.role}) •{" "}
                    {new Date(notice.createdAt).toLocaleString()}
                  </p>
                </div>
                {/* 🗑️ Delete Button - Top right corner hover */}
                <button
                  onClick={() => handleDelete(notice._id)}
                  className="absolute top-3 right-3 text-sm text-red-500 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-full font-medium hidden group-hover:block transition-all"
                >
                  Delete
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminNoticePage;
