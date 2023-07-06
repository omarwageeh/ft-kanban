import React, { useState, useCallback } from "react";
import logo from "../../assets/images/logo.png";
import dots from "../../assets/images/dotsbutton.png";
import AddNewTaskModal from "../../modals/AddNewTask";
import { useAppSelector } from "../../app/hooks";

type Props = {
  children?: React.ReactNode;
};
export const Header = (props?: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const currentBoard = useAppSelector<any>((state) => state.board.currentBoard);
  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);
  return (
    <>
      <div className="header d-flex w-100 align-items-center justify-content-between">
        <div className="d-flex align-items-center h-100">
          <div className="img-wrapper p-3 h-100 align-items-center d-flex flex-shrink-0">
            <img src={logo} alt="logo" height={"25px"} />
          </div>
          <p className="board-name p-3 h-100 text-center">
            {currentBoard?.name}
          </p>
        </div>
        <div className="d-flex align-items-center  p-3">
          <button className="add-new-button me-4" onClick={openModal}>
            + Add New Task
          </button>
          <button className="dots-button">
            <img className="h-100" src={dots} alt="" />
          </button>
        </div>
      </div>
      {modalOpen === true ? <AddNewTaskModal onClick={closeModal} /> : ""}
    </>
  );
};
