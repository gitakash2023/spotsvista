// locationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    latitude: null,
    longitude: null,
    locationName: '',
    nearbyPlaces: [],
    markers: [],
  },
  reducers: {
    setLocation: (state, action) => {
      const { latitude, longitude, locationName } = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
      state.locationName = locationName;
    },
    setLocationName: (state, action) => {
      state.locationName = action.payload;
    },
    setNearbyPlaces: (state, action) => {
      state.nearbyPlaces = action.payload;
    },
    setMarkers: (state, action) => {
      state.markers = action.payload;
    },
  },
});

export const {
  setLocation,
  setLocationName,
  setNearbyPlaces,
  setMarkers,
} = locationSlice.actions;

export default locationSlice.reducer;
