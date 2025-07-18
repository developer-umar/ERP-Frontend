// pages/Admin/Timetable/TimetableList.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const TimetableList = () => {
  const [timetables, setTimetables] = useState([]);

  const fetchTimetables = async () => {
    try {
      const res = await axios.get("https://erp-backend-r1uo.onrender.com/api/timetable/timetables", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setTimetables(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTimetable = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/timetable/delete-timetable/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      fetchTimetables(); // refresh
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  return (
    <div className="p-5">
      <h2>All Timetables</h2>
      {timetables.map((tt) => (
        <div key={tt._id} className="border p-3 m-2 rounded">
          <h4>{tt.program} - Sem {tt.semester} - Section {tt.section} ({tt.day})</h4>
          {tt.periods.map((p, i) => (
            <div key={i}>
              {p.subject} - {p.teacher?.teacherInfo?.teacherName || "Unknown"}
            </div>
          ))}
          <button onClick={() => deleteTimetable(tt._id)}>🗑 Delete</button>
          <button onClick={() => window.location.href = `/admin/timetable/edit/${tt._id}`}>✏️ Edit</button>
        </div>
      ))}
    </div>
  );
};

export default TimetableList;
