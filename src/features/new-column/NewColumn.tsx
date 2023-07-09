import React from "react";
import "./newcolumn.css";

export default function NewColumn({ openModal }: { openModal: Function }) {
  return (
    <div
      className="new-column d-flex flex-shrink-0 align-items-center justify-content-center"
      onClick={() => openModal("EditBoardModal")}
    >
      + New Column
    </div>
  );
}
