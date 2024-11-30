"use client";

import { showToastWithCloseButton } from '@/hooks/showToast';
import { fetchTodos, toggleButtonLoading } from '@/store/todoSlice';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoFormCalender from './TodoFormCalender';

const CreateTodos = () => {
    const { isButtonLoading } = useSelector((store) => store.todoStore);
    const dispatch = useDispatch();

    const [formState, setFormState] = useState({
        title: '',
        description: '',
        taskDate: null,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleCreateTodo = async (e) => {
        e.preventDefault();
        try {
            dispatch(toggleButtonLoading(true));
            await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/todos`, formState);
            showToastWithCloseButton('Todo created Successfully', 'success');
            setFormState({
                title: '',
                description: '',
                taskDate: null,
            })
            dispatch(fetchTodos());
            
        } catch (error) {
            console.log(error);
            showToastWithCloseButton(error.response.data.message, 'error');
        } finally {
            dispatch(toggleButtonLoading(false));
        }
    };

    return (
        <section className="w-full flex justify-center items-center px-2">
            <form
                onSubmit={handleCreateTodo}
                className="md:w-1/3 w-full flex flex-col gap-2 bg-white px-3 py-2 rounded shadow-md"
            >
                <h2 className="text-slate-600 font-medium text-xl md:text-2xl">
                    Create new Todo Task.
                </h2>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-medium text-slate-500 text-lg">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        onChange={handleChange}
                        value={formState.title}
                        placeholder="Title"
                        className="border border-gray-300 rounded p-1 font-medium text-slate-500 outline-none placeholder:text-slate-300"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="font-medium text-slate-500 text-lg">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        onChange={handleChange}
                        value={formState.description}
                        placeholder="Description"
                        className="border border-gray-300 rounded p-1 font-medium text-slate-500 outline-none placeholder:text-slate-300"
                    />
                </div>
                <TodoFormCalender
                    taskDate={formState.taskDate}
                    setTaskDate={(date) => setFormState((prev) => ({ ...prev, taskDate: date }))}
                />
                <button
                    type="submit"
                    className="px-2 py-1 rounded bg-red-500 text-slate-100 font-semibold hover:bg-red-300 transition"
                    disabled={isButtonLoading}
                >
                    {isButtonLoading ? <span className="loading loading-spinner loading-xs"></span> : "Create"}
                </button>
            </form>
        </section>
    );
};

export default CreateTodos;
