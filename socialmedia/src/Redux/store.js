import { configureStore } from '@reduxjs/toolkit';
import messageSlice from '../Features/Counter/counterSlice';
import LoginSlice from '../Features/Counter/LoginSlice';


export default configureStore({
  reducer: {
    LoginSlice: LoginSlice,
    messageSlice: messageSlice,
  },
})