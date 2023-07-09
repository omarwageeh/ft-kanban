import React, { useState } from "react";
import "./modals.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ReactComponent as CloseIcon } from "../assets/images/close.svg";
import {
  deleteList,
  updateList,
  updateCurrentBoard,
  createList,
} from "../features/board/boardSlice";

export default function EditBoardModal({
  closeModal,
}: {
  closeModal: Function;
}) {
  const board = useAppSelector<any>((state) => state.board.currentBoard);
  const boards = useAppSelector<any>((state) => state.board.boards);
  const list = useAppSelector<any>((state) => state.board.lists);
  const [name, setName] = useState<string>(board.name);
  const [toDelete, setToDelete] = useState<Array<any>>([]);
  const [cols, setCols] = useState<object[] | undefined | any>(list);
  const dispatch = useAppDispatch();

  const mutateList = (id: number, value: string): object[] | undefined => {
    const columns: Array<any> = [];
    cols?.forEach((item: any) => columns.push({ ...item }));
    let index: number | any;
    columns.forEach((item, i) => {
      if (item.id === id) index = i;
    });
    columns[index].name = value;
    return columns;
  };
  const removeList = (id: number): object[] | undefined => {
    const columns: Array<any> = [];
    cols?.forEach((item: any) => columns.push({ ...item }));
    let index: number | any;
    columns.forEach((item, i) => {
      if (item.id === id) index = i;
    });
    setToDelete((toDelete) => [...toDelete, columns[index]]);
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
    //check if name of board changed and updateBoard accordingly
    if (name !== board.name) {
      let index = null;
      boards.forEach((item: any, i: number) => {
        if (board.id === item.id) index = i;
      });
      dispatch(updateCurrentBoard({ id: board.id, name, index }));
    }
    //loop overLists to check if one has changed and needs update or should be created
    cols?.forEach((col: any, index: number) => {
      if (col.hasOwnProperty("id") && col.name !== list[index].name) {
        dispatch(
          updateList({ listId: col.id, boardId: board.id, name: col.name })
        );
      } else if (col.hasOwnProperty("id") === false) {
        dispatch(createList({ name: col.name }));
      }
    });

    toDelete.forEach((item: any) => {
      if (item !== undefined && item.name !== undefined && item.name !== "")
        dispatch(deleteList({ boardId: board.id, listId: item.id }));
    });
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
          <div className="d-flex align-items-center board-cols" key={list.id}>
            <input
              className="input  me-3"
              value={list.name !== undefined ? list.name : ""}
              placeholder="e.g. Make coffee"
              onChange={(e) => setCols(mutateList(list.id, e.target.value))}
            ></input>
            <CloseIcon onClick={() => setCols(removeList(list.id))} />
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
