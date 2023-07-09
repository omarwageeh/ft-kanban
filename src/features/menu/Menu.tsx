import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectBoard } from "../board/boardSlice";
import boardIcon from "../../assets/images/board.png";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import AddNewBoardModal from "../../modals/AddNewBoard";
import "./menu.css";

export default function Menu({
  closeMenu,
  theme,
  setTheme,
}: {
  closeMenu: Function;
  theme: boolean;
  setTheme: Function;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const boards = useAppSelector((state) => state.board.boards);
  const currentBoard = useAppSelector<any>((state) => state.board.currentBoard);
  const [active, setActive] = useState<any>(currentBoard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (boards.length !== 0) {
      setActive(currentBoard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards]);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClick = (index: number) => {
    setActive(boards[index]);
    dispatch(selectBoard(index));
  };

  return (
    <div className="modal-wrapper" onClick={() => closeMenu()}>
      <div className="my-modal menu" onClick={(e) => e.stopPropagation()}>
        <div className="top-part">
          <p className="all-boards-title ms-4">ALL BOARDS ({boards.length})</p>
          <ul>
            {boards.map((board: any, index) => (
              <li key={index}>
                <div
                  className={`d-flex align-items-center board-btn p-3 ${
                    active.name === board.name ? "active" : ""
                  }`}
                  onClick={(e) => {
                    handleClick(index);
                  }}
                >
                  <img
                    className="me-2"
                    height={"16px"}
                    src={boardIcon}
                    alt=""
                  />
                  <p style={{ margin: 0 }}>{board.name}</p>
                </div>
              </li>
            ))}
            <li>
              <div
                className="d-flex align-items-center ps-3 pt-3 create-new "
                onClick={openModal}
              >
                <img className="me-2" height={"16px"} src={boardIcon} alt="" />
                <p style={{ margin: 0 }}>+ Create New Board</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bottom-part">
          <div className="d-flex justify-content-center ">
            <div className="theme-selector form-check form-switch d-flex align-items-center justify-content-center mb-1">
              <BsSunFill className="me-3" />
              <input
                className="form-check-input ms-2 me-2"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                style={{ backgroundColor: "#635fc7" }}
                defaultChecked={theme}
                onClick={() => setTheme((theme: boolean) => !theme)}
              />
              <BsMoonStarsFill className="ms-3" />
            </div>
          </div>
        </div>
      </div>
      {modalOpen === true ? <AddNewBoardModal closeModal={closeModal} /> : ""}
    </div>
  );
}
