import { createSlice } from '@reduxjs/toolkit';

export const clueSlice = createSlice({
    name: 'clue',
    initialState: {
      clueState: {}
    },
    reducers: {
      changeState: (state, action) => {
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

export const { changeState } = clueSlice.actions;

export const clueData = (state) => state.clue;

export default clueSlice.reducer;