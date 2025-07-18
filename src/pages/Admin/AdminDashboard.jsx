import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  ClipboardList,
  FileText,
  Megaphone,
  LogOut,
  Home,
  Menu,
  X,
  CalendarCheck,
  Eye,
  ChevronDown
} from "lucide-react";

const stats = [
  {
    label: "Manage Students",
    icon: Users,
    color: "bg-teal-100 text-teal-700",
    link: "/admin/filtered-students",
  },
  {
    label: "Manage Teachers",
    icon: ClipboardList,
    color: "bg-indigo-100 text-indigo-700",
    link: "/admin/teachers",
  },
  {
    label: "Leaves Pending",
    icon: FileText,
    color: "bg-orange-100 text-orange-700",
    link: "/admin/allLeaves",
  },
  {
    label: "Notices",
    icon: Megaphone,
    color: "bg-pink-100 text-pink-700",
    link: "/admin/notices",
  },
  {
    label: "Create Timetable",
    icon: CalendarCheck,
    color: "bg-green-100 text-green-700",
    link: "/admin/timetable/create",
  },
  {
    label: "View Timetables",
    icon: Eye,
    color: "bg-blue-100 text-blue-700",
    link: "/admin/timetables",
  },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTimetableSubmenu, setShowTimetableSubmenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("adminEmail");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  const navLinks = [
    { label: "Dashboard", to: "/admin/dashboard", icon: <Home size={18} /> },
    { label: "Manage Students", to: "/admin/filtered-students", icon: <Users size={18} /> },
    { label: "Manage Teachers", to: "/admin/teachers", icon: <ClipboardList size={18} /> },
    { label: "Notices", to: "/admin/notices", icon: <Megaphone size={18} /> },
  ];

  return (
    <div className="min-h-screen flex font-sans bg-slate-50">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 bg-white border-r shadow-md hidden md:flex flex-col">
        <div className="p-6 font-bold text-2xl text-teal-700 border-b">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              to={link.to}
              key={link.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                location.pathname === link.to
                  ? "bg-teal-100 text-teal-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {/* Nested Timetable Section */}
          <div className="space-y-1">
            <button
              onClick={() => setShowTimetableSubmenu(!showTimetableSubmenu)}
              className="flex items-center justify-between w-full px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <span className="flex items-center gap-2">
                <CalendarCheck size={18} /> Timetable
              </span>
              <ChevronDown size={16} className={`${showTimetableSubmenu ? 'rotate-180' : ''} transition`} />
            </button>
            {showTimetableSubmenu && (
              <div className="pl-10 space-y-1">
                <Link
                  to="/admin/timetable/create"
                  className={`block px-2 py-1 rounded-md text-sm font-medium ${
                    location.pathname === "/admin/timetable/create"
                      ? "bg-teal-100 text-teal-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Create
                </Link>
                <Link
                  to="/admin/timetables"
                  className={`block px-2 py-1 rounded-md text-sm font-medium ${
                    location.pathname === "/admin/timetables"
                      ? "bg-teal-100 text-teal-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  View
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Sidebar (Mobile) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b shadow-sm flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-bold text-teal-700">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {sidebarOpen && (
        <div className="md:hidden fixed top-14 left-0 w-full z-20 bg-white shadow-md p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              to={link.to}
              key={link.to}
              className={`block px-4 py-2 rounded-md font-medium ${
                location.pathname === link.to
                  ? "bg-teal-100 text-teal-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pl-4">
            <p className="text-sm font-semibold text-gray-600 mt-2">Timetable</p>
            <Link to="/admin/timetable/create" className="block text-sm text-gray-700 hover:bg-gray-100 rounded-md px-3 py-1">
              Create
            </Link>
            <Link to="/admin/timetables" className="block text-sm text-gray-700 hover:bg-gray-100 rounded-md px-3 py-1">
              View
            </Link>
          </div>

          <button
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            className="w-full text-left px-4 py-2 rounded-md font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} className="inline-block mr-2" />
            Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 mt-14 md:mt-0 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Admin</h1>
          <p className="text-sm text-gray-500 mb-6">
            Logged in as <span className="font-medium">{adminEmail}</span>
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Card = (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-xl p-5 shadow-sm flex items-center gap-4 hover:scale-[1.01] transition cursor-pointer ${stat.color}`}
                >
                  <stat.icon size={32} />
                  <div>
                    <p className="text-sm font-medium">{stat.label}</p>
                    {stat.value && (
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                    )}
                  </div>
                </motion.div>
              );
              return stat.link ? (
                <Link to={stat.link} key={index}>
                  {Card}
                </Link>
              ) : (
                <div key={index}>{Card}</div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
