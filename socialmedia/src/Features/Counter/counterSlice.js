import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'counter',
  initialState: {
    senderId: "null",
    receiverId: "null",
    reciverPhoto:"null"
  },
  reducers: {
    setMessagingData: (state, action) => {
      state.senderId = action.payload.senderId;
      state.receiverId = action.payload.receiverId;
      state.reciverPhoto = action.payload.reciverPhoto;
    },
    removeMessagingData: (state) => {
      state.senderId = null;
      state.receiverId = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessagingData, removeMessagingData } = messageSlice.actions;

export default messageSlice.reducer;
