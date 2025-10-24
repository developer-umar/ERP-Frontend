import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loginStudent } from "../services/StudentService";
import { Copy, ChevronDown, ChevronUp, Home } from "lucide-react";

const StudentLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rollNo: "",
  });
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [copiedField, setCopiedField] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginStudent(form);
      localStorage.setItem("token", res.token);
      localStorage.setItem("studentEmail", form.email);
      navigate("/student-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 right-5 flex items-center gap-1 bg-white/90 backdrop-blur-md border border-teal-300 text-teal-700 px-4 py-2 rounded-full shadow-md hover:shadow-teal-300 transition"
      >
        <Home size={18} />
        Home
      </button>

      {/* Demo Credentials Accordion */}
      <div className="w-full max-w-md mb-4 relative z-20">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full bg-white/80 backdrop-blur-md border border-teal-200 rounded-2xl shadow-lg p-4 flex justify-between items-center text-teal-700 font-semibold hover:shadow-teal-300 transition-all duration-300"
        >
          <span>Demo Student Credentials</span>
          {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/95 border border-teal-200 rounded-2xl shadow-lg p-5 space-y-3 text-gray-700"
            >
              <div className="flex justify-between items-center">
                <p>Email: <span className="font-medium text-gray-900">student_1@gmail.com</span></p>
                <button
                  onClick={() => handleCopy("student_1@gmail.com", "email")}
                  className="p-1 hover:bg-teal-100 rounded-lg transition"
                  title="Copy Email"
                >
                  <Copy size={16} />
                </button>
              </div>
              {copiedField === "email" && (
                <p className="text-green-600 text-xs mb-1">Copied!</p>
              )}

              <div className="flex justify-between items-center">
                <p>Password: <span className="font-medium text-gray-900">1234</span></p>
                <button
                  onClick={() => handleCopy("1234", "password")}
                  className="p-1 hover:bg-teal-100 rounded-lg transition"
                  title="Copy Password"
                >
                  <Copy size={16} />
                </button>
              </div>
              {copiedField === "password" && (
                <p className="text-green-600 text-xs mb-1">Copied!</p>
              )}

              <div className="flex justify-between items-center">
                <p>Roll Number: <span className="font-medium text-gray-900">MIT101</span></p>
                <button
                  onClick={() => handleCopy("MIT101", "rollNo")}
                  className="p-1 hover:bg-teal-100 rounded-lg transition"
                  title="Copy Roll Number"
                >
                  <Copy size={16} />
                </button>
              </div>
              {copiedField === "rollNo" && (
                <p className="text-green-600 text-xs">Copied!</p>
              )}
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
              placeholder="e.g. MIT101"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

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
