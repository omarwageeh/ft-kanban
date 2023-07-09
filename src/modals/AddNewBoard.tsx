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
  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const [titlesInvalid, setTitlesInvalid] = useState<Array<number | null>>([]);
  const dispatch = useAppDispatch();
  const removeList = (index: number) => {
    const shallowCols = [...cols];
    delete shallowCols[index];
    return shallowCols;
  };

  const validateInput = () => {
    let isNameValid,
      isTitlesValid,
      invalidTitles: Array<number> = [];
    cols.forEach((col, index) => {
      if (col) {
        if (col.name === "") {
          invalidTitles.push(index);
        }
      }
    });
    isNameValid = name.length !== 0;
    isTitlesValid = invalidTitles.length === 0;
    setNameInvalid(!isNameValid);
    if (!isTitlesValid) setTitlesInvalid(invalidTitles);
    return { isNameValid, isTitlesValid };
  };

  const createNewBoard = () => {
    const { isNameValid, isTitlesValid } = validateInput();

    if (isNameValid && isTitlesValid) {
      dispatch(
        createBoard({
          name,
          listNames: cols
            .filter((col) => col !== undefined)
            .map((col) => col.name),
        })
      );
      closeModal("AddNewBoardModal");
    }
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
          className={
            nameInvalid === true ? `input  me-3 invalid-input` : `input  me-3 `
          }
          value={name}
          placeholder="e.g. Web Design"
          onChange={(e) => {
            if (e.target.value !== "") setNameInvalid(false);
            setName(e.target.value);
          }}
        ></input>
        <p className="input-label">Columns</p>
        {cols?.map((list: any, index: number) => {
          if (list)
            return (
              <div className="d-flex align-items-center board-cols" key={index}>
                <input
                  type="text"
                  className={
                    titlesInvalid?.includes(index) === true
                      ? `input  me-3 invalid-input`
                      : `input  me-3 `
                  }
                  value={list.name !== undefined ? list.name : ""}
                  placeholder="e.g. Make coffee"
                  onChange={(e) => {
                    if (e.target.value !== "")
                      setTitlesInvalid((titlesInvalid) => {
                        return titlesInvalid.map((title: any) => {
                          if (title !== index) return title;
                          return null;
                        });
                      });
                    setCols((cols) =>
                      cols.map((col, ind) => {
                        if (ind === index) {
                          return { ...col, name: e.target.value };
                        } else return col;
                      })
                    );
                  }}
                ></input>
                <CloseIcon onClick={() => setCols(removeList(index))} />
              </div>
            );
          else return "";
        })}
        <button
          className="add-btn"
          onClick={() => setCols((cols) => [...cols, { name: "" }])}
        >
          + Add New Column
        </button>
        <button
          className="save-btn mt-4"
          onClick={() => {
            createNewBoard();
          }}
        >
          Create New Board
        </button>
      </div>
    </div>
  );
}
