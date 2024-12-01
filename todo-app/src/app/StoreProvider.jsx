'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../lib/store'
import { fetchTodos } from '@/lib/features/todos/todoSlice'

export default function StoreProvider({ children }) {
    const storeRef = useRef(null)
    if (!storeRef.current) {
        storeRef.current = makeStore()
        storeRef.current.dispatch(fetchTodos());
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}