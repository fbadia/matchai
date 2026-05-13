import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import creditsReducer from './creditsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    credits: creditsReducer,
  },
});
