import axios from "axios";

const { showToastWithCloseButton } = require("@/hooks/showToast");

const GetTodos = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/todos`);
        return res.data;
    } catch (error) {
        console.log(error);
        showToastWithCloseButton(error.message, 'error');
    }
};

export default GetTodos;