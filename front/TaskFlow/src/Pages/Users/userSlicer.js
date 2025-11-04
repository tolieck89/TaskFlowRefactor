import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('users')) || [];

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = action.payload;
      newUser.role = 0;
      newUser.group = [];
      newUser.allowedProjects = [];
      newUser.id= Date.now().toString();
      newUser.isLocked= false;
      newUser.type = "user";
      newUser.regdate = new Date().toISOString();
      state.push(newUser);
      localStorage.setItem('users', JSON.stringify(state));
    },
    
    removeUser: (state, action) => {
  const id = action.payload;
  const filtered = state.filter(user => user.id !== id);

  // Очистити state і запушити новий масив
  state.length = 0;
  filtered.forEach(user => state.push(user));

  localStorage.setItem('users', JSON.stringify(state));

    }, 
     editUser: (state, action) => {
        const updated = state.map(
            user => user.id===action.payload.id ?  { ...user, ...action.payload } : user
        )
             localStorage.setItem('users', JSON.stringify(updated));
      return updated;
    },
  }
});


export const {addUser, removeUser, editUser} = userSlice.actions;
export default userSlice.reducer;