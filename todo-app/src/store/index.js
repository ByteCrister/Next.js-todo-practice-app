"use client"

import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './todoSlice';

const store = configureStore({
    reducer: {
        todoStore: todoSlice.reducer
    }
});

export default store;