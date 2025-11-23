import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  authUser: null,
  ...JSON.parse(localStorage.getItem('auth')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.authUser = action.payload;
      localStorage.setItem('auth', JSON.stringify(state));
    },

    logOut: (state) => {
      state.isAuth = false;
      state.authUser = '';
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
