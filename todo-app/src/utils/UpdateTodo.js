"use client"

import { showToastWithCloseButton } from "@/hooks/showToast";
import axios from "axios";

export const UpdateTodo = async (todo) => {
    try {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/todos`, todo);
        showToastWithCloseButton(res.data.message, 'success');
    } catch (error) {
        console.error(error);
        showToastWithCloseButton(error.message || error.response.data.message, 'error');
    }
};