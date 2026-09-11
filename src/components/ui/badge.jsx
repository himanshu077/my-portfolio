import React from "react";
import { cn } from "../../lib/utils";

const Badge = ({ text, className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-neutrals-600/70 bg-neutrals-700/50 px-3 py-1 text-sm font-medium text-neutrals-200",
        className
      )}
    >
      {text}
    </span>
  );
};

export default Badge;
