"use client";

import { ReactNode } from "react";

interface CalloutProps {
  children: ReactNode;
  type?: "info" | "warning" | "success";
}

export default function Callout({ children, type = "info" }: CalloutProps) {
  const styles = {
    info: "border-blue-400 bg-blue-50 text-blue-800 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-200",
    warning: "border-yellow-400 bg-yellow-50 text-yellow-800 dark:border-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-200",
    success: "border-green-400 bg-green-50 text-green-800 dark:border-green-500 dark:bg-green-900/30 dark:text-green-200",
  };

  return (
    <div
      className={`rounded-md border-l-4 p-4 my-4 ${styles[type]} prose-sm`}
      role="note"
    >
      {children}
    </div>
  );
}
