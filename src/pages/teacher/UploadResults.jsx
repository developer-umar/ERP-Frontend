import React, { useState } from "react";
import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout";

const UploadResults = () => {
  const [form, setForm] = useState({
    program: "",
    semester: "",
    section: "",
    subject: "",
    examType: "",
  });

  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // ✅ popup state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = field === "marksObtained" ? Number(value) : value;
    setStudents(updated);
  };

  const fetchStudents = async () => {
    setError("");
    try {
      const res = await fetch(
        `https://erp-backend-r1uo.onrender.com/api/auth/teacher/filtered-students?program=${form.program}&semester=${form.semester}&section=${form.section}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to load students");

      const data = await res.json();
      const fetchedStudents = data?.students || [];

      const initialized = fetchedStudents.map((s) => ({
        student: s._id,
        studentName: s.studentInfo?.studentName || "N/A",
        rollNo: s.studentInfo?.rollNo || "N/A",
        marksObtained: "",
        attendance: "NA",
      }));

      setStudents(initialized);
    } catch (err) {
      setError("Error fetching students. Try again.");
    }
  };

  const handleSubmit = async () => {
    if (!form.subject || !form.examType) {
      return setError("Please select subject and exam type.");
    }

    try {
      const payload = {
        results: students.map((s) => ({
          student: s.student,
          subject: form.subject,
          examType: form.examType,
          marksObtained: Number(s.marksObtained),
          attendance: s.attendance,
        })),
      };

      const res = await fetch("https://erp-backend-r1uo.onrender.com/api/auth/teacher/uploadResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Upload failed");

      setMessage("✅ Results uploaded successfully!");
      setShowPopup(true);
      setStudents([]);

      setTimeout(() => {
        setShowPopup(false);
        setMessage("");
      }, 3000);
    } catch (err) {
      setError("Upload failed. Please try again.");
    }
  };

  return (
    <TeacherDashboardLayout>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg relative">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">📊 Upload Results</h2>

        {error && <p className="text-red-600 font-semibold mb-3">{error}</p>}

        {/* Filter Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { name: "program", label: "Program", options: ["BCA", "MCA"] },
            { name: "semester", label: "Semester", options: ["1", "2", "3", "4", "5", "6"] },
            { name: "section", label: "Section", options: ["A", "B", "C"] },
            { name: "subject", label: "Subject", options: ["Math", "AI", "DBMS", "CN"] },
          ].map(({ name, label, options }) => (
            <div key={name}>
              <label className="text-gray-700 font-medium">{label}</label>
              <select
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="text-gray-700 font-medium">Exam Type</label>
            <select
              name="examType"
              value={form.examType}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            >
              <option value="">Select Exam Type</option>
              {["CT-I", "CT-II", "CT-III", "PUT"].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={fetchStudents}
          className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 mb-6"
        >
          Load Students
        </button>

        {students.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-md">
              <thead className="bg-purple-100 text-purple-800">
                <tr>
                  <th className="p-3 border-b">#</th>
                  <th className="p-3 border-b">Student Name</th>
                  <th className="p-3 border-b">Roll No</th>
                  <th className="p-3 border-b">Marks</th>
                  <th className="p-3 border-b">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student.student} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{idx + 1}</td>
                    <td className="p-3 border-b">{student.studentName}</td>
                    <td className="p-3 border-b">{student.rollNo}</td>
                    <td className="p-3 border-b">
                      <input
                        type="number"
                        min={0}
                        max={30}
                        value={student.marksObtained || ""}
                        onChange={(e) =>
                          handleInputChange(idx, "marksObtained", e.target.value)
                        }
                        className="w-24 px-2 py-1 border rounded-md"
                        required
                      />
                    </td>
                    <td className="p-3 border-b">
                      <select
                        value={student.attendance}
                        onChange={(e) =>
                          handleInputChange(idx, "attendance", e.target.value)
                        }
                        className="px-2 py-1 border rounded-md"
                      >
                        {["Present", "Absent", "NA"].map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
              >
                Submit Results
              </button>
            </div>
          </div>
        )}

        {/* ✅ Success Popup */}
        {showPopup && (
          <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in-up transition-all duration-300">
              <span className="text-xl">✅</span>
              <p className="font-medium">{message}</p>
            </div>
          </div>
        )}
      </div>
    </TeacherDashboardLayout>
  );
};

export default UploadResults;
