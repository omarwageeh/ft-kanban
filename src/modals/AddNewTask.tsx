import React from "react";
import "./modals.css";
export default function AddNewTaskModal({ onClick }: { onClick: Function }) {
  return (
    <div className="modal-wrapper" onClick={() => onClick()}>
      <div
        className="add-task-modal my-modal"
        onClick={(e) => e.stopPropagation}
      ></div>
    </div>
  );
}
