// src/layouts/StudentDashboardLayout.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaBullhorn,
  FaUserCircle,
  FaSignOutAlt,
  FaCalendarAlt,
  FaBookOpen,
  FaCheckCircle,
  FaPoll,
  FaFileAlt,
} from "react-icons/fa";

const SidebarLink = ({ to, label, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 tracking-wide 
        ${isActive
            ? "bg-white text-teal-700 shadow"
            : "text-slate-100 hover:bg-teal-700 hover:text-white"
          }`}
      >
        {icon}
        {label}
      </Link>
    </motion.div>
  );
};

const StudentDashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen font-sans bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-800 text-white p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight border-b border-teal-500 pb-3 mb-4">
            🎓 Student Panel
          </h2>

          <nav className="space-y-2">
            <SidebarLink
              to="/student-dashboard"
              label="Dashboard"
              icon={<FaUserCircle />}
            />
            <SidebarLink
              to="/student-profile"
              label="My Profile"
              icon={<FaUserCircle />}
            />
            <SidebarLink
              to="/student-profile-update"
              label="Academic Registration"
              icon={<FaClipboardList />}
            />
            <SidebarLink
              to="/student/attendance"
              label="Attendance"
              icon={<FaCheckCircle />}
            />
            <SidebarLink
              to="/student/timetable"
              label="View Timetable"
              icon={<FaCalendarAlt />}
            />
            <SidebarLink
              to="/student/assignments"
              label="Assignments"
              icon={<FaBookOpen />}
            />
            <SidebarLink
              to="/student/result"
              label="Results"
              icon={<FaPoll />}
            />
            <SidebarLink
              to="/student/leave"
              label="Leave Application"
              icon={<FaFileAlt />}
            />
            <SidebarLink
              to="/student/notices"
              label="Notices"
              icon={<FaBullhorn />}
            />
          </nav>
        </div>

        {/* 🔻 Logout Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="w-full mt-6 bg-white text-teal-700 hover:bg-teal-100 font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </motion.button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default StudentDashboardLayout;
