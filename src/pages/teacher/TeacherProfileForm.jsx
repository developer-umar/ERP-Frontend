import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout";

const TeacherProfileForm = () => {
  const [form, setForm] = useState({
    teacherName: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    state: "",
    country: "",
    city: "",
    address: "",
    caste: "",
    subjects: "",
    designation: "",
    program: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [alreadyUpdated, setAlreadyUpdated] = useState(false);

  // ✅ Fetch teacher profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://erp-backend-r1uo.onrender.com/api/auth/teacher/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();

        const info = data?.teacherInfo || {};
        setForm({
          teacherName: info.teacherName || "",
          gender: info.gender || "",
          dateOfBirth: info.dateOfBirth?.slice(0, 10) || "",
          phoneNumber: info.phoneNumber || "",
          state: info.state || "",
          country: info.country || "",
          city: info.city || "",
          address: info.address || "",
          caste: info.caste || "",
          subjects: info.subjects?.join(", ") || "",
          designation: info.designation || "",
          program: info.program || "",
        });

        // ✅ Lock form if already filled
        if (info.teacherName && info.teacherImage) {
          setAlreadyUpdated(true);
        }
      } catch (err) {
        setError("Error loading profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
      const res = await fetch("https://erp-backend-r1uo.onrender.com/api/auth/teacher/profile-register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Profile updated successfully!");
        setAlreadyUpdated(true);
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <TeacherDashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-white to-rose-50 rounded-3xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-rose-800 mb-4">📄 Teacher Academic Profile</h2>

        {alreadyUpdated && (
          <p className="text-red-600 text-center font-semibold mb-6">
            🔒 You can only submit your profile once.
          </p>
        )}

        <form onSubmit={handleSubmit} className={alreadyUpdated ? "pointer-events-none opacity-70" : ""}>
          {error && <p className="text-red-600 mb-3">{error}</p>}
          {message && <p className="text-green-600 mb-3">{message}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(form).map((key) => (
              <div key={key}>
                <label className="block text-sm text-slate-600 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={key === "dateOfBirth" ? "date" : "text"}
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  disabled={alreadyUpdated}
                  className={`w-full border px-3 py-2 rounded-md ${
                    alreadyUpdated ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-sm text-slate-600 mb-1">Upload Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
                disabled={alreadyUpdated}
                required={!alreadyUpdated}
              />
            </div>
          </div>

          {!alreadyUpdated && (
            <button
              type="submit"
              className="mt-6 bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-md font-semibold"
            >
              Save Profile
            </button>
          )}
        </form>
      </motion.div>
    </TeacherDashboardLayout>
  );
};

export default TeacherProfileForm;
