"use client"

import CreateTodos from "@/components/CreateTodos";
import TodoTable from "@/components/TodoTable";
import PageSlider from "@/hooks/PageSlider";
import { showToastWithCloseButton } from "@/hooks/showToast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/signout`);
      router.push('/signin');

    } catch (error) {
      console.log(error.message);
      showToastWithCloseButton(error.message, 'error');
    }
  };

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