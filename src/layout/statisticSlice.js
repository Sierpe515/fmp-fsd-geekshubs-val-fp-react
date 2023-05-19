import { createSlice } from '@reduxjs/toolkit';

export const statisticSlice = createSlice({
    name: 'statistic',
    initialState: {
      statisticState: {}
    },
    reducers: {
      modifyState: (state, action) => {
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

export const { modifyState } = statisticSlice.actions;

export const statisticData = (state) => state.statistic;

export default statisticSlice.reducer;