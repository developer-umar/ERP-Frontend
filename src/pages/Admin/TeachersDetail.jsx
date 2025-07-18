import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2 } from "lucide-react";

const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`https://erp-backend-r1uo.onrender.com/api/auth/admin/teacher/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTeacher(res.data.teacher);
      } catch (err) {
        setError("Failed to fetch teacher details");
      }
    };

    fetchTeacher();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`https://erp-backend-r1uo.onrender.com/api/auth/admin/teacher/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      alert("✅ Teacher deleted successfully");
      navigate("/admin/teachers");
    } catch (err) {
      setLoading(false);
      alert("❌ Failed to delete teacher");
    }
  };

  if (error) {
    return (
      <AdminDashboardLayout>
        <div className="text-red-600 text-lg font-medium mt-6">{error}</div>
      </AdminDashboardLayout>
    );
  }

  if (!teacher) {
    return (
      <AdminDashboardLayout>
        <div className="mt-6 text-gray-600">Loading teacher details...</div>
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
        {/* Top Bar */}
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
            {loading ? "Deleting..." : "Delete Teacher"}
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Teacher Profile
        </h2>

        {/* Teacher Info */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Info label="Full Name" value={teacher.teacherInfo?.teacherName} />
          <Info label="Email" value={teacher.email} />
          <Info label="Teacher ID" value={teacher.teacherInfo?.teacherId} />
          <Info label="Phone" value={teacher.teacherInfo?.phoneNumber} />
          <Info label="Gender" value={teacher.teacherInfo?.gender} />
          <Info label="Program" value={teacher.teacherInfo?.program} />
          <Info label="Designation" value={teacher.teacherInfo?.designation} />
          <Info label="Subjects" value={teacher.teacherInfo?.subjects?.join(", ")} />
        </section>

        {/* Address Section */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Address & Personal Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Info label="Date of Birth" value={teacher.teacherInfo?.dateOfBirth?.substring(0, 10)} />
            <Info label="Caste" value={teacher.teacherInfo?.caste} />
            <Info label="City" value={teacher.teacherInfo?.city} />
            <Info label="State" value={teacher.teacherInfo?.state} />
            <Info label="Country" value={teacher.teacherInfo?.country} />
            <Info label="Address" value={teacher.teacherInfo?.address} />
          </div>
        </div>
      </motion.div>
    </AdminDashboardLayout>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800">{value || "N/A"}</p>
  </div>
);

export default TeacherDetail;
