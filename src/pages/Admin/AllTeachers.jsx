import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";
import { useNavigate } from "react-router-dom";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("https://erp-backend-r1uo.onrender.com/api/auth/admin/all-teachers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTeachers(res.data.teachers);
        setFiltered(res.data.teachers);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch teachers", err);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const results = teachers.filter((t) =>
      t.teacherInfo?.teacherName?.toLowerCase().includes(value) ||
      t.teacherInfo?.teacherId?.toLowerCase().includes(value)
    );
    setFiltered(results);
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-7xl mx-auto mt-10 px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">All Teachers</h2>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="🔍 Search by Teacher Name or ID..."
            className="mt-4 sm:mt-0 sm:w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
          />
        </div>

        {loading ? (
          <p className="text-gray-500 text-lg">Loading teachers...</p>
        ) : filtered.length === 0 ? (
          <p className="text-red-600 text-lg">No matching teachers found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((teacher) => (
              <div
                key={teacher._id}
                onClick={() => navigate(`/admin/teacher/${teacher._id}`)}
                className="cursor-pointer bg-white border border-gray-200 hover:border-teal-500 hover:shadow-lg p-5 rounded-2xl transition duration-300 ease-in-out group"
              >
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-600 transition">
                    {teacher.teacherInfo?.teacherName || "N/A"}
                  </h3>
                  <p className="text-sm text-gray-500">Teacher ID: <span className="font-medium">{teacher.teacherInfo?.teacherId || "N/A"}</span></p>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>Email: <span className="font-medium text-gray-800">{teacher.email}</span></p>
                  <p>Program: {teacher.teacherInfo?.program || "N/A"}</p>
                  <p>Designation: {teacher.teacherInfo?.designation || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default AllTeachers;
