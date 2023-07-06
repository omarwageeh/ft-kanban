import React, { useState, useCallback, useEffect } from "react";
import TaskCard from "../task-card/TaskCard";
import Column from "../column/Column";
import NewColumn from "../new-column/NewColumn";
import TaskModal from "../../modals/TaskModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchBoards } from "./boardSlice";

export default function Board({ shown }: { shown: boolean | null | {} }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const boardStatus = useAppSelector((state) => state.board.status);
  const [list, setList] = useState<Array<object> | null>(null);
  const [cards, setCards] = useState<Array<object> | null>(null);
  const { boards, currentBoard } = useAppSelector<any>((state) => state.board);

  const fetchList: any = async () => {
    try {
      const response = await fetch(
        `https://api.trello.com/1/boards/${currentBoard.id}/lists?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`
      );
      const ret = await response.json();
      setList(ret);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchCards: any = async () => {
    try {
      const response = await fetch(
        `https://api.trello.com/1/boards/${currentBoard.id}/cards?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`
      );
      const ret = await response.json();
      setCards(ret);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (boardStatus === "idle") {
      dispatch(fetchBoards());
    }
    if (boardStatus === "success") {
      fetchList();
    }
  }, [boardStatus, currentBoard]);
  useEffect(() => {
    if (list) fetchCards();
  }, [list]);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);
  return (
    <div
      className={`d-flex board mt-3 ps-4 pe-4 ${
        shown === true ? "margin-left" : ""
      }`}
    >
      {list?.map((item: any, index: number) => (
        <Column key={index}>
          <p className="col-name">{item.name}</p>
          {cards?.map((card: any, index) => {
            if (card?.idList === item.id)
              return <TaskCard key={index} card={card} onClick={openModal} />;
          })}
        </Column>
      ))}
      <NewColumn />
      {modalOpen === true ? <TaskModal onClick={closeModal} /> : ""}
    </div>
  );
}
