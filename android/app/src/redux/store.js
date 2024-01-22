
import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice'; 
import destinationReducer from "./destinationSlice"

const store = configureStore({
  reducer: {
    location: locationReducer,
    destination: destinationReducer,
   
  },
});

export default store;
