import { createSlice } from '@reduxjs/toolkit';

export const userDetailSlice = createSlice({
    name: 'userDetail',
    initialState: {
      choosenObject: {}
    },
    reducers: {
      addChoosen: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});

export const { addChoosen } = userDetailSlice.actions;

export const userDetailData = (state) => state.userDetail;

export default userDetailSlice.reducer;