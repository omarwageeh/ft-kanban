import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteCard } from "../features/board/boardSlice";

export default function DeleteTaskModal({
  closeModal,
  openModal,
}: {
  closeModal: Function;
  openModal: Function;
}) {
  const dispatch = useAppDispatch();
  const card = useAppSelector<any>((state) => state.board.selectedCard);
  return (
    <div
      className="modal-wrapper"
      onClick={() => closeModal("DeleteTaskModal")}
    >
      <div
        className="my-modal delete-modal d-flex flex-shrink-0 flex-column"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="title mb-3">Delete this task?</p>
        <p className="mb-3">
          Are you sure you want to delete the ‘{card.name}’ task and its
          subtasks? This action cannot be reversed.
        </p>
        <div className="d-flex justify-content-between">
          <button
            className="delete-btn"
            onClick={() => {
              closeModal("DeleteTaskModal");
              dispatch(deleteCard(card.id));
            }}
          >
            Delete
          </button>
          <button
            className="cancel-btn"
            onClick={() => closeModal("DeleteTaskModal")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
