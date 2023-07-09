import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteCurrentBoard } from "../features/board/boardSlice";

export default function DeleteBoardModal({
  closeModal,
}: {
  closeModal: Function;
}) {
  const dispatch = useAppDispatch();
  const board = useAppSelector<any>((state) => state.board.currentBoard);
  return (
    <div
      className="modal-wrapper"
      onClick={() => closeModal("DeleteBoardModal")}
    >
      <div
        className="my-modal delete-modal d-flex flex-shrink-0 flex-column"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="title mb-3">Delete this board?</p>
        <p className="mb-3">
          Are you sure you want to delete the ‘{board.name}’ board? This action
          will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="btn-wrapper d-flex justify-content-between">
          <button
            className="delete-btn"
            onClick={() => {
              closeModal("DeleteBoardModal");
              dispatch(deleteCurrentBoard(board.id));
            }}
          >
            Delete
          </button>
          <button
            className="cancel-btn"
            onClick={() => closeModal("DeleteBoardModal")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
