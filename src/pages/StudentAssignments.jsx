import React, { useEffect, useState } from "react";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";
import { getStudentAssignments } from "../services/StudentService";
import { motion } from "framer-motion";

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getStudentAssignments();
        setAssignments(data);
      } catch (err) {
        setError(err.message || "Failed to load assignments");
      }
    };

    fetchAssignments();
  }, []);

  
  const formatDate = (dateStr) => {
    try {
      if (!dateStr) return "Invalid date";
      const cleaned = dateStr.trim().replace(/^0+/, "20");
      const date = new Date(cleaned);
      return isNaN(date)
        ? "Invalid date"
        : date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
    } catch {
      return "Invalid date";
    }
  };

  const handleFileDownload = async (url, fileName = "assignment") => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("❌ File download failed");
    }
  };

  return (
    <StudentDashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-md border border-slate-200"
      >
        <h2 className="text-2xl font-semibold text-teal-700 border-b pb-3 mb-6">
          My Assignments
        </h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        {assignments.length === 0 && !error ? (
          <p className="text-gray-600">No assignments available at the moment.</p>
        ) : (
          <div className="space-y-6">
            {assignments.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-50 border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium text-slate-700">Subject:</span>{" "}
                    {item.subject}
                  </p>
                  <p className="text-sm text-gray-700">{item.description}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Due:</span> {formatDate(item.dueDate)}
                  </p>
                </div>

                {item.fileUrl && (
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        handleFileDownload(item.fileUrl, `${item.title || "assignment"}.pdf`)
                      }
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-medium text-sm transition"
                    >
                      Download PDF
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </StudentDashboardLayout>
  );
};

export default StudentAssignments;
