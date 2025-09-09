import React from "react";
import Button from "./ui/button";
import { MdAdd } from "react-icons/md";

export default function Page({
  title,
  subtitle,
  actionLabel,
  onAction,
  children,
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-soil-900">
            {title}
          </h1>
          {subtitle && <p className="text-soil-700 mt-0.5">{subtitle}</p>}
        </div>
        {actionLabel && (
          <Button
            onClick={onAction}
            className="shrink-0 flex items-center gap-2"
          >
            <MdAdd size={18} />
            <span>{actionLabel}</span>
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
