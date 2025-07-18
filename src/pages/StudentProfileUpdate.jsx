import React, { useEffect, useState } from "react";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";
import { updateStudentProfile, getStudentProfile } from "../services/StudentService";
import { motion } from "framer-motion";

const StudentProfileUpdate = () => {
  const [form, setForm] = useState({
    studentName: "",
    program: "",
    section: "",
    semester: "",
    dateOfBirth: "",
    phoneNumber: "",
    fatherName: "",
    motherName: "",
    state: "",
    country: "",
    city: "",
    address: "",
    caste: "",
    gender: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [alreadyUpdated, setAlreadyUpdated] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getStudentProfile();
        setProfile(data);

        // Set form values from already updated profile
        if (data?.studentInfo) {
          const info = data.studentInfo;
          setForm({
            studentName: info.studentName || "",
            program: info.program || "",
            section: info.section || "",
            semester: info.semester || "",
            dateOfBirth: info.dateOfBirth?.slice(0, 10) || "",
            phoneNumber: info.phoneNumber || "",
            fatherName: info.fatherName || "",
            motherName: info.motherName || "",
            state: info.state || "",
            country: info.country || "",
            city: info.city || "",
            address: info.address || "",
            caste: info.caste || "",
            gender: info.gender || "",
          });
        }

        // Check if already updated
        if (data?.studentInfo?.studentName && data?.studentInfo?.imageUrl) {
          setAlreadyUpdated(true);
        }
      } catch (err) {
        setError("Error fetching profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    if (image) formData.append("image", image);

    try {
      await updateStudentProfile(formData);
      setMessage("✅ Profile updated successfully!");
      setAlreadyUpdated(true);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <StudentDashboardLayout>
      <motion.div
        className="bg-white p-6 rounded-xl shadow-xl max-w-4xl mx-auto relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-teal-700 mb-4 border-b pb-2">
          ✏️ Update Profile
        </h2>

        {alreadyUpdated && (
          <p className="text-red-600 text-center font-semibold mb-6">
            🔒 You can only update your profile once.
          </p>
        )}

        <form onSubmit={handleSubmit} className={alreadyUpdated ? "pointer-events-none opacity-70" : ""}>
          {error && <p className="text-red-600 mb-3">{error}</p>}
          {message && <p className="text-green-600 mb-3">{message}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(form).map((key) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-600 capitalize mb-1">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={key === "dateOfBirth" ? "date" : "text"}
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  disabled={alreadyUpdated}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-teal-500 transition 
                    ${alreadyUpdated ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`w-full ${alreadyUpdated ? "cursor-not-allowed" : ""}`}
                disabled={alreadyUpdated}
                required={!alreadyUpdated}
              />
            </div>
          </div>

          {!alreadyUpdated && (
            <button
              type="submit"
              className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-semibold transition"
            >
              🔄 Submit Update
            </button>
          )}
        </form>
      </motion.div>
    </StudentDashboardLayout>
  );
};

export default StudentProfileUpdate;
