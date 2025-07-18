// ✅ src/pages/StudentAttendance.jsx
import React, { useEffect, useState } from "react";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";
import { getAttendanceByDate, getStudentAttendance } from "../services/StudentService";
import AttendancePieChart from "../components/UI/AttendancePieChart";

const StudentAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");
  const [allAttendance, setAllAttendance] = useState([]);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [notMarkedCount, setNotMarkedCount] = useState(0);

  // ✅ Load all attendance summary on mount
  useEffect(() => {
    const fetchAllAttendance = async () => {
      try {
        const allData = await getStudentAttendance();
        setAllAttendance(allData);

        const present = allData.filter((d) => d.status === "Present").length;
        const absent = allData.filter((d) => d.status === "Absent").length;
        const notMarked = allData.filter((d) => d.status === "Not Marked").length;

        setPresentCount(present);
        setAbsentCount(absent);
        setNotMarkedCount(notMarked);
      } catch (err) {
        console.error("Error fetching total attendance:", err.message);
      }
    };

    fetchAllAttendance();
  }, []);

  // ✅ Load today's attendance by default
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    fetchAttendance(today);
  }, []);

  const fetchAttendance = async (date) => {
    try {
      const data = await getAttendanceByDate(date);
      setAttendanceList(data);
      setError("");
    } catch (err) {
      setAttendanceList([]);
      setError(err.response?.data?.message || "Failed to fetch attendance");
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchAttendance(date);
  };

  return (
    <StudentDashboardLayout>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">📋 My Attendance</h2>

        <AttendancePieChart
          present={presentCount}
          absent={absentCount}
          notMarked={notMarkedCount}
          label="Total"
        />

        <div className="my-6">
          <label htmlFor="date" className="font-medium text-lg">Select Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        {attendanceList.length === 0 && !error && (
          <div className="text-gray-500 text-md">No attendance records found for this date.</div>
        )}

        {attendanceList.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 rounded-md shadow-sm mb-6">
              <thead className="bg-blue-100 text-blue-800 text-left">
                <tr>
                  <th className="p-3 border-b border-gray-200">Subject</th>
                  <th className="p-3 border-b border-gray-200">Status</th>
                  <th className="p-3 border-b border-gray-200">Date</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition duration-150">
                    <td className="p-3 border-b border-gray-100 font-semibold">{item.subject}</td>
                    <td className="p-3 border-b border-gray-100">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                          item.status === "Present"
                            ? "bg-green-500"
                            : item.status === "Absent"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 border-b border-gray-100 text-sm text-gray-700">
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentAttendance;
