import React, { useState } from "react";
import "./modals.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { createCard } from "../features/board/boardSlice";

export default function EditBoardModal({
  closeModal,
}: {
  closeModal: Function;
}) {
  const lists = useAppSelector<any>((state) => state.board.lists);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [selected, setSelected] = useState<string>(lists[0].name);
  const dispatch = useAppDispatch();
  const createTask = () => {
    const list = lists.find((list: any) => list.name === selected);
    console.log(selected);
    dispatch(createCard({ name: title, desc, id: list.id }));
  };
  return (
    <div
      className="modal-wrapper"
      onClick={() => closeModal("AddNewTaskModal")}
    >
      <div
        className="my-modal add-task-modal d-flex flex-shrink-0 flex-column"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="add-task-modal-title">Add New Task</p>
        <p className="input-label">Title</p>
        <input
          className="input mb-2"
          value={title}
          placeholder="e.g. Take coffee break"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <p className="input-label">Description</p>
        <textarea
          className="input add-task-text mb-3"
          value={desc}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
          recharge the batteries a little."
          onChange={(e) => setDesc(e.target.value)}
          cols={100}
        ></textarea>
        <p className="selector-label">Status</p>
        <select
          className="selector"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {lists.map((item: any, index: number) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <button
          className="create-btn mt-4"
          onClick={() => {
            createTask();
            closeModal("AddNewTaskModal");
          }}
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
