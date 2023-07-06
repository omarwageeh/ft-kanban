import React from "react";
import "./modals.css";
import dots from "../assets/images/dotsbutton.png";

export default function TaskModal({ onClick }: { onClick: Function }) {
  return (
    <div className="modal-wrapper" onClick={() => onClick()}>
      <div
        className="my-modal task-modal d-flex flex-shrink-0 flex-column"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="d-flex justify-content-between">
          <p className="task-modal-title">modal title</p>
          <div>
            <button className="dots-button">
              <img className="h-100" src={dots} alt="" />
            </button>
          </div>
        </div>
        <div className="task-modal-text">
          We know what we're planning to build for version one. Now we need to
          finalise the first pricing model we'll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </div>
        <div className="task-modal-subtasks-title">Subtasks (2 of 3)</div>
      </div>
    </div>
  );
}
