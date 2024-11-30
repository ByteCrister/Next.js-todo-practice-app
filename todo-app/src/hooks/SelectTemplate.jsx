"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

const SelectTemplate = ({ handleSelect, todo }) => {
    return (
        <div>
            <Select value={todo.status} onValueChange={(value) => handleSelect(value, todo)} className='outline-none'>
                <SelectTrigger className="w-[180px] outline-none text-slate-500 font-semibold">
                    <SelectValue placeholder={todo.status} />
                </SelectTrigger>
                <SelectContent className='outline-none text-slate-500 font-semibold'>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Incomplete">Incomplete</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectTemplate;