"use client"

import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useSelector } from 'react-redux';


const AccordionTemplateDefault = ({ props }) => {
  const [state, setState] = useState({ title: '', description: '', _id: '', isEdit: null });
  const { isButtonLoading } = useSelector((store) => store.todoStore);

  useEffect(() => {
    const { title, description, _id, isEdit } = props;
    setState({ title: title, description: description, _id: _id, isEdit: isEdit });
  }, [props]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`item-${state._id}`}>
        <AccordionTrigger className=' text-slate-600 font-medium'>
          {
            state.isEdit ? <input type='text' id='title' value={state.title} onChange={handleChange}
              className='px-2 py-1 text-slate-600 font-medium rounded outline-none' placeholder='title'></input>
              : state.title
          }
        </AccordionTrigger>
        <AccordionContent className='flex flex-col gap-2  text-slate-600 font-medium'>
          {
            state.isEdit ? <>
              <input type='text' id='description' value={state.description} onChange={handleChange}
                className='px-2 py-1 text-slate-600 font-medium rounded outline-none' placeholder='description'></input>
              {isButtonLoading ? <div className='w-full flex justify-center items-center'>
                <span className="loading loading-spinner loading-xs"></span>
              </div>
                : <button onClick={() => props.handleUpdate(state.title, state.description, state._id)}
                  className='px-2 py-1 rounded bg-red-400 text-slate-50'>Update</button>
              }
            </>
              : state.description
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  )
}

export default AccordionTemplateDefault