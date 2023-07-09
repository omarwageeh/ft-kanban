import React, { useState } from "react";
import "./modals.css";
import { useAppDispatch } from "../app/hooks";
import { ReactComponent as CloseIcon } from "../assets/images/close.svg";
import { createBoard } from "../features/board/boardSlice";

export default function AddNewBoardModal({
  closeModal,
}: {
  closeModal: Function;
}) {
  const [cols, setCols] = useState<Array<any>>([]);
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();
  const removeList = (index: number) => {
    const shallowCols = [...cols];
    delete shallowCols[index];
    return shallowCols;
  };
  const createNewBoard = () => {
    dispatch(
      createBoard({
        name,
        listNames: cols.map((col) => col.name),
      })
    );
  };
  return (
    <div className="modal-wrapper" onClick={() => closeModal("EditBoardModal")}>
      <div
        className="my-modal edit-board-modal d-flex flex-shrink-0 flex-column"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="edit-board-modal-title">Add New Board</p>
        <p className="input-label">Name</p>
        <input
          className="input mb-2"
          value={name}
          placeholder="e.g. Web Design"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <p className="input-label">Columns</p>
        {cols?.map((list: any, index: number) => {
          console.log(cols);
          if (list)
            return (
              <div className="d-flex align-items-center board-cols" key={index}>
                <input
                  className="input  me-3"
                  value={list.name !== undefined ? list.name : ""}
                  placeholder="e.g. Make coffee"
                  onChange={(e) =>
                    setCols((cols) =>
                      cols.map((col, ind) => {
                        if (ind === index)
                          return { ...col, name: e.target.value };
                        else return col;
                      })
                    )
                  }
                ></input>
                <CloseIcon onClick={() => setCols(removeList(index))} />
              </div>
            );
          else return "";
        })}
        <button
          className="add-btn"
          onClick={() => setCols((cols) => [...cols, {}])}
        >
          + Add New Column
        </button>
        <button
          className="save-btn mt-4"
          onClick={() => {
            createNewBoard();
            closeModal("AddNewBoardModal");
          }}
        >
          Create New Board
        </button>
      </div>
    </div>
  );
}
