"use client"

import PageSlider from "@/hooks/PageSlider";
import { showToastWithCloseButton } from "@/hooks/showToast";
import { fetchTodos } from "@/lib/features/todos/todoSlice";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { useDispatch } from "react-redux";
import TodoTable from "./TodoTable";
import CreateTodos from "./CreateTodos";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function HomePage() {
  const router = useRouter();
  const todos  = useAppSelector((store) => store.todoStore);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/signout`);
      router.push('/signin');

    } catch (error) {
      console.log(error.message);
      showToastWithCloseButton(error.message, 'error');
    }
  };

  useEffect(()=>{
    if(todos.length === 0){
      dispatch(fetchTodos());
    }
  },[dispatch, todos.length]);

  const slides = [
    <TodoTable key={1} />,
    <CreateTodos key={2} />
  ];

  return (
    <section className="bg-slate-100 min-h-screen flex flex-col gap- justify-center items-center">
      <PageSlider slides={slides} />
      <button onClick={handleSignOut} className="bg-red-300 px-2 py-1 rounded text-slate-100 font-bold hover:bg-red-400 transition ease-in-out delay-150 ">Sign Out</button>
    </section>);
};