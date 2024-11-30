"use client"

import GetTodos from "@/utils/GetTodos";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    loading: false,
    isFetched: false,
    error: null,
    isButtonLoading: false,
};

// * Create an async thunk to fetch todos
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const response = {
            todos: await GetTodos(),
        };
        return response;
    }
);

export const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {

        toggleButtonLoading: (state, action) => {
            state.isButtonLoading = action.payload;
        },

        setTodos: (state, action) => {
            state.todos = action.payload
        },

        deleteTodos: (state, action) => {
            state.todos = state.todos.filter((todo) => todo._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.todos = action.payload.todos;
                state.isFetched = true;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isFetched = false;
            });
    },
});

export const { toggleButtonLoading, setTodos, deleteTodos } = todoSlice.actions;

export default todoSlice.reducer;