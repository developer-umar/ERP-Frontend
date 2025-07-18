// src/pages/teacher/TeacherProfile.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout";
import { BadgeCheck } from "lucide-react";

const TeacherProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch("https://erp-backend-r1uo.onrender.com/api/auth/teacher/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError("❌ Error loading profile");
      }
    };

    fetchTeacher();
  }, []);

  const { email, teacherInfo } = profile || {};

  if (error) {
    return (
      <TeacherDashboardLayout>
        <div className="text-red-600 text-center text-xl mt-10">{error}</div>
      </TeacherDashboardLayout>
    );
  }


  if (!profile) {
    return (
      <TeacherDashboardLayout>
        <div className="text-center text-lg mt-10">Loading profile...</div>
      </TeacherDashboardLayout>
    );
  }

  return (
    <TeacherDashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto mt-10 p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-md border border-blue-200"
      >
        {/* Centered Profile Image */}
        {teacherInfo?.teacherImage && (
          <div className="flex justify-center mb-6">
            <img
              src={teacherInfo.teacherImage}
              alt="Teacher"
              className="w-28 h-28 rounded-full object-cover border-2 border-blue-400 shadow-md"
            />
          </div>
        )}

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-700 flex items-center justify-center gap-2">
            <BadgeCheck size={26} className="text-blue-600" />
            Teacher Profile
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Your verified academic information 
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-[16px] text-gray-700 font-medium">
          <ProfileLine label="👤 Name" value={teacherInfo?.teacherName} />
          <ProfileLine label="📧 Email" value={email} />
          <ProfileLine label="📞 Phone" value={teacherInfo?.phoneNumber} />
          <ProfileLine label="⚧ Gender" value={teacherInfo?.gender} />
          <ProfileLine label="🎓 Designation" value={teacherInfo?.designation} />
          <ProfileLine label="📘 Program" value={teacherInfo?.program} />
          <ProfileLine label="📚 Subjects" value={teacherInfo?.subjects?.join(", ")} />
        </div>
      </motion.div>
    </TeacherDashboardLayout>
  );
};

const ProfileLine = ({ label, value }) => (
  <div className="bg-blue-50 hover:bg-blue-100 transition rounded-xl p-4 border border-blue-200 shadow-sm">
    <p className="text-sm text-blue-600 font-semibold mb-1">{label}</p>
    <p className="text-gray-800">{value || "-"}</p>
  </div>
);

export default TeacherProfile;
