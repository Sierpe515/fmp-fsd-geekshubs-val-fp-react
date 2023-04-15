import { createSlice } from '@reduxjs/toolkit';

export const characterSlice = createSlice({
    name: 'character',
    initialState: {
      choosenCharacter: {}
    },
    reducers: {
      addCharacter: (state, action) => {
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

export const { addCharacter } = characterSlice.actions;

export const characterDetailData = (state) => state.character;

export default characterSlice.reducer;