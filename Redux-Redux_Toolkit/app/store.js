import { configureStore } from "@reduxjs/toolkit";
import {todoSlice} from '../feature/Todo/TodoSlice.js'

export const store = configureStore({
    reducer:todoSlice.reducer
});

