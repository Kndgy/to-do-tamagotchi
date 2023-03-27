import { useState, useEffect } from "react";
import { Todo } from "../interface";

const initialTodos: Todo[] = [];
const initialId: Todo[] = [];

export const useTodos = () => {

    const now = new Date();
    const [minute, hour, day, month, year] = [
        now.getMinutes().toString(),
        now.getHours().toString(),
        now.getDate().toString(),
        now.getMonth().toString(),
        now.getFullYear().toString()
    ];

    const formattedDate = `${hour}:${minute}-${day}-${month+1}-${year}`

    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [newTodo, setNewTodo] = useState<string>("");
    const [taskDate, setTaskDate] = useState<string>('');
    const [dueTime, setDueTime] = useState<string>('')

    const addTodo = (task: string, dueDate: string, dueTime: string) => {
        const newTodo = {
            id: Date.now(),
            startDateTime: formattedDate,
            dueDate,
            dueTime,
            task,
            completed: false
        };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setNewTodo("");
        setTaskDate(taskDate)
    };

    const deleteTodo = (id: number) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: true } : todo
        );
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
    addTodo(newTodo, taskDate, dueTime );
    };

    const handleEditTodo = (id: number, newTask: string) => {
    const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    const handleTodoText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLDataElement>) => {
    setTaskDate(event.target.value);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLDataElement>) => {
    setDueTime(event.target.value)
    console.log(dueTime)
    }

    const permanentDeleteTodo = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
    handleTodoText,
    handleEditTodo,
    handleDateChange,
    handleTimeChange,
    permanentDeleteTodo
  };
};
