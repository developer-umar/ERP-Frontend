import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginStudent } from "../services/StudentService";

const StudentLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rollNo: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginStudent(form);
      localStorage.setItem("token", res.token);
      localStorage.setItem("studentEmail", form.email);
      navigate("/student-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
          Student Login
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
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="student@example.com"
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
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="********"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roll Number
            </label>
            <input
              type="text"
              name="rollNo"
              required
              value={form.rollNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g. 23UCS123"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-4 text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/student-register"
            className="text-teal-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
