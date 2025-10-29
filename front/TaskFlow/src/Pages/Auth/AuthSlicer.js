import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
  isAuth: JSON.parse(localStorage.getItem('auth')) || false
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {

        state.isAuth = true;
        state.authUser = action.payload;
        localStorage.setItem('auth', (JSON.stringify(state)))
    },
    
    logOut: (state) => {
        state.isAuth = false;
        state.authUser = "";
        localStorage.setItem('auth', state); //
    }
  }
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;