// src/components/UI/InputField.jsx
import React from "react";

const InputField = ({ label, type, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
