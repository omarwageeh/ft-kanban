import React, { useState } from "react";
import "./modals.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ReactComponent as CloseIcon } from "../assets/images/close.svg";
import { putCardtoList } from "../features/board/boardSlice";

export default function EditBoardModal({
  closeModal,
}: {
  closeModal: Function;
}) {
  const board = useAppSelector<any>((state) => state.board.currentBoard);
  const list = useAppSelector<any>((state) => state.board.lists);
  const [name, setName] = useState<string>(board.name);
  const [cols, setCols] = useState<object[] | undefined>(list);
  const dispatch = useAppDispatch();

  const mutateList = (index: number, value: string): object[] | undefined => {
    const columns: Array<any> = [];
    cols?.forEach((item: any) => columns.push({ ...item }));
    columns[index].name = value;
    return columns;
  };
  const removeList = (index: number): object[] | undefined => {
    const columns: Array<any> = [];
    cols?.forEach((item: any) => columns.push({ ...item }));
    delete columns[index];
    return columns;
  };
  const addList = (): object[] | undefined => {
    const columns: Array<any> = [];
    cols?.forEach((item: any) => columns.push({ ...item }));
    columns.push({});
    return columns;
  };

  const saveChanges = () => {
    //TODO dipatch action that accepts BoardName BoardColumns BoardID
  };

  return (
    <div className="modal-wrapper" onClick={() => closeModal("EditBoardModal")}>
      <div
        className="my-modal edit-board-modal d-flex flex-shrink-0 flex-column"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="edit-board-modal-title">Edit Board</p>
        <p className="input-label">Board Name</p>
        <input
          className="input mb-2"
          value={name}
          placeholder="e.g. Web Design"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <p className="input-label">Board Columns</p>
        {cols?.map((list: any, index: number) => (
          <div className="d-flex align-items-center board-cols" key={index}>
            <input
              className="input  me-3"
              value={list.name}
              placeholder="e.g. Make coffee"
              onChange={(e) => setCols(mutateList(index, e.target.value))}
            ></input>
            <CloseIcon onClick={() => setCols(removeList(index))} />
          </div>
        ))}
        <button className="add-btn" onClick={() => setCols(addList())}>
          + Add New Column
        </button>
        <button
          className="save-btn mt-4"
          onClick={() => {
            saveChanges();
            closeModal("EditBoardModal");
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
