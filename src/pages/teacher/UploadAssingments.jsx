import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Trash2, File } from "lucide-react";
import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout";

const UploadAssignment = () => {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    description: "",
    program: "",
    semester: "",
    section: "",
    dueDate: "",
  });

  const [file, setFile] = useState(null);
  const [fileLabel, setFileLabel] = useState("Choose file (jpg, png, pdf)");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [myAssignments, setMyAssignments] = useState([]);

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      setError("❌ Only JPG, PNG, or PDF files are allowed.");
      setFile(null);
      setFileLabel("Choose file (jpg, png, pdf)");
      return;
    }

    setError("");
    setFile(selectedFile);
    setFileLabel(selectedFile?.name || "Choose file (jpg, png, pdf)");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!file) return setError("📎 Please upload a file.");

    const formData = new FormData();
    for (const key in form) formData.append(key, form[key]);
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await fetch("https://erp-backend-r1uo.onrender.com/api/auth/teacher/create/assingments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Assignment uploaded successfully!");
        setForm({
          title: "",
          subject: "",
          description: "",
          program: "",
          semester: "",
          section: "",
          dueDate: "",
        });
        setFile(null);
        setFileLabel("Choose file (jpg, png, pdf)");
        fetchAssignments();
      } else {
        setError(data.message || "Upload failed.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await fetch("https://erp-backend-r1uo.onrender.com/api/auth/teacher/my-assignments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) setMyAssignments(data);
    } catch (err) {
      console.error("Error loading assignments:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;

    try {
      const res = await fetch(`https://erp-backend-r1uo.onrender.com/api/auth/teacher/assignment/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("🗑️ Assignment deleted successfully!");
        fetchAssignments();
      } else {
        setError(data.message || "Failed to delete.");
      }
    } catch (err) {
      setError("Delete failed. Try again.");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <TeacherDashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto mt-10 bg-white p-10 rounded-3xl shadow-xl border border-indigo-200"
      >
        <h2 className="text-4xl font-bold text-indigo-700 mb-8">📤 Upload Assignment</h2>

        {message && <p className="text-emerald-600 font-semibold mb-4">{message}</p>}
        {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { label: "Title", name: "title" },
            { label: "Subject", name: "subject" },
            { label: "Program", name: "program" },
            { label: "Semester", name: "semester" },
            { label: "Section", name: "section" },
            { label: "Due Date", name: "dueDate", type: "date" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            ></textarea>
          </div>

          {/* Styled File Upload Button */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Upload File</label>
            <label className="mt-1 flex items-center gap-3 px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 transition w-fit">
              <UploadCloud size={18} />
              <span>{fileLabel}</span>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-md font-semibold text-white ${
                loading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>

        {/* Uploaded Assignments */}
        <div className="mt-14">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">📚 My Uploaded Assignments</h3>

          {myAssignments.length === 0 ? (
            <p className="text-gray-500">No assignments uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {myAssignments.map((item, idx) => (
                <motion.div
                  key={item._id}
                  className="p-5 bg-indigo-50 border border-indigo-200 rounded-xl shadow-sm hover:bg-indigo-100 transition"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-indigo-800">{item.title}</h4>
                      <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        📘 {item.subject} | Program: {item.program} | Semester: {item.semester} | Section: {item.section}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.fileUrl && (
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
                        >
                          <File size={16} />
                          View
                        </a>
                      )}

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </TeacherDashboardLayout>
  );
};

export default UploadAssignment;
