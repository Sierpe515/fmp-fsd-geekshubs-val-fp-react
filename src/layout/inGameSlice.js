import { createSlice } from '@reduxjs/toolkit';

export const inGameSlice = createSlice({
    name: 'inGame',
    initialState: {
      choosenState: {}
    },
    reducers: {
      addState: (state, action) => {
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

export const { addState } = inGameSlice.actions;

export const inGameData = (state) => state.inGame;

export default inGameSlice.reducer;