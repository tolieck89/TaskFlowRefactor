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
    newUser.id= state.length;
     state.push(newUser);
      localStorage.setItem('users', JSON.stringify(state));

    },
    removeUser: (state, action) => {
      const updated = state.filter(user => user.id == action.payload);

      localStorage.setItem('users', JSON.stringify(updated));
      return updated;
    }, 
     editUser: (state, action) => {
        const updated = state.map(
            user => user.id===action.payload.uid ?action.payload : user
        )
             localStorage.setItem('users', JSON.stringify(updated));
      return updated;
    }


  }
});


export const {addUser, removeUser, editUser} = userSlice.actions;
export default userSlice.reducer;