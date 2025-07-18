import React, { useState } from "react";
import InputField from "../components/UI/InputField";
import { registerStudent } from "../services/StudentService";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const [form, setForm] = useState({ email: "", password: "", rollNo: "" });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      const res = await registerStudent(form);
      setMsg("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/student-login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-teal-700 text-center">
          Student Registration
        </h2>

        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
        {msg && <p className="text-green-600 mb-4 text-sm">{msg}</p>}

        <InputField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          ring="focus:ring-teal-500"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          ring="focus:ring-teal-500"
        />
        <InputField
          label="Roll Number"
          type="text"
          name="rollNo"
          value={form.rollNo}
          onChange={handleChange}
          ring="focus:ring-teal-500"
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegister;
