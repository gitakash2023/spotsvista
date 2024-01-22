

import { createSlice } from '@reduxjs/toolkit';

const destinationSlice = createSlice({
  name: 'destination',
  initialState: {
    destinationPlace: '',
  },
  reducers: {
    setDestinationPlace: (state, action) => {
      state.destinationPlace = action.payload;
    },
  },
});

export const { setDestinationPlace } = destinationSlice.actions;
export const selectDestinationPlace = (state) => state.destination.destinationPlace;

export default destinationSlice.reducer;
