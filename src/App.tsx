import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  date: string
}

const initialTodos: Todo[] = [];

const App = () => {
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

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleAddTodo}>
        <input type="text" value={newTodo} onChange={handleChange} />
        <input type="date" onChange={handleDateChange}/>
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(event) =>
                updateTodoStatus(todo.id, event.target.checked)
              }
            />
            {todo.id === 0 ? (
              <input
                type="text"
                defaultValue={todo.task}
                onBlur={(event) =>
                  handleEditTodo(todo.id, event.target.value.trim())
                }
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "",
                }}
                onDoubleClick={() => {
                  const newTask = prompt("Enter new task", todo.task);
                  if (newTask) {
                    handleEditTodo(todo.id, newTask.trim());
                  }
                }}
              >
                {todo.task}
                {todo.date}
              </span>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      "status effect"
      <br/>
      placeholder
    </div>
  );
};

export default App;
