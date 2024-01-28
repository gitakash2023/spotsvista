// distanceSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  distance: null,
};

const distanceSlice = createSlice({
  name: 'distance',
  initialState,
  reducers: {
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
    resetDistance: (state) => {
      state.distance = null;
    },
  },
});

export const { setDistance, resetDistance } = distanceSlice.actions;
export const selectDistance = (state) => state.distance.distance;
export default distanceSlice.reducer;
