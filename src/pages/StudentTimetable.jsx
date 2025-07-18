import React, { useEffect, useState } from "react";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";
import { getStudentTimetable } from "../services/StudentService";
import { motion } from "framer-motion";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// 🔁 24-hour -> 12-hour format converter
const formatTime = (time) => {
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr.padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert 0 to 12
  return `${hour}:${minute} ${ampm}`;
};

const StudentTimetable = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const data = await getStudentTimetable(selectedDay);
        if (data?.periods?.length > 0) {
          data.periods.sort((a, b) => a.lectureNo - b.lectureNo);
        }
        setTimetable(data);
        setError("");
      } catch (err) {
        setError(err.message);
        setTimetable(null);
      }
    };

    fetchTimetable();
  }, [selectedDay]);

  return (
    <StudentDashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md border border-gray-200"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h2 className="text-2xl font-semibold text-gray-800">Class Timetable</h2>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border border-gray-300 text-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Error or Timetable */}
        {error ? (
          <p className="text-red-600 text-base">{error}</p>
        ) : timetable && timetable.periods?.length > 0 ? (
          <div className="flex flex-col gap-6">
            {timetable.periods.map((period, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-lg px-6 py-5 shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="space-y-3">
                  {/* Lecture No */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-medium tracking-wide">Lecture No</p>
                    <p className="text-base font-semibold text-slate-800 mt-1">
                      {period.lectureNo}
                    </p>
                  </div>

                  {/* Subject */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-medium tracking-wide">Subject</p>
                    <h3 className="text-base font-semibold text-slate-800 mt-1">
                      {period.subject || "—"}
                    </h3>
                  </div>

                  {/* Teacher */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-medium tracking-wide">Teacher</p>
                    <p className="text-sm text-slate-700 mt-1">
                      {period.teacher?.teacherInfo?.teacherName || "—"}
                    </p>
                  </div>

                  {/* Timing */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-medium tracking-wide">Timing</p>
                    <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 text-sm rounded-md mt-1">
                      {formatTime(period.startTime)} - {formatTime(period.endTime)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No timetable available for {selectedDay}</p>
        )}
      </motion.div>
    </StudentDashboardLayout>
  );
};

export default StudentTimetable;
