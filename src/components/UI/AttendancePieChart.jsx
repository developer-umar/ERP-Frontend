// src/components/AttendancePieChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#00C49F", "#FF4D4D"]; // Present, Absent

const AttendancePieChart = ({ present, absent }) => {
  const data = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md mt-8">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
        Attendance Summary for curent semester 
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendancePieChart;
