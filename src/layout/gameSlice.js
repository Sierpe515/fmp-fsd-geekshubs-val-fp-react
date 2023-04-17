import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
      choosenGame: {}
    },
    reducers: {
      addGame: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
    //   addAppointmentUser: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload
    //     }
    //   },
    }
    
});

export const { addGame } = gameSlice.actions;

export const gameDetailData = (state) => state.game;

export default gameSlice.reducer;