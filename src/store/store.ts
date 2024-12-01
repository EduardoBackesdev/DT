import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './conterSlice'; 

const store = configureStore({
  reducer: {
    counter: counterReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
