
import React from 'react';

const badgeVariants = {
  default: "bg-leaf-100 text-leaf-800 border border-leaf-200",
  secondary: "bg-gray-100 text-gray-800 border border-gray-200",
  outline: "bg-transparent text-leaf-800 border border-leaf-200",
  destructive: "bg-red-100 text-red-800 border border-red-200"
};

export default function Badge({ children, variant = "default", className = "" }) {
  const baseClasses = "inline-flex items-center px-2 py-0.5 rounded-full text-xs";
  const variantClasses = badgeVariants[variant] || badgeVariants.default;

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}
