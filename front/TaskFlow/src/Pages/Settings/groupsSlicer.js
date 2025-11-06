import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('groups')) || [];

const groupSlicer = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action) => {
      const newGroup = action.payload;
      newGroup.type = 'group';
      newGroup.id = new Date().toString();
      state.push(newGroup);
      localStorage.setItem('groups', JSON.stringify(state));
    },
    removeGroup: (state, action) => {
      const id = action.payload;
      const filtered = state.filter((group) => group.id !== id);

      state.length = 0;
      filtered.forEach((group) => state.push(group));
      localStorage.setItem('groups', JSON.stringify(state));

      localStorage.setItem('users', JSON.stringify(state));
    },
    editGroup: (state, action) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          state[i] = { ...state[i], ...action.payload };
        }
      }
      localStorage.setItem('groups', JSON.stringify(state));
    },
  },
});

export const { addGroup, editGroup, removeGroup } = groupSlicer.actions;
export default groupSlicer.reducer;
