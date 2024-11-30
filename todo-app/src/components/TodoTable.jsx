"use client"
import React, { useEffect, useRef, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FiDelete } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import SelectTemplate from '@/hooks/SelectTemplate';
import { useDispatch, useSelector } from 'react-redux';
import AccordionTemplateDefault from './AccordionTemplateDefault';
import { BiSearchAlt2 } from "react-icons/bi";
import { UpdateTodo } from '@/utils/UpdateTodo';
import { deleteTodos, setTodos, toggleButtonLoading } from '@/store/todoSlice';
import { DeleteTodo } from '@/utils/DeleteTodo';
import TablePagination from '@/hooks/TablePagination';
import SearchTodos from '@/hooks/SearchTodos';

const TodoTable = () => {

    const { todos } = useSelector((store) => store.todoStore);
    const [todoState, setTodoState] = useState({
        SearchTodoStore: [],
        MainTodos: [],
        FilteredTodos: []
    });
    const dispatch = useDispatch();

    const searchedItems = useRef();

    useEffect(() => {
        if (todos.length > 0) {
            const Updated = todos.map((todo) => ({ ...todo, isEdit: false }));
            setTodoState({
                MainTodos: Updated,
                SearchTodoStore: Updated,
                FilteredTodos: Updated.slice(0, 3)
            });
        }
    }, [todos]);

    const handleSelect = async (value, todo) => {
        if (todo.status === 'Pending' && (value === 'Completed' || value === 'Incomplete')) {
            await UpdateTodo({ ...todo, status: value });
            const Updated = todoState.MainTodos.map((item) => {
                return item._id === _id ? { ...item, title: title, description: description }
                    : item
            });
            dispatch(setTodos(Updated));
        }
    };

    const activeEditMode = (_id) => {
        setTodoState((prev) => prev.map((item) => {
            return item._id === _id ? { ...item, isEdit: !item.isEdit } : item;
        }));
    };

    const handleDelete = async (_id) => {
        await DeleteTodo(_id);
        dispatch(deleteTodos(_id));
    };

    const getActionButton = (_id) => {
        return <div className='flex justify-evenly gap-3 p-1'>
            <button onClick={() => activeEditMode(_id)}>
                <GrEdit className='text-red-600 font-semibold text-lg' />
            </button>
            <button onClick={() => handleDelete(_id)}>
                <FiDelete className='text-red-600 font-semibold text-lg' />
            </button>
        </div>
    };

    const handleUpdate = async (title, description, _id) => {
        dispatch(toggleButtonLoading(true))
        const todo = todoState.MainTodos.find((item) => item._id === _id);
        const Updated = todoState.map((item) => {
            return item._id === _id ? { ...item, title: title, description: description }
                : item
        });
        await UpdateTodo({ ...todo, title: title, description: description });
        dispatch(setTodos(Updated));
        dispatch(toggleButtonLoading(false));
    };


    const getTodoState = (todo) => {
        const { title, description, _id } = todo;
        const obj = { title: title, description: description, _id: _id, isEdit: todo.isEdit, handleUpdate: handleUpdate };
        return <AccordionTemplateDefault props={obj} />
    };

    const handleSearch = () => {
        SearchTodos(searchedItems.current.value, setTodoState, todoState.SearchTodoStore);
    };

    const handlePagination = (paginateData) => {
        setTodoState(prev => ({
            ...prev,
            FilteredTodos: paginateData
        }));
    };

    return (
        <section className='w-full flex flex-col gap-2 justify-center items-center p-2'>
            <div className='w-full md:w-1/2 flex justify-between items-center bg-white rounded px-3 py-2'>
                <input type='text' ref={searchedItems} onChange={handleSearch} placeholder='search ...' className='w-full text-slate-500 font-semibold outline-none'></input>
                <BiSearchAlt2 className='text-slate-400 font-bold text-xl' />
            </div>
            <div className='w-full md:w-1/2 bg-white rounded p-2'>
                <h2 className='text-center font-semibold text-xl text-slate-600'>Todo List</h2>
                <Table>
                    <TableHeader>
                        <TableRow className='text-center'>
                            <TableHead>Todo</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            todoState.FilteredTodos && todoState.FilteredTodos.length > 0 &&
                            todoState.FilteredTodos.map((todo) => {
                                return <TableRow key={todo._id}>
                                    <TableCell className="font-medium">
                                        {getTodoState(todo)}
                                    </TableCell>

                                    <TableCell >
                                        <SelectTemplate handleSelect={handleSelect} todo={todo} />
                                    </TableCell>

                                    <TableCell >
                                        <span className='text-slate-500 font-semibold'>{new Date(todo.taskDate).toUTCString().slice(0, 17)}</span>
                                    </TableCell>

                                    <TableCell>
                                        {getActionButton(todo._id)}
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </div>

            <div>
                <TablePagination handlePagination={handlePagination} MainTodos={todoState.MainTodos} />
            </div>
        </section>
    )
};

export default TodoTable;