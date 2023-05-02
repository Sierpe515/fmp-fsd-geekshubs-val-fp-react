import { createSlice } from '@reduxjs/toolkit';

export const badgeSlice = createSlice({
    name: 'badge',
    initialState: {
      choosenBadge: {},
      selectedBadge: {}
    },
    reducers: {
      addBadge: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      selectBadge: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
    }
    
});

export const { addBadge, selectBadge } = badgeSlice.actions;

export const badgeData = (state) => state.badge;

export default badgeSlice.reducer;