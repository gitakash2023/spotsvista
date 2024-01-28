
import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice'; 
import destinationReducer from "./destinationSlice"
import distanceReducer from "./distanceSlice"
const store = configureStore({
  reducer: {
    location: locationReducer,
    destination: destinationReducer,
    distance: distanceReducer,
   
  },
});

export default store;
