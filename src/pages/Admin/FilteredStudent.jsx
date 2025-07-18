import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";
import { Search, Eye } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Add this line

const FilteredStudents = () => {
    const [program, setProgram] = useState("");
    const [section, setSection] = useState("");
    const [semester, setSemester] = useState("");
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");

    const fetchFilteredStudents = async () => {
        if (!program || !section || !semester) {
            setError("⚠️ Please select all fields");
            return;
        }

        try {
            const res = await axios.get(
                `https://erp-backend-r1uo.onrender.com/api/auth/admin/filter-students`,
                {
                    params: { program, section, semester },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setStudents(res.data.students);
            setError("");
        } catch (err) {
            setError("❌ Failed to fetch students");
            setStudents([]);
        }
    };

    return (
        <AdminDashboardLayout>
            <motion.div
                className="max-w-7xl mx-auto bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    🎓 Filter Students
                </h2>

                {/* 🔹 Filter Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <select
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-teal-500"
                    >
                        <option value="">Select Program</option>
                        <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        <option value="BTech">B.Tech</option>
                        <option value="BBA">BBA</option>
                        <option value="MBA">MBA</option>
                    </select>

                    <select
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-teal-500"
                    >
                        <option value="">Select Section</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>

                    <select
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-teal-500"
                    >
                        <option value="">Select Semester</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                {/* 🔎 Button */}
                <button
                    onClick={fetchFilteredStudents}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md shadow flex items-center gap-2 transition mb-4"
                >
                    <Search size={18} />
                    Filter Students
                </button>

                {/* ⚠️ Error */}
                {error && <div className="text-red-600 font-medium mb-4">{error}</div>}

                {/* 📋 Students Table */}
                {students.length > 0 && (
                    <div className="overflow-x-auto border rounded-lg shadow mt-4">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-teal-600 text-white sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Roll No</th>
                                    <th className="px-4 py-3">Phone</th>
                                    <th className="px-4 py-3">Program</th>
                                    <th className="px-4 py-3">Semester</th>
                                    <th className="px-4 py-3">Section</th>
                                    <th className="px-4 py-3">Actions</th> {/* ✅ Added actions column */}
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, idx) => (
                                    <tr
                                        key={student._id}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } border-b hover:bg-gray-100 transition`}
                                    >
                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {student.studentInfo?.studentName}
                                        </td>
                                        <td className="px-4 py-3">{student.email}</td>
                                        <td className="px-4 py-3">{student.studentInfo?.rollNo}</td>
                                        <td className="px-4 py-3">{student.studentInfo?.phoneNumber}</td>
                                        <td className="px-4 py-3">{student.studentInfo?.program}</td>
                                        <td className="px-4 py-3">{student.studentInfo?.semester}</td>
                                        <td className="px-4 py-3">{student.studentInfo?.section}</td>

                                        {/* ✅ View Details Button */}
                                        <td className="px-4 py-3">
                                            <Link
                                                to={`/admin/student/${student._id}`}
                                                className="text-teal-600 hover:text-teal-800 font-semibold flex items-center gap-1"
                                            >
                                                <Eye size={16} /> View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </AdminDashboardLayout>
    );
};

export default FilteredStudents;
