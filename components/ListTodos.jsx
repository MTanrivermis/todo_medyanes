"use client";

import React, { useEffect, useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { getAPI, postAPI } from "@/lib/services/fetchAPI";
import useTodosStore from "@/lib/store";
import Loading from "@/components/Loading";

const ListTodos = () => {
  const { todos, toggleTodo, deleteTodo, editTodo, setTodos } = useTodosStore();
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditStart = (index, newText) => {
    setEditingIndex(index);
    setEditText(newText);
  };

  const handleEditSave = (id) => {
    if (editText.trim() !== "") {
      editTodo(id, editText.trim());
      postAPI("/todos", { id, todo: editText.trim() }, "PUT").then((res) => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        console.log(res);
        editTodo(id, editText.trim());
      }).catch((err) => console.log(err));
      setEditingIndex(null);
      setEditText("");
    }
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditText("");
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEditSave(id);
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  const handleDeleteTodo = (id) => {
    postAPI("/todos", { id }, "DELETE").then((res) => {
      if (res.error) {
        console.error(res.error);
        return;
      }
      console.log(res);
      deleteTodo(id);
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    getAPI("/todos").then((res) => {
      if (res.error) {
        console.error(res.error);
        return;
      }
      console.log(res)
      setTodos(res);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center">
      {todos.length !== 0 && (
        <div className="drop-shadow-md px-5 my-10 w-full max-w-2xl max-h-[400px] overflow-auto">
          {todos &&
            todos.map((todo, index) => (
              <div
                key={index}
                className={
                  todo.completed
                    ? "drop-shadow-md min-h-[56px] bg-slate-300 mb-5"
                    : "drop-shadow-md min-h-[56px] bg-slate-200 mb-5"
                }
              >
                <div className="flex align-center justify-between p-4 gap-3">
                  <div className="flex gap-3 items-start flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(index)}
                      className="w-5 h-5 cursor-pointer accent-teal-500 mt-1 shrink-0"
                    />
                    <div
                      className={`flex-1 min-w-0 ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {editingIndex === index ? (
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, todo.id)}
                          className="w-full min-h-[24px] max-h-32 p-2 bg-white rounded resize-y focus:outline-none focus:ring-2 focus:ring-teal-500"
                          autoFocus
                        />
                      ) : (
                        <p className="whitespace-pre-wrap break-words">
                          {todo.todo}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {editingIndex === index ? (
                      <>
                        <button
                          onClick={() => handleEditSave(todo.id)}
                          className="text-teal-500 hover:text-teal-600 p-1 rounded-full hover:bg-teal-50 transition-colors"
                        >
                          Kaydet
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="text-gray-500 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors"
                        >
                          İptal
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditStart(index, todo.todo)}
                          className="text-blue-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition-colors"
                        >
                          <PencilSquareIcon className="w-5 h-5 cursor-pointer" />
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <TrashIcon className="w-5 h-5 cursor-pointer" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          <p className="text-teal-300 text-center">
            {todos.length > 0 && `${todos.length} Todo`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ListTodos;
