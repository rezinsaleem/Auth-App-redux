import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  currentUser: string | null; 
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<string>) => { 
      state.currentUser = action.payload;
      state.loading = false;
    },
    signInFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
} = userSlice.actions;

export default userSlice.reducer;
