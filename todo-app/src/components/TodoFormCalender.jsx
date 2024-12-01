"use client";
import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";

const TodoFormCalender = ({ taskDate, setTaskDate }) => {
    const handleDateSelect = (date) => {
        const formattedDate = new Date(date);
        setTaskDate(formattedDate);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className={`w-full flex justify-between items-center border border-gray-300 rounded p-2 text-left font-normal ${!taskDate ? "text-slate-400" : "text-slate-600"
                        }`}
                >
                    <span>{taskDate ? new Date(taskDate).toLocaleDateString() : "Pick a date"}</span>
                    <span> <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></span>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={taskDate ? new Date(taskDate) : null}
                    onSelect={handleDateSelect}
                    disabled={(date) =>
                        date <= new Date() || date <= new Date("1900-01-01")
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default TodoFormCalender;