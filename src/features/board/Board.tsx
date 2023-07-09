import React, { useState, useCallback, useEffect } from "react";
import TaskCard from "../task-card/TaskCard";
import Column from "../column/Column";
import NewColumn from "../new-column/NewColumn";
import TaskModal from "../../modals/TaskModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addList, fetchBoards, selectCard } from "./boardSlice";
import { fetchCards, fetchList } from "./boardAPI";
import EditTaskModal from "../../modals/EditTask";
import DeleteTaskModal from "../../modals/DeleteTask";
import EditBoardModal from "../../modals/EditBoard";
import EmptyBoard from "../empty-board/EmptyBoard";

export default function Board({ shown }: { shown: boolean | null | {} }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState<boolean>(false);
  const [editBoardModalOpen, setEditBoardModalOpen] = useState<boolean>(false);
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
      (async () => {
        try {
          const res = await fetchList(currentBoard.id);
          setList(res);
          dispatch(addList(res));
        } catch (e) {
          console.log(e);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardStatus, currentBoard]);

  //this useEffect is for fetching the list of Cards for all the board
  useEffect(() => {
    if (list) {
      (async () => {
        try {
          const res = await fetchCards(currentBoard.id);
          setCards(res);
        } catch (e) {
          console.log(e);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const openModal = useCallback((modal: string, card: object = {}) => {
    if (modal === "TaskModal") {
      setModalOpen(true);
      dispatch(selectCard(card));
    } else if (modal === "EditTaskModal") setEditTaskModalOpen(true);
    else if (modal === "DeleteTaskModal") setDeleteTaskModalOpen(true);
    else if (modal === "EditBoardModal") setEditBoardModalOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const closeModal = useCallback((modal: string) => {
    if (modal === "TaskModal") setModalOpen(false);
    else if (modal === "EditTaskModal") setEditTaskModalOpen(false);
    else if (modal === "DeleteTaskModal") setDeleteTaskModalOpen(false);
    else if (modal === "EditBoardModal") setEditBoardModalOpen(false);
  }, []);

  return (
    <div
      className={`d-flex board mt-3 ps-4 pe-4 w-100${
        shown === true ? " margin-left" : ""
      }`}
    >
      {list?.length !== 0 ? (
        <>
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
                    return (
                      <TaskCard key={index} card={card} openModal={openModal} />
                    );
                  } else {
                    return null;
                  }
                })}
              </Column>
            );
          })}
          <NewColumn openModal={openModal} />
        </>
      ) : (
        <EmptyBoard openModal={openModal} />
      )}
      {modalOpen === true ? (
        <TaskModal lists={list} closeModal={closeModal} openModal={openModal} />
      ) : (
        ""
      )}
      {editTaskModalOpen === true ? (
        <EditTaskModal lists={list} closeModal={closeModal} />
      ) : (
        ""
      )}
      {deleteTaskModalOpen === true ? (
        <DeleteTaskModal closeModal={closeModal} openModal={openModal} />
      ) : (
        ""
      )}
      {editBoardModalOpen === true ? (
        <EditBoardModal closeModal={closeModal} />
      ) : (
        ""
      )}
    </div>
  );
}
