import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = JSON.parse(localStorage.getItem('notifications')) || [];

const current_time = dayjs().format('DD-MM-YY-HH-mm-ss');

const notifySlicer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const newNotif = {
        id: Date.now().toString(),
        type: action.payload.type,
        entityId: action.payload.entityId,
        to: action.payload.to,
        read: [],
        by: action.payload.by || '',
        createdAt: action.payload.createdAt || current_time,
      };
      state.push(newNotif);
      localStorage.setItem('notifications', JSON.stringify(state));
    },
    markAsRead: (state, action) => {
      const { notifId, user } = action.payload;
      const updated = state.map((n) =>
        n.id === notifId
          ? {
              ...n,
              read: [...n.read, { user, at: new Date().toISOString() }],
            }
          : n
      );
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    },
    clearOld: (state, action) => {
      const max = action.payload || 300;
      const trimmed = state.slice(-max);
      localStorage.setItem('notifications', JSON.stringify(trimmed));
      return trimmed;
    },
  },
});

export const { addNotification, markAsRead, clearOld } = notifySlicer.actions;
export default notifySlicer.reducer;
