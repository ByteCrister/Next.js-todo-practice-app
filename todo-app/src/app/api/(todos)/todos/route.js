
import { NextResponse } from "next/server";
import connectDB from "@/config/connectDB";
import TodoModel from "@/models/TodoModel";
import verifyToken from "@/helper/verifyToken";

export const GET = async (request) => {
    try {

        await connectDB();

        const cookies = request.cookies.get("token");
        if (!cookies) {
            return NextResponse.json([]);
        }

        const token = cookies.value;
        const decoded = await verifyToken(token);
        const user_id = decoded.id;

        // Fetch todos based on user_id
        const todos = await TodoModel.find({ user_id });
        return NextResponse.json(todos);

    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json([]);
    }
};


export const POST = async (request) => {
    try {
        await connectDB();

        const body = await request.json();

        const cookies = await request.cookies.get("token");
        if (!cookies) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }

        const token = cookies.value;
        const decoded = await verifyToken(token);
        const user_id = decoded.id;
        
        const insertBody = { ...body, user_id: user_id, status: "Pending" };
        const newTodo = new TodoModel(insertBody);
        await newTodo.save();

        return NextResponse.json(
            {
                success: true,
                message: "New Todo created successfully.",
                todo: newTodo
            },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};


export const PATCH = async (request) => {
    try {

        await connectDB();

        const todo = await request.json();

        const updatedFields = {
            title: todo.title,
            description: todo.description,
            status: todo.status,
        };

        const updatedTodo = await TodoModel.findByIdAndUpdate(
            todo._id,
            updatedFields,
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            throw new Error("Todo not found or could not be updated");
        }

        return NextResponse.json(
            { success: true, message: "Todo updated successfully", data: updatedTodo },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating todo:", error.message);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}


export const DELETE = async (request) => {
    try {

        const url = new URL(request.url);
        const _id = url.searchParams.get("_id");

        if (!_id) {
            throw new Error("Todo ID is required");
        }

        await connectDB();

        const deletedTodo = await TodoModel.deleteOne({ _id });
        return NextResponse.json({ success: true, message: 'Todo deleted successfully', deletedTodo }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}