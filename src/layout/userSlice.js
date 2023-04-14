import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      credentials: {}
    },
    reducers: {
      login: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      clearRedux: (state) => {
        return {
          ...state,
          credentials: {}
        }
      },
      profile: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
    }
    
});

export const { login, clearRedux } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;