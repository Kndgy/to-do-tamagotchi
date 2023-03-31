import { useState, useEffect } from "react";
import { Todo } from "../interface";

const initialTodos: Todo[] = [];

export const useTodos = () => {

    const now = new Date();
    const [minute, hour, day, month, year] = [
        now.getMinutes().toString(),
        now.getHours().toString(),
        now.getDate().toString(),
        now.getMonth() + 1,
        now.getFullYear().toString()
    ];

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    const formattedDate = `${year}-${formattedMonth}-${day}`
    const formattedTime = `${hour}:${minute}`

    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [newTodo, setNewTodo] = useState<string>("");
    const [newDesc, setNewDesc] = useState<string>("");
    const [taskDate, setTaskDate] = useState<string>('');
    const [dueTime, setDueTime] = useState<string>('')

    const getDeadline = (startDate: string, startTime: string, dueDate: string, dueTime: string) => {
        const startDateObj = new Date(startDate);
        const startTimeArr = startTime.split(":");
        startDateObj.setHours(parseInt(startTimeArr[0]), parseInt(startTimeArr[1]), 0, 0);
        
        const dueDateObj = new Date(dueDate);
        const dueTimeArr = dueTime.split(":");
        dueDateObj.setHours(parseInt(dueTimeArr[0]), parseInt(dueTimeArr[1]), 0, 0);
        
        const deadline = dueDateObj.getTime() - startDateObj.getTime();
        
        const seconds = Math.floor(deadline / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        return `${days} days ${hours % 24} hours ${minutes % 60} minutes ${seconds % 60} seconds`;
      }      
      

    const addTodo = (task: string, description:string, dueDate: string, dueTime: string) => {
        const newTodo = {
            id: Date.now(),
            startDate: formattedDate,
            startTime: formattedTime,
            dueDate,
            dueTime,
            task,
            description,
            completed: false,
            deadline: getDeadline(formattedDate, formattedTime, dueDate, dueTime)
        };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setNewTodo("");
        setTaskDate(taskDate)
    };

    console.log(todos)

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
    addTodo(newTodo, newDesc, taskDate, dueTime );
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
