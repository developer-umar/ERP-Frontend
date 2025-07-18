// src/pages/student/StudentProfile.jsx
import React, { useEffect, useState } from "react";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";
import { getStudentProfile } from "../services/StudentService";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getStudentProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message || "Error loading profile");
      }
    };
    fetchProfile();
  }, []);

  const { email, rollNo, studentInfo } = profile || {};

  if (error) {
    return (
      <StudentDashboardLayout>
        <div className="text-red-600 text-center text-xl mt-10">{error}</div>
      </StudentDashboardLayout>
    );
  }

  if (!profile) {
    return (
      <StudentDashboardLayout>
        <div className="text-center text-lg mt-10">Loading profile...</div>
      </StudentDashboardLayout>
    );
  }

  return (
    <StudentDashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto mt-10 p-8 bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200"
      >
        {/* Profile Image Center */}
        {studentInfo?.imageUrl && (
          <div className="flex justify-center mb-6">
            <img
              src={studentInfo.imageUrl}
              alt="Student"
              className="w-28 h-28 rounded-full object-cover border-2 border-teal-500 shadow-md"
            />
          </div>
        )}

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-teal-700 flex items-center justify-center gap-2">
            <GraduationCap size={26} className="text-teal-600" />
            Student Profile
          </h2>
          <p className="text-sm text-slate-500">
            Your academic and personal information
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-[16px] text-gray-700 font-medium">
          <ProfileLine label="👤 Name" value={studentInfo?.studentName} />
          <ProfileLine label="🎓 Roll No" value={rollNo} />
          <ProfileLine label="📧 Email" value={email} />
          <ProfileLine label="📞 Phone" value={studentInfo?.phoneNumber} />
          <ProfileLine label="📘 Program" value={studentInfo?.program} />
          <ProfileLine label="📁 Section" value={studentInfo?.section} />
          <ProfileLine label="🗂️ Semester" value={studentInfo?.semester} />
          <ProfileLine label="🎂 DOB" value={studentInfo?.dateOfBirth?.slice(0, 10)} />
        </div>
      </motion.div>
    </StudentDashboardLayout>
  );
};

const ProfileLine = ({ label, value }) => (
  <div className="bg-teal-50 hover:bg-teal-100 transition rounded-xl p-4 border border-teal-200 shadow-sm">
    <p className="text-sm text-teal-600 font-semibold mb-1">{label}</p>
    <p className="text-gray-800">{value || "-"}</p>
  </div>
);

export default StudentProfile;
