import {configureStore} from '@reduxjs/toolkit';
import authSllice from './authSlice';

const store = configureStore({
    reducer: {
        auth: authSllice
    }
});

export default store;