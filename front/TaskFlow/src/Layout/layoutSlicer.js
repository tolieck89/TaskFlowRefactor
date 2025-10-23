import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: localStorage.getItem('theme') || 'dark' 
};



const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.mode = state.mode==="light" ? "dark" : "light";
       localStorage.setItem('theme', state.mode); //
    },
    setTheme: (state, action) => {
        state.mode = action.payload;
         localStorage.setItem('theme', state.mode); //
    }
  }
});

export const { switchTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;