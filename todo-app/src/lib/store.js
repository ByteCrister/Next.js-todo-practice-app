import { configureStore } from '@reduxjs/toolkit'
import { todoSlice } from './features/todos/todoSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        todoStore: todoSlice.reducer
    }
  })
}