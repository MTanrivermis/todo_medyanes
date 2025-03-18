import { create } from "zustand";

const useTodosStore = create()((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  setTodos: (todos) => set({ todos: todos }),
  toggleTodo: (index) =>
    set((state) => {
      const updatedTodos = [...state.todos];
      updatedTodos[index].completed = !updatedTodos[index].completed;
      return { todos: updatedTodos };
    }),
  editTodo: (id, newText) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, todo: newText } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

export default useTodosStore;
