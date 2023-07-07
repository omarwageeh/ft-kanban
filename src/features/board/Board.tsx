import React, { useState, useCallback, useEffect } from "react";
import TaskCard from "../task-card/TaskCard";
import Column from "../column/Column";
import NewColumn from "../new-column/NewColumn";
import TaskModal from "../../modals/TaskModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchBoards } from "./boardSlice";
import { fetchCards, fetchList } from "./boardAPI";

export default function Board({ shown }: { shown: boolean | null | {} }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const boardStatus = useAppSelector((state) => state.board.status);
  const [list, setList] = useState<Array<object> | null>(null);
  const [cards, setCards] = useState<Array<object> | null>(null);
  const { currentBoard } = useAppSelector<any>((state) => state.board);

  //this useEffect is for fetching the List of columns
  useEffect(() => {
    if (boardStatus === "idle") {
      dispatch(fetchBoards());
    }
    if (boardStatus === "success") {
      fetchList(currentBoard.id, setList);
    }
  }, [boardStatus, currentBoard]);

  //this useEffect is for fetching the list of Cards for all the board
  useEffect(() => {
    if (list) fetchCards(currentBoard.id, setCards);
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
            //identifying which card belings to whitch list
            if (card?.idList === item.id) {
              return <TaskCard key={index} card={card} onClick={openModal} />;
            } else {
              return null;
            }
          })}
        </Column>
      ))}
      <NewColumn />
      {modalOpen === true ? <TaskModal onClick={closeModal} /> : ""}
    </div>
  );
}
