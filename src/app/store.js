import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../layout/userSlice';
// import detailSlice from '../layout/detailSlice';
// import appointmentSlice from '../layout/appointmentSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import characterSlice from '../layout/characterSlice';
import gameSlice from '../layout/gameSlice';
import userDetailSlice from '../layout/userDetailSlice';
import gameStageSlice from '../layout/gameStageSlice';
import badgeSlice from '../layout/badgeSlice';

const reducers = combineReducers({
    user: userSlice,
    userDetail: userDetailSlice,
    game: gameSlice,
    gameStage: gameStageSlice,
    character: characterSlice,
    badge: badgeSlice
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});