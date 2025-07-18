// src/pages/StudentDashboard.jsx
import React from "react";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";
import DashboardCard from "../components/UI/DashboardCard";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUserCircle,
  FaBookOpen,
  FaClipboardList,
  FaPoll,
  FaCheckCircle,
  FaFileAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "My Profile",
      icon: <FaUserCircle size={24} />,
      onClick: () => navigate("/student-profile"),
    },
    {
      title: "View Timetable",
      icon: <FaCalendarAlt size={24} />,
      onClick: () => navigate("/student/timetable"),
    },
    {
      title: "Assignments",
      icon: <FaBookOpen size={24} />,
      onClick: () => navigate("/student/assignments"),
    },
    {
      title: "Attendance",
      icon: <FaCheckCircle size={24} />,
      onClick: () => navigate("/student/attendance"),
    },
    {
      title: "Results",
      icon: <FaPoll size={24} />,
      onClick: () => navigate("/student/result"),
    },
    {
      title: "Leave Application",
      icon: <FaFileAlt size={24} />,
      onClick: () => navigate("/student/leave"),
    },
  ];

  return (
    <StudentDashboardLayout>
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-teal-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          👋 Welcome to Your Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <DashboardCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentDashboard;
