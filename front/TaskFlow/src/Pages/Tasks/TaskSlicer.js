import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = action.payload;

      newTask.id = `${newTask.taskProject}-${state.length}`;
      newTask.createdAt = dayjs().format('DD-MM-YY-HH-mm-ss');
      newTask.type = 'task';
      newTask.changeLog = [];
      state.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    removeTask: (state, action) => {
      const updated = state.filter((task) => task.id == action.payload);

      localStorage.setItem('tasks', JSON.stringify(updated));
      return updated;
    },
    editTask: (state, action) => {
      action.payload.lastUpdate = dayjs().format('DD-MM-YY-HH-mm-ss');
      const updated = state.map((task) => (task.id === action.payload.id ? action.payload : task));
      localStorage.setItem('tasks', JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addTask, removeTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
