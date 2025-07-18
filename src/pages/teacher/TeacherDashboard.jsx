import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  ClipboardList,
  Megaphone,
  FileText,
  CalendarCheck,
  FileBarChart,
  UploadCloud,
} from "lucide-react";
import { Link } from "react-router-dom";
import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout";

const stats = [
  // {
  //   label: "Students",
  //   icon: Users,
  //   color: "from-teal-600 to-teal-800",
  //   link: "/teacher/students",
  //   description: "Manage student profiles and records",
  // },

  {
    label: "Mark Attendance",
    icon: CalendarCheck,
    color: "from-green-600 to-green-800",
    link: "/teacher/attendance/mark",
    description: "Record daily attendance",
  },
  {
    label: "Results",
    icon: FileBarChart,
    color: "from-sky-600 to-sky-800",
    link: "/teacher/upload-results",
    description: "View and manage student results",
  },
  {
    label: "Upload Assignment",
    icon: UploadCloud,
    color: "from-rose-600 to-rose-800",
    link: "/teacher/upload-assignment",
    description: "Share assignments with students",
  },
  {
    label: "Notices",
    icon: Megaphone,
    color: "from-pink-600 to-pink-800",
    link: "/teacher/notices",
    description: "Create and view announcements",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const TeacherDashboard = () => {
  return (
    <TeacherDashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <Link to={stat.link} key={i}>
                <motion.div
                  className={`relative group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${stat.color} text-white overflow-hidden min-h-[180px] flex flex-col justify-between`}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
                >
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-opacity duration-300"></div>
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <stat.icon size={48} className="flex-shrink-0" />
                      <p className="text-xl font-bold leading-tight">{stat.label}</p>
                    </div>
                    <p className="text-sm opacity-90">{stat.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </TeacherDashboardLayout>
  );
};

export default TeacherDashboard;