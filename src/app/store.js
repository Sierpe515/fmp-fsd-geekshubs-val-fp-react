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

const reducers = combineReducers({
    user: userSlice,
    game: gameSlice,
    character: characterSlice
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