import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface boardState {
  boards: Array<object>;
  currentBoard: object;
  lists: Array<object> | null;
  cards: Array<object> | null;
  selectedCard: object | null;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null | undefined;
}

const initialState: boardState = {
  boards: [],
  currentBoard: {},
  lists: null,
  cards: null,
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
      list,
    }: {
      name: string;
      desc: string;
      cardId: string;
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

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (
    { name, listNames }: { name: string; listNames: Array<string> },
    { dispatch, getState }
  ) => {
    try {
      const response = await fetch(
        `https://api.trello.com/1/boards/?name=${name}&defaultLists=false&key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`,
        {
          method: "POST",
        }
      );
      await dispatch(fetchBoards(name));
      listNames.forEach((name) => dispatch(createList({ name })));
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }
);
export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (name: string | undefined, { dispatch, getState }) => {
    try {
      const response = await fetch(
        "https://api.trello.com/1/members/me/boards?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205"
      );
      const res = await response.json();

      return { res, name };
    } catch (e) {
      console.log(e);
    }
  }
);

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
export const deleteCurrentBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (id: string, { dispatch }) => {
    try {
      const response = await fetch(
        `https://api.trello.com/1/boards/${id}?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        dispatch(fetchBoards());
      }
    } catch (e) {
      console.log(e);
    }
  }
);
export const updateCurrentBoard = createAsyncThunk(
  "boards/updateBoard",
  async ({
    id,
    name,
    index,
  }: {
    id: string;
    name: string;
    index: number | null;
  }) => {
    try {
      const data = JSON.stringify({ name });
      const response = await fetch(
        `https://api.trello.com/1/boards/${id}?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: data,
        }
      );
      const ret = { data: await response.json(), index };
      return ret;
    } catch (e) {
      console.log(e);
    }
  }
);
export const createList = createAsyncThunk(
  "boards/createList",
  async ({ name }: { name: string }, { dispatch, getState }) => {
    try {
      const state: any = getState();
      const response = await fetch(
        `https://api.trello.com//1/lists?name=${name}&idBoard=${state.board.currentBoard.id}&key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200)
        return dispatch(fetchCurrentBoard(state.board.currentBoard.id));
    } catch (e) {
      console.log(e);
    }
  }
);
export const deleteList = createAsyncThunk(
  "boards/updateList",
  async (
    { boardId, listId }: { boardId: string; listId: string },
    { dispatch }
  ) => {
    try {
      const data = JSON.stringify({ closed: true });
      const response = await fetch(
        `https://api.trello.com/1/lists/${listId}?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: data,
        }
      );
      if (response.status === 200) return dispatch(fetchCurrentBoard(boardId));
    } catch (e) {
      console.log(e);
    }
  }
);
export const updateList = createAsyncThunk(
  "boards/updateList",
  async (
    {
      boardId,
      listId,
      name,
    }: {
      boardId: string;
      listId: string;
      name: string;
    },
    { dispatch }
  ) => {
    try {
      const data = JSON.stringify({ name });
      const response = await fetch(
        `https://api.trello.com/1/lists/${listId}?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: data,
        }
      );
      if (response.status === 200) return dispatch(fetchCurrentBoard(boardId));
    } catch (e) {
      console.log(e);
    }
  }
);
export const createCard = createAsyncThunk(
  "boards/createCard",
  async (
    { name, desc, id }: { name: string; desc: string; id: string },
    { dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      const data = JSON.stringify({ name, desc });
      const response = await fetch(
        `https://api.trello.com/1/cards?idList=${id}&key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
        }
      );
      if (response.ok) {
        dispatch(fetchCurrentBoard(state.board.currentBoard.id));
      }
    } catch (e) {
      console.log(e);
    }
  }
);
export const updateCard = createAsyncThunk(
  "boards/updateCard",
  async (
    {
      name,
      desc,
      id,
      idList,
    }: { name: string; desc: string; id: string; idList: string },
    { dispatch, getState }
  ) => {
    try {
      const state: any = getState();
      console.log(idList);
      const data = JSON.stringify({ name, desc, idList });
      const response = await fetch(
        `https://api.trello.com/1/cards/${id}?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: data,
        }
      );
      if (response.ok) {
        dispatch(fetchCurrentBoard(state.board.currentBoard.id));
      }
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
    addCards(state, action: PayloadAction<Array<object>>) {
      state.cards = action.payload;
    },
    selectBoard(state, action: PayloadAction<number>) {
      state.currentBoard = state.boards[action.payload];
    },
    addList(state, action: PayloadAction<Array<object>>) {
      state.lists = action.payload;
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
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.status = "success";
        state.boards = action.payload?.res;
        state.currentBoard =
          action.payload?.name !== undefined
            ? state.boards.find(
                (item: any) => item.name === action.payload?.name
              )
            : action.payload?.res?.[0];
      })
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
      })
      .addCase(
        updateCurrentBoard.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.currentBoard = action.payload.data;
          state.boards[action.payload.index] = action.payload.data;
        }
      )
      .addCase(updateList.fulfilled, (state, action: PayloadAction<any>) => {
        state.lists = action.payload;
      });
  },
});

export const { selectBoard, selectCard, addList, addCards } =
  boardSlice.actions;

export default boardSlice.reducer;
