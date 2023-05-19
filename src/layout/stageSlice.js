import { createSlice } from '@reduxjs/toolkit';

export const stageSlice = createSlice({
    name: 'stage',
    initialState: {
      choosenStage: {}
    },
    reducers: {
      addChoosenStage: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});

export const { addChoosenStage } = stageSlice.actions;

export const stageData = (state) => state.stage;

export default stageSlice.reducer;