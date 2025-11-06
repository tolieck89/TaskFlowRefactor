import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = action.payload;

      newTask.id = `${newTask.projectKey}-${state.length}`;
      newTask.projectTasks = [];
      state.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    removeTask: (state, action) => {
      const updated = state.filter((task) => task.id == action.payload);

      localStorage.setItem('tasks', JSON.stringify(updated));
      return updated;
    },
    editTask: (state, action) => {
      const updated = state.map((task) => (task.id === action.payload.id ? action.payload : task));
      localStorage.setItem('tasks', JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addTask, removeTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
