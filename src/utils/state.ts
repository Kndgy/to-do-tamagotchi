import { useState, useEffect } from "react";

export interface Todo {
  id: number;
  task: string;
  completed: boolean;
  date: string;
}

const initialTodos: Todo[] = [];

export const useTodos = () => {

  const now = new Date();
  const [minute, hour, day, month, year] = [
    now.getMinutes().toString(),
    now.getHours().toString(),
    now.getDay().toString(),
    now.getMonth().toString(),
    now.getFullYear().toString()
  ];

  const formattedDate = minute + hour + day + month + year

    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [newTodo, setNewTodo] = useState<string>("");
    const [taskDate, setTaskDate] = useState<string>('');

    const addTodo = (task: string, date: string) => {
        const newTodo = {
          id: parseInt(formattedDate),
          task,
          completed: false,
          date
        };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setNewTodo("");
        setTaskDate(taskDate)
      };
    
      const deleteTodo = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      };
    
      const updateTodoStatus = (id: number, completed: boolean) => {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      };
    
      const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!newTodo) return;
        addTodo(newTodo, taskDate);
      };
    
      const handleEditTodo = (id: number, newTask: string) => {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, task: newTask } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      };
    
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.target.value);
      };
    
      const handleDateChange = (event: React.ChangeEvent<HTMLDataElement>) => {
        setTaskDate(event.target.value);
      };
    
      useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      }, []);

  return {
    todos,
    newTodo,
    deleteTodo,
    updateTodoStatus,
    handleAddTodo,
    handleChange,
    handleEditTodo,
    handleDateChange
  };
};
