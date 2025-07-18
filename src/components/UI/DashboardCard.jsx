// src/components/UI/DashboardCard.jsx
import React from "react";

const DashboardCard = ({ title, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white shadow-md hover:shadow-xl rounded-xl p-6 flex items-center gap-4 transition-all border border-teal-100 hover:border-teal-400 hover:bg-teal-50"
    >
      <div className="text-teal-700 text-3xl">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
  );
};

export default DashboardCard;
