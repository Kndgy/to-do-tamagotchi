import { invoke } from "@tauri-apps/api";
import React, { useEffect, useState } from "react";
import './App.css'

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  date: string
}

const initialTodos: Todo[] = [];

const App = () => {
  if(typeof window !== 'undefined'){
    console.log("this code is running in the browser")
  }else{
    invoke('greet', { name: 'World' })
    .then((response) => console.log(response))
  }
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState<string>("");
  const [taskDate, setTaskDate] = useState<string>('');

  const addTodo = (task: string, date: string) => {
    const newTodo = {
      id: Date.now(),
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

  const storedTodos = localStorage.getItem("todos")
  if(storedTodos){
    console.log(JSON.parse(storedTodos))
  }
  const now = new Date();
  const [minute, hour, day, month, year] = [
    now.getMinutes(),
    now.getHours(),
    now.getDay(),
    now.getMonth(),
    now.getFullYear()
  ];
  console.log(minute, hour, day, month, year);
  document.addEventListener('contextmenu', event => event.preventDefault());

  const DateElementCheck = ({todo}:{todo:string}) =>{
    if(todo){
      return(
        <>
            {todo} - {todo}
        </>
      )
    }else{
      return(
        <>no date?</>
      )
    }
  }

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <form className="todo-form" onSubmit={handleAddTodo}>
        <input className="todo-input" type="text" value={newTodo} onChange={handleChange} placeholder="Enter a new to-do" />
        <input className="todo-date" type="date" onChange={handleDateChange}/>
        <button className="todo-button" type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={todo.completed}
              onChange={(event) =>
                updateTodoStatus(todo.id, event.target.checked)
              }
            />
            {todo.id === 0 ? (
              <></>
              // <input
              //   className="todo-edit"
              //   type="text"
              //   defaultValue={todo.task}
              //   onBlur={(event) =>
              //     handleEditTodo(todo.id, event.target.value.trim())
              //   }
              // />
            ) : (
              <div
                className="todo-task"
                style={{
                  textDecoration: todo.completed ? "line-through" : "",
                }}
                onClick={() => {
                  const newTask = prompt("Enter new task", todo.task);
                  if (newTask) {
                    handleEditTodo(todo.id, newTask.trim());
                  }
                }}
              >
                <div>{todo.task}</div>
                <div className='todo-task-date'>
                  <DateElementCheck todo={todo.date}/>
                </div>
              </div>
            )}
            <div className="todo-delete-wrapper"><button className="todo-delete" onClick={() => deleteTodo(todo.id)}>Delete</button></div>
          </li>
        ))}
      </ul>
      <p className="todo-status">status effect</p>
      this is tamagotchi placeholder
    </div>
  );
};

export default App;
