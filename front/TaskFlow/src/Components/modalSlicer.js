import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'create',
  isOpen: false,
  title: 'New user',
  user: {},
};

const userModalSlice = createSlice({
  name: 'userModal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      console.log('Hello from reducer');
      state.mode = action.payload.mode || initialState.mode;
      state.title = action.payload.title || initialState.title;
      state.user = action.payload.user || initialState.user;
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
      state.user = {};
      state.mode = initialState.mode;
      state.title = initialState.title;
    },
    changeMode: (state, action) => {
      state.mode = action.payload.mode;
    },
  },
});

export const { openModal, closeModal, changeMode } = userModalSlice.actions;
export default userModalSlice.reducer;
