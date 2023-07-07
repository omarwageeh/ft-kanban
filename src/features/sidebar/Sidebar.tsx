import React, { useState, useEffect } from "react";
import boardIcon from "../../assets/images/board.png";
import eyeIcon from "../../assets/images/eye-slash-1.png";
import "./sidebar.css";
import { BsMoonStarsFill, BsSunFill, BsEyeFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectBoard } from "../board/boardSlice";
type props = {
  setShown: Function;
};
export default function Sidebar(props: props | null) {
  const [active, setActive] = useState<number | null>(null);
  const [shown, setShown] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const boards = useAppSelector((state) => state.board.boards);
  useEffect(() => {
    if (boards.length !== 0) {
      setActive(0);
    }
  }, [boards]);

  const handleClick = (index: number) => {
    setActive(index);
    dispatch(selectBoard(index));
  };
  const showSideBar = () => {
    setShown(true);
    props?.setShown(true);
  };
  const hideSideBar = () => {
    setShown(false);
    props?.setShown(false);
  };

  return (
    <>
      {shown ? (
        <div className="sidebar d-flex  flex-column justify-content-between pt-2 pb-3 flex-shrink-0">
          <div className="top-part">
            {/* <img className="ms-4 mt-4 mb-4" src={logo} alt="" /> */}
            <p className="all-boards-title ms-4">ALL BOARDS (3)</p>
            <ul>
              {boards.map((board: any, index) => (
                <li key={index}>
                  <div
                    className={`d-flex align-items-center board-btn p-3 ${
                      active === index ? "active" : ""
                    }`}
                    onClick={() => handleClick(index)}
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
                <div className="d-flex align-items-center ps-3 pt-3 create-new">
                  <img
                    className="me-2"
                    height={"16px"}
                    src={boardIcon}
                    alt=""
                  />
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
                  // onClick={() => setTheme((theme) => !theme)}
                />
                <BsMoonStarsFill className="ms-3" />
              </div>
            </div>
            <div
              className="hide-sidebar d-flex align-items-center ps-4"
              onClick={hideSideBar}
            >
              <img className="me-2" src={eyeIcon} alt="" />
              <span>Hide Sidebar</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="show-sidebar text-center" onClick={showSideBar}>
          <BsEyeFill />
        </div>
      )}
    </>
  );
}