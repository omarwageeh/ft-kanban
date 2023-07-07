import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface boardState {
  boards: Array<object>;
  currentBoard: object;
  selectedCard: object | null;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null | undefined;
}

const initialState: boardState = {
  boards: [],
  currentBoard: {},
  selectedCard: null,
  status: "idle",
  error: null,
};
export const putCardtoList = createAsyncThunk(
  "board/putCardtoList",
  async (
    {
      name,
      desc,
      cardId,
      currentBoardId,
      list,
    }: {
      name: string;
      desc: string;
      cardId: string;
      currentBoardId: string;
      list: any;
    },
    { dispatch }
  ) => {
    try {
      const data = JSON.stringify({ name, desc });
      const url = `https://api.trello.com/1/cards?idList=${list.id}&key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`;
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });
      dispatch(selectCard(await response.json()));
      dispatch(deleteCard(cardId));
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  try {
    const response = await fetch(
      "https://api.trello.com/1/members/me/boards?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205"
    );
    return await response.json();
  } catch (e) {
    console.log(e);
  }
});
export const fetchCurrentBoard = createAsyncThunk(
  "boards/fetchBoard",
  async (id: string) => {
    try {
      const response = await fetch(
        `https://api.trello.com/1/boards/${id}?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`
      );
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }
);
export const deleteCard = createAsyncThunk(
  "boards/deleteCard",
  async (id: string, { dispatch, getState }) => {
    const state: any = getState();
    try {
      const response = await fetch(
        `https://api.trello.com/1/cards/${id}?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`,
        {
          method: "DELETE",
        }
      );
      const boradId = state.board.currentBoard.id;
      const res = await response.json();
      await dispatch(fetchCurrentBoard(boradId));
      return res;
    } catch (e) {
      console.log(e);
    }
  }
);
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const boardSlice = createSlice({
  name: "board",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectBoard(state, action: PayloadAction<number>) {
      state.currentBoard = state.boards[action.payload];
    },
    selectCard(state, action: PayloadAction<object | null>) {
      state.selectedCard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBoards.fulfilled,
        (state, action: PayloadAction<Array<object>>) => {
          state.status = "success";
          state.boards = action.payload;
          state.currentBoard = action?.payload?.[0];
        }
      )
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCurrentBoard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCurrentBoard.fulfilled,
        (state, action: PayloadAction<object>) => {
          state.status = "success";
          state.currentBoard = action?.payload;
        }
      )
      .addCase(fetchCurrentBoard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(putCardtoList.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { selectBoard, selectCard } = boardSlice.actions;

export default boardSlice.reducer;
