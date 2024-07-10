
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './user/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = {
  user: UserState;
};

export default store;