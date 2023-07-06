import React, { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../../app/hooks";

export default function TaskCard({
  card,
  onClick,
}: {
  card: any;
  onClick: Function;
}) {
  return (
    <div className="task-card" onClick={() => onClick()}>
      <p className="task-card-header">{card?.name}</p>
      <p className="task-card-subtask-info">0 of 3 subtasks</p>
    </div>
  );
}
