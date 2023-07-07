import React, { useState, useCallback, useEffect } from "react";
import TaskCard from "../task-card/TaskCard";
import Column from "../column/Column";
import NewColumn from "../new-column/NewColumn";
import TaskModal from "../../modals/TaskModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchBoards, selectCard } from "./boardSlice";
import { fetchCards, fetchList } from "./boardAPI";
import EditTaskModal from "../../modals/EditTask";

export default function Board({ shown }: { shown: boolean | null | {} }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] =
    useState<boolean>(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardStatus, currentBoard]);

  //this useEffect is for fetching the list of Cards for all the board
  useEffect(() => {
    if (list) fetchCards(currentBoard.id, setCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const openModal = useCallback((modal: string, card: object = {}) => {
    if (modal === "TaskModal") {
      setModalOpen(true);
      dispatch(selectCard(card));
    } else if (modal === "EditTaskModal") setEditModalOpen(true);
    else if (modal === "DeleteTaskModal") setDeleteTaskModalOpen(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const closeModal = useCallback((modal: string) => {
    if (modal === "TaskModal") setModalOpen(false);
    else if (modal === "EditTaskModal") setEditModalOpen(false);
    else if (modal === "DeleteTaskModal") setDeleteTaskModalOpen(false);
  }, []);

  return (
    <div
      className={`d-flex board mt-3 ps-4 pe-4 ${
        shown === true ? "margin-left" : ""
      }`}
    >
      {list?.map((item: any, index: number) => {
        let listLen = 0;
        cards?.forEach((card: any) => {
          if (card.idList === item.id) listLen += 1;
        });
        return (
          <Column key={index}>
            <p className="col-name">{item.name + " (" + listLen + ")"}</p>
            {cards?.map((card: any, index) => {
              //identifying which card belings to whitch list
              if (card?.idList === item.id) {
                return <TaskCard key={index} card={card} openModal={openModal} />;
              } else {
                return null;
              }
            })}
          </Column>
        );
      })}
      <NewColumn />
      {modalOpen === true ? (
        <TaskModal
          lists={list}
          closeModal={closeModal}
          openModal={openModal}
        />
      ) : (
        ""
      )}
      {editModalOpen === true ? (
        <EditTaskModal lists={list} closeModal={closeModal} />
      ) : (
        ""
      )}
      {deleteTaskModalOpen === true ? "" : ""}
    </div>
  );
}
