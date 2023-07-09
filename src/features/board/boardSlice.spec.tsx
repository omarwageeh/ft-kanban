/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { store } from "../../app/store";
import boardReducer, {
  boardState,
  selectBoard,
  selectCard,
  addList,
  fetchBoards,
} from "./boardSlice";
import Board from "./Board";

describe("board reducer", () => {
  const initialState: boardState = {
    boards: [],
    currentBoard: {},
    lists: null,
    cards: null,
    selectedCard: null,
    status: "idle",
    error: null,
  };
  it("should handle initial state", () => {
    expect(boardReducer(undefined, { type: "unknown" })).toEqual({
      boards: [],
      currentBoard: {},
      lists: null,
      cards: null,
      selectedCard: null,
      status: "idle",
      error: null,
    });
  });

  it("should handle fetching boards", () => {
    const actual = boardReducer(initialState, {
      type: fetchBoards.fulfilled.type,
    });
    expect(actual.status).toBe("success");
  });

  it("should handle assigning current board", () => {
    const actual = boardReducer(initialState, selectBoard(0));
    expect(actual.currentBoard).toEqual(actual.boards[0]);
  });
});
