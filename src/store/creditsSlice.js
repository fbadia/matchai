import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
};

const creditsSlice = createSlice({
  name: 'credits',
  initialState,
  reducers: {
    setCredits: (state, action) => {
      state.balance = action.payload;
    },
    useCredit: (state) => {
      if (state.balance > 0) {
        state.balance -= 1;
      }
    },
    addCredits: (state, action) => {
      state.balance += action.payload;
    },
  },
});

export const { setCredits, useCredit, addCredits } = creditsSlice.actions;
export default creditsSlice.reducer;
