import React, { useState } from "react";
import "./modals.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateCard } from "../features/board/boardSlice";

export default function EditTaskModal({
  lists,
  closeModal,
}: {
  lists: any;
  closeModal: Function;
}) {
  const card = useAppSelector<any>((state) => state.board.selectedCard);
  const statusBeforeChange = lists.find(
    (item: any) => item.id === card.idList
  ).name;
  const [selected, setSelected] = useState<any>(statusBeforeChange);
  const [title, setTitle] = useState<string>(card.name);
  const [titleInvalid, setTitleInvalid] = useState<boolean>(false);
  const [desc, setDesc] = useState<string>(card.desc);
  const dispatch = useAppDispatch();
  const validateInput = () => {
    let isTitleValid;
    isTitleValid = title.length !== 0;
    setTitleInvalid(!isTitleValid);
    return { isTitleValid };
  };
  const saveChanges = () => {
    const { isTitleValid } = validateInput();
    if (isTitleValid) {
      if (
        card.desc !== desc ||
        card.name !== title ||
        selected !== statusBeforeChange
      ) {
        const selectedListId: string = lists.find(
          (item: any) => item.name === selected
        ).id;
        if (selectedListId) {
          dispatch(
            updateCard({
              name: title,
              desc,
              id: card.id,
              idList: selectedListId,
            })
          );
        }
      }
      closeModal("EditTaskModal");
    }
  };

  return (
    <div className="modal-wrapper" onClick={() => closeModal("EditTaskModal")}>
      <div
        className="my-modal edit-task-modal d-flex flex-shrink-0 flex-column"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="edit-modal-title">Edit Task</p>
        <p className="input-label">Title</p>
        <input
          className={
            titleInvalid === true ? `input  mb-2 invalid-input` : `input  mb-2 `
          }
          value={title}
          placeholder="e.g. Take coffee break"
          onChange={(e) => {
            if (e.target.value !== "") setTitleInvalid(false);
            setTitle(e.target.value);
          }}
        ></input>
        <p className="input-label">Description</p>
        <textarea
          className="input edit-modal-text mb-3"
          value={desc}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
          recharge the batteries a little."
          cols={100}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        {/* <div className="task-modal-subtasks-title">Subtasks (2 of 3)</div> */}
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
          className="save-btn mt-4"
          onClick={() => {
            saveChanges();
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
