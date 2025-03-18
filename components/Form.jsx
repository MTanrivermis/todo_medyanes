"use client";

import { postAPI } from "@/lib/services/fetchAPI";
import useTodosStore from "@/lib/store";
import React, { useState } from "react";

const Form = () => {
  const [input, setInput] = useState("");

  const { addTodo } = useTodosStore();

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    postAPI("/todos", {todo: input}).then((res) => {
      if (res.error) {
        console.error(res.error);
        return;
      } 
      addTodo(res);
    }).catch((err) => console.log(err));

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddTodo(e);
    }
  };



  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl px-5">
        <form>
          <div className="flex items-center gap-2">
            <textarea
              placeholder="Yapılacak görevi yazın..."
              className="w-full h-12 focus:outline-none bg-slate-200 text-slate-600 p-2 resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              type="submit"
              className="h-12 px-6 focus:outline-none text-neutral-700 bg-teal-400 hover:bg-teal-500 shrink-0"
              onClick={handleAddTodo}
            >
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
