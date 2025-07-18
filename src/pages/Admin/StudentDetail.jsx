// src/pages/StudentDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2 } from "lucide-react";

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `https://erp-backend-r1uo.onrender.com/api/auth/admin/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStudent(res.data.student);
      } catch (err) {
        setError("Failed to fetch student details");
      }
    };

    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete this student record?"
    );
    if (!confirm) return;

    try {
      setLoading(true);
      await axios.delete(
        `https://erp-backend-r1uo.onrender.com/api/auth/admin/student/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      alert("✅ Student deleted successfully.");
      navigate("/admin/filtered-students");
    } catch (err) {
      setLoading(false);
      alert("❌ Failed to delete student.");
    }
  };

  if (error) {
    return (
      <AdminDashboardLayout>
        <div className="text-red-600 text-lg font-medium mt-6">{error}</div>
      </AdminDashboardLayout>
    );
  }

  if (!student) {
    return (
      <AdminDashboardLayout>
        <div className="mt-6 text-gray-600">Loading student details...</div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <motion.div
        className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Back Button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
          >
            <Trash2 size={18} />
            {loading ? "Deleting..." : "Delete Student"}
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Student Profile
        </h2>

        {/* Student Info */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Info label="Full Name" value={student.studentInfo?.studentName} />
          <Info label="Email" value={student.email} />
          <Info label="Roll No" value={student.rollNo} />
          <Info label="Phone" value={student.studentInfo?.phoneNumber} />
          <Info label="Program" value={student.studentInfo?.program} />
          <Info label="Semester" value={student.studentInfo?.semester} />
          <Info label="Section" value={student.studentInfo?.section} />
          <Info label="Gender" value={student.studentInfo?.gender} />
        </section>

        {/* Academic Details */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Academic Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Info label="Father's Name" value={student.studentInfo?.fatherName} />
            <Info label="Mother's Name" value={student.studentInfo?.motherName} />
            <Info label="Date of Birth" value={student.studentInfo?.dateOfBirth} />
            <Info label="Address" value={student.studentInfo?.address} />
          </div>
        </div>
      </motion.div>
    </AdminDashboardLayout>
  );
};

// Reusable Component
const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800">{value || "N/A"}</p>
  </div>
);

export default StudentDetail;
