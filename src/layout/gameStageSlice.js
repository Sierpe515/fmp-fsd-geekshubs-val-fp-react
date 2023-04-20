import { createSlice } from '@reduxjs/toolkit';

export const gameStageSlice = createSlice({
    name: 'gameStage',
    initialState: {
      choosenGameStage: {}
    },
    reducers: {
      addGameStage: (state, action) => {
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

export const { addGameStage } = gameStageSlice.actions;

export const gameStageData = (state) => state.gameStage;

export default gameStageSlice.reducer;