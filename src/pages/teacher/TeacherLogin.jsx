import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const TeacherLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    teacherId: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
          Teacher Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
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

          {/* Password */}
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

          {/* Teacher ID */}
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

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Register Option */}
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
