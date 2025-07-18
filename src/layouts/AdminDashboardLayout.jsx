import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  ClipboardList,
  Megaphone,
  LogOut,
  Menu,
  X,
  CalendarCheck,
  ChevronDown
} from "lucide-react";

const AdminDashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTimetableSubmenu, setShowTimetableSubmenu] = useState(true);
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
        <div className="p-6 font-bold text-2xl text-teal-700 border-b">Admin Panel</div>
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
              <ChevronDown size={16} className={`${showTimetableSubmenu ? "rotate-180" : ""} transition`} />
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

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b shadow-sm flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-bold text-teal-700">Admin Panel</h2>
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
                  ? "bg-teal-100 text-teal-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Nested Timetable (mobile) */}
          <div>
            <button
              onClick={() => setShowTimetableSubmenu(!showTimetableSubmenu)}
              className="w-full text-left px-4 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100 flex justify-between items-center"
            >
              <span>Timetable</span>
              <ChevronDown size={16} className={`${showTimetableSubmenu ? "rotate-180" : ""} transition`} />
            </button>
            {showTimetableSubmenu && (
              <div className="pl-6 mt-1">
                <Link
                  to="/admin/timetable/create"
                  className="block py-1 text-sm text-gray-600 hover:text-teal-700"
                  onClick={() => setSidebarOpen(false)}
                >
                  Create
                </Link>
                <Link
                  to="/admin/timetables"
                  className="block py-1 text-sm text-gray-600 hover:text-teal-700"
                  onClick={() => setSidebarOpen(false)}
                >
                  View
                </Link>
              </div>
            )}
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
        {/* Page Content */}
        {children}
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
