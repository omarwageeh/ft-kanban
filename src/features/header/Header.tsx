import React, { useState, useCallback, useRef, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import mobileLogo from "../../assets/images/logo-mobile.png";
import dots from "../../assets/images/dotsbutton.png";
import AddNewTaskModal from "../../modals/AddNewTask";
import { useAppSelector, useViewPort } from "../../app/hooks";
import EditBoardModal from "../../modals/EditBoard";
import DeleteBoardModal from "../../modals/DeleteBoard";

type Props = {
  children?: React.ReactNode;
};
export const Header = (props?: Props) => {
  const { width } = useViewPort();
  const [addTaskModalOpen, setAddTaskModalOpen] = useState<boolean>(false);
  const [deleteBoardModalOpen, setDeleteBoardModalOpen] =
    useState<boolean>(false);
  const [editBoardModalOpen, setEditBoardModalOpen] = useState<boolean>(false);
  const dotsView = useRef<any>();
  const [dotOpen, setDotOpen] = useState<boolean>(false);
  const currentBoard = useAppSelector<any>((state) => state.board.currentBoard);
  const openModal = useCallback((modal: string) => {
    if (modal === "DeleteBoardModal") setDeleteBoardModalOpen(true);
    else if (modal === "AddNewTaskModal") setAddTaskModalOpen(true);
    else if (modal === "EditBoardModal") setEditBoardModalOpen(true);
    else if (modal === "dotOpen") setDotOpen(true);
  }, []);
  const closeModal = useCallback((modal: string) => {
    if (modal === "DeleteBoardModal") setDeleteBoardModalOpen(false);
    else if (modal === "AddNewTaskModal") setAddTaskModalOpen(false);
    else if (modal === "EditBoardModal") setEditBoardModalOpen(false);
    else if (modal === "dotOpen") setDotOpen(false);
  }, []);

  //this is so the click outside the dots button closes the edit and delete
  useEffect(() => {
    const handleDotsClicked = (event: any) => {
      if (!dotsView) {
        return;
      }
      if (!dotsView?.current.contains(event.target)) {
        setDotOpen(false);
      }
    };
    document.addEventListener("click", handleDotsClicked, true);
    return () => {
      document.removeEventListener("click", handleDotsClicked);
    };
  }, []);
  return (
    <>
      <div className="header d-flex w-100 align-items-center justify-content-between">
        <div className="d-flex align-items-center h-100">
          {width >= 768 ? (
            <>
              <div className="img-wrapper p-3 h-100 align-items-center d-flex flex-shrink-0">
                <img src={logo} alt="logo" height={"25px"} />
              </div>
              <p className={`board-name p-3 h-100 text-center`}>
                {currentBoard?.name}
              </p>
            </>
          ) : (
            <>
              <div className="p-2 h-100 align-items-center d-flex flex-shrink-0">
                <img src={mobileLogo} alt="logo" height={"25px"} />
              </div>
              <p
                className="board-name p-2 h-100 text-center"
                onClick={() => {
                  openModal("");
                }}
              >
                {currentBoard?.name}
              </p>
            </>
          )}
        </div>
        <div className="d-flex align-items-center  p-3">
          <button
            className="add-new-button me-4"
            onClick={() => openModal("AddNewTaskModal")}
          >
            {width >= 768 ? "+ Add New Task" : "+"}
          </button>
          <div
            className="dots-button"
            ref={dotsView}
            onClick={() => setDotOpen(true)}
          >
            <img className="h-100" src={dots} alt="" />
            {dotOpen === true ? (
              <div className="menu d-flex flex-column p-2">
                <button
                  className="edit mb-1"
                  onClick={(e) => {
                    openModal("EditBoardModal");
                    setDotOpen(false);
                    e.stopPropagation();
                  }}
                >
                  Edit Board
                </button>
                <button
                  className="delete"
                  onClick={(e) => {
                    openModal("DeleteBoardModal");
                    setDotOpen(false);
                    e.stopPropagation();
                  }}
                >
                  Delete Board
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {addTaskModalOpen === true ? (
        <AddNewTaskModal closeModal={closeModal} />
      ) : (
        ""
      )}
      {editBoardModalOpen === true ? (
        <EditBoardModal closeModal={closeModal} />
      ) : (
        ""
      )}
      {deleteBoardModalOpen === true ? (
        <DeleteBoardModal closeModal={closeModal} />
      ) : (
        ""
      )}
    </>
  );
};
