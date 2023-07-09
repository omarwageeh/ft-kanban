/* eslint-disable testing-library/prefer-screen-queries */

import boardReducer, {
  boardState,
  selectBoard,
  fetchBoards,
} from "./boardSlice";

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
