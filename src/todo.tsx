import { NavLink, Outlet } from "react-router-dom";
import { useTodos } from "./utils/state"
import React, { useEffect, useState } from "react";

export const TodoPage = () => {
    const [openPage, setOpenPage] = useState<boolean>(false)

    const {    
        todos,
        newTodo,
        deleteTodo,
        updateTodoStatus,
        handleAddTodo,
        handleChange,
        handleEditTodo,
        handleDateChange
    } = useTodos()

    console.log(todos)

    const storedTodos = localStorage.getItem("todos")
    if(storedTodos){
        // console.log(JSON.parse(storedTodos))
    }
    const now = new Date();
    const [seconds, minute, hour, day, month, year] = [
        now.getSeconds(),
        now.getMinutes(),
        now.getHours(),
        now.getDay(),
        now.getMonth(),
        now.getFullYear()
    ];
    // console.log(seconds, minute, hour, day, month, year);
    // console.log(Date.now())

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
                        ) : (
                        <NavLink style={{width:'100%', textDecoration:'none'}} to={`${todo.id}`}>
                            <div
                                className="todo-task"
                                style={{
                                textDecoration: todo.completed ? "line-through" : "",
                                }}
                            >
                                <div
                                    onClick={() => {
                                        const newTask = prompt("Enter new task", todo.task);
                                        if (newTask) {
                                        handleEditTodo(todo.id, newTask.trim());
                                        }
                                    }}
                                >
                                    {todo.task}
                                </div>
                                <div className='todo-task-date'>
                                <DateElementCheck todo={todo.date}/>
                                </div>
                            </div>
                        </NavLink>
                        )}
                        <div className="todo-delete-wrapper"><button className="todo-delete" onClick={() => deleteTodo(todo.id)}>Delete</button></div>
                    </li>
                ))}
            </ul>
            <div><Outlet/></div>
            <p className="todo-status">status effect</p>
            this is tamagotchi placeholder
        </div>
    );
}