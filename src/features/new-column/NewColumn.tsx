import React from "react";
import "./newcolumn.css";

export default function NewColumn() {
  const handleClick = () => {};

  return (
    <div
      className="new-column d-flex flex-shrink-0 align-items-center justify-content-center"
      onClick={handleClick}
    >
      + New Column
    </div>
  );
}
