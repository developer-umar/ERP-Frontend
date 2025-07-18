// src/components/UI/LoginCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginCard = ({ title, route }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className="cursor-pointer bg-white bg-opacity-90 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg rounded-xl p-6 text-center w-64"
    >
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
};

export default LoginCard;
