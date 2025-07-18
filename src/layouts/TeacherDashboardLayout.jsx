import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  ClipboardList,
  Megaphone,
  LogOut,
  Menu,
  X,
  CalendarCheck,
  UserCircle,
  FileUp, // 🆕 For Upload
  FileBarChart // 🆕 For Results Upload
} from "lucide-react";

const TeacherDashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const teacherEmail = localStorage.getItem("teacherEmail");

  const navLinks = [
    { label: "Dashboard", to: "/teacher/dashboard", icon: <Home size={18} /> },
    { label: "Profile", to: "/teacher/profile", icon: <UserCircle size={18} /> },
    { label: "Mark Attendance", to: "/teacher/attendance/mark", icon: <CalendarCheck size={18} /> },
    { label: "Upload Assignment", to: "/teacher/upload-assignment", icon: <FileUp size={18} /> }, // 🆕
    { label: "Upload Results", to: "/teacher/upload-results", icon: <FileBarChart size={18} /> }, // 🆕
    { label: "Notices", to: "/teacher/notices", icon: <Megaphone size={18} /> },
    { label: "Academic Registration", to: "/teacher/registration", icon: <ClipboardList size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/teacher-login");
  };

  return (
    <div className="min-h-screen flex font-sans bg-slate-50">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 bg-white border-r shadow-md hidden md:flex flex-col">
        <div className="p-6 font-bold text-2xl text-indigo-700 border-b">
          Teacher Panel
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              to={link.to}
              key={link.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                location.pathname === link.to
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b shadow-sm flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-bold text-indigo-700">Teacher Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed top-14 left-0 w-full z-20 bg-white shadow-md p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              to={link.to}
              key={link.to}
              className={`block px-4 py-2 rounded-md font-medium ${
                location.pathname === link.to
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
          >
            <LogOut size={16} className="inline mr-2" />
            Logout
          </button>
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1 mt-14 md:mt-0 p-6">
        <div className="mb-6 hidden md:block">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, Teacher</h1>
          <p className="text-sm text-gray-500">
            Logged in as <span className="font-medium">{teacherEmail}</span>
          </p>
        </div>
        {children}
      </main>
    </div>
  );
};

export default TeacherDashboardLayout;
