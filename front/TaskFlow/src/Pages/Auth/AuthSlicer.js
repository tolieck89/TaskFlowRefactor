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
        localStorage.setItem('auth', (JSON.stringify(state.isAuth)))
    },
    
    logOut: (state) => {
        state.auth = false;
        localStorage.setItem('auth', state.mode); //
    }
  }
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;