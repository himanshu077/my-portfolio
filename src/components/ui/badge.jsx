import React from "react";

const Badge = ({ text }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white">
      {text}
    </span>
  );
};

export default Badge;
