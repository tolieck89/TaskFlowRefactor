import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: "create",
  isOpen: false,
  title: "New user",
  user: {},
};



const userModalSlice = createSlice({
  name: 'userModal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      console.log("Hello from reducer")
        state.mode = action.payload.mode || state.initialState.mode;
        state.title = action.payload.title || state.initialState.title;
        state.user = action.payload.user || state.initialState.user;
        state.isOpen = true;
    },
    closeModal: (state, action) => {
        state.isOpen = false;
    },
    changeMode: (state, action) => {
        state.mode = action.payload.mode;
    }
  }
});

export const { openModal, closeModal, changeMode } = userModalSlice.actions;
export default userModalSlice.reducer;