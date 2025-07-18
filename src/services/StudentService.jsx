// src/services/studentService.js
import axios from "axios";

const API_URL = "https://erp-backend-r1uo.onrender.com/api/auth/student";

export const loginStudent = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};

export const registerStudent = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

// src/services/studentService.js

export const getStudentProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("https://erp-backend-r1uo.onrender.com/api/auth/student/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Profile fetch failed");
  }

  return await res.json();
};

export const updateStudentProfile = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch("https://erp-backend-r1uo.onrender.com/api/auth/student/update", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // ✅ must be FormData
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Profile update failed");
  }

  return await res.json();
};

export const getStudentTimetable = async (day) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`https://erp-backend-r1uo.onrender.com/api/timetable/student?day=${day}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch timetable");
  }

  return await res.json();
};
export const getStudentAssignments= async () => {
  const res = await fetch(`https://erp-backend-r1uo.onrender.com/api/assignments/my`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch assignments");

  return await res.json();
};

// ✅ Get student own attendance
export const getStudentAttendance = async () => {
  const res = await fetch("https://erp-backend-r1uo.onrender.com/api/attendance/my", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch attendance");
  return await res.json();
};
export const getAttendanceByDate = async (date) => {
  const res = await fetch(`https://erp-backend-r1uo.onrender.com/api/attendance/my/by-date?date=${date}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch attendance by date");
  return await res.json();
};