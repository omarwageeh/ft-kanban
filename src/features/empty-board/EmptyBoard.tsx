import React from "react";
import "./emptyBoard.css";

export default function EmptyBoard({ openModal }: { openModal: Function }) {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 text-center flex-column">
      <p className="empty-board-text">
        This board is empty. Create a new column to get started.
      </p>
      <button
        className="add-new-button"
        onClick={() => openModal("EditBoardModal")}
      >
        + Add New Column
      </button>
    </div>
  );
}
