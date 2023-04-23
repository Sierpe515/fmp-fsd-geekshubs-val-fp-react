import { createSlice } from '@reduxjs/toolkit';

export const badgeSlice = createSlice({
    name: 'badge',
    initialState: {
      choosenBadge: {}
    },
    reducers: {
      addBadge: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      // addGameInfo: (state, action) => {
      //   return {
      //     ...state,
      //     ...action.payload
      //   }
      // },
    }
    
});

export const { addBadge } = badgeSlice.actions;

export const badgeData = (state) => state.badge;

export default badgeSlice.reducer;