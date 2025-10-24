import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Copy, ChevronDown, ChevronUp, Home } from "lucide-react";

const TeacherLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    teacherId: "",
  });
  const [error, setError] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://erp-backend-r1uo.onrender.com/api/auth/teacher/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("teacherEmail", formData.email);
      navigate("/teacher/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 relative">

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 right-5 flex items-center gap-1 bg-white/90 backdrop-blur-md border border-teal-300 text-teal-700 px-4 py-2 rounded-full shadow-md hover:shadow-teal-300 transition"
      >
        <Home size={18} />
        Home
      </button>

      {/* Accordion Button */}
      <div className="w-full max-w-md mb-4 relative z-20">
        <button
          onClick={() => setShowCredentials(!showCredentials)}
          className="w-full bg-white/80 backdrop-blur-md border border-teal-200 rounded-2xl shadow-lg p-4 flex justify-between items-center text-teal-700 font-semibold hover:shadow-teal-300 transition-all duration-300"
        >
          <span>Demo Teacher Credentials</span>
          {showCredentials ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <AnimatePresence>
          {showCredentials && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/95 border border-teal-200 rounded-2xl shadow-lg p-5 space-y-3 text-gray-700"
            >
              <div className="flex justify-between items-center">
                <p>Email: <span className="font-medium text-gray-900">shukla@gmail.com</span></p>
                <button
                  onClick={() => handleCopy("shukla@gmail.com")}
                  className="p-1 hover:bg-teal-100 rounded-lg transition"
                >
                  <Copy size={16} />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <p>Teacher ID: <span className="font-medium text-gray-900">1234</span></p>
                <button
                  onClick={() => handleCopy("1234")}
                  className="p-1 hover:bg-teal-100 rounded-lg transition"
                >
                  <Copy size={16} />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <p>Password: <span className="font-medium text-gray-900">1234</span></p>
                <button
                  onClick={() => handleCopy("1234")}
                  className="p-1 hover:bg-teal-100 rounded-lg transition"
                >
                  <Copy size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200 relative z-10"
      >
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
          Teacher Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="teacher@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="********"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher ID
            </label>
            <input
              type="text"
              name="teacherId"
              required
              value={formData.teacherId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="TCH2025..."
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Login Button with Loader */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold transition flex justify-center items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/teacher-register")}
            className="text-teal-600 font-medium hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default TeacherLogin;
