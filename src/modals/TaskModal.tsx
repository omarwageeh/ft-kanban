import React, { useEffect, useRef, useState } from "react";
import "./modals.css";
import dots from "../assets/images/dotsbutton.png";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteCard, putCardtoList } from "../features/board/boardSlice";
function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function TaskModal({
  lists,
  closeModal,
  openModal,
}: {
  lists: any;
  closeModal: Function;
  openModal: Function;
}) {
  const card = useAppSelector<any>((state) => state.board.selectedCard);
  const [selected, setSelected] = useState<any>(
    lists.find((item: any) => item.id === card.idList).name
  );
  const [dotOpen, setDotOpen] = useState<boolean>(false);
  const prevSelected = usePrevious(selected);
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector<any>((state) => state.board.currentBoard);
  const handleChange = (e: any) => {
    setSelected(e.target.value);
  };
  const handleDotsClicked = (e: any) => {
    setDotOpen((dotOpen) => !dotOpen);
    e.stopPropagation();
  };

  useEffect(() => {
    if (prevSelected !== selected && prevSelected !== undefined) {
      const selectedList = lists.find((item: any) => item.name === selected);
      if (selectedList) {
        dispatch(
          putCardtoList({
            name: card.name,
            desc: card.desc,
            cardId: card.id,
            currentBoardId: currentBoard.id,
            list: selectedList,
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);
  console.log(selected);

  return (
    <div className="modal-wrapper" onClick={() => closeModal("TaskModal")}>
      <div
        className="my-modal task-modal d-flex flex-shrink-0 flex-column"
        onClick={(e) => {
          setDotOpen(false);
          e.stopPropagation();
        }}
      >
        <div className="d-flex justify-content-between">
          <p className="task-modal-title">{card?.name}</p>
          <div>
            <button
              className="dots-button"
              onClick={(e) => handleDotsClicked(e)}
            >
              <img className="h-100" src={dots} alt="" />
              {dotOpen === true ? (
                <div className="menu d-flex flex-column p-2">
                  <button
                    className="edit mb-1"
                    onClick={() => {
                      closeModal("TaskModal");
                      openModal("EditTaskModal");
                    }}
                  >
                    Edit Task
                  </button>
                  <button
                    className="delete"
                    onClick={() => {
                      closeModal("TaskModal");
                      openModal("DeleteTaskModal");
                      //TODO copy Dispatch Action to delete task modal once competeled
                     // dispatch(deleteCard(card.id));
                    }}
                  >
                    Delete Task
                  </button>
                </div>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
        <div className="task-modal-text mb-3">{card?.desc}</div>
        {/* <div className="task-modal-subtasks-title">Subtasks (2 of 3)</div> */}
        <p className="selector-label">Current Status</p>
        <select
          className="selector"
          value={selected}
          onChange={(e) => handleChange(e)}
        >
          {lists.map((item: any, index: number) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
