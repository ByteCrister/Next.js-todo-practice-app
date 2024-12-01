'use client';

import { showToastWithCloseButton } from "@/hooks/showToast";
import axios from "axios";

export const DeleteTodo = async (_id) => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/api/todos?_id=${_id}`);
        showToastWithCloseButton(res.data.message, 'success');
    } catch (error) {
        console.log(error);
        showToastWithCloseButton(error.message || error.response.data.message, 'error');
    }
};