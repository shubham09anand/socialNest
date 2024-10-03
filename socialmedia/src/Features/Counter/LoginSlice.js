import { createSlice } from '@reduxjs/toolkit';

export const LoginSlice = createSlice({
  name: 'Login',
  initialState: {
    token: null,
    loggedUserId: null,
  },
  reducers: {
    setLoginData: (state, action) => {
      state.token = action.payload.token;
      state.loggedUserId = action.payload.userId;
    },
    removeLoginData: (state) => {
      state.senderId = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoginData, removeLoginData } = LoginSlice.actions;

export default LoginSlice.reducer;
