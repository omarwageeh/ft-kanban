import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface boardState {
  boards: Array<object>;
  currentBoard: object;
  list: Array<object>;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null | undefined;
}

const initialState: boardState = {
  boards: [],
  currentBoard: {},
  list: [],
  status: "idle",
  error: null,
};
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
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
//)

export const boardSlice = createSlice({
  name: "board",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectBoard(state, action: PayloadAction<number>) {
      state.currentBoard = state.boards[action.payload];
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
      });
  },
});

export const { selectBoard } = boardSlice.actions;

export default boardSlice.reducer;
