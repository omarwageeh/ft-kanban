import React from "react";
import "./column.css";
export default function Column({ children }: { children: React.ReactNode }) {
  return (
    <div className="column d-flex flex-column flex-shrink-0">{children}</div>
  );
}
