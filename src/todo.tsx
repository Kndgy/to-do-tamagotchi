import { NavLink, Outlet } from "react-router-dom";
import { useTodos } from "./utils/state"
import React, { useEffect, useState } from "react";

export const TodoPage = () => {
    const [openPage, setOpenPage] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<string>('')
    const [dueTime, setDueTime] = useState<string>('')

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

    const handleTimeChange = (event: React.ChangeEvent<HTMLDataElement>) => {
        setStartTime(event.target.value)
        console.log(startTime)
    }

    const handleDueTimeChange = (event: React.ChangeEvent<HTMLDataElement>) =>{
        console.log(event.target.value)
    }

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <form className="todo-form" onSubmit={handleAddTodo}>
                <input className="todo-input" type="text" value={newTodo} onChange={handleChange} placeholder="Enter a new to-do" />
                <input className="todo-input" type="time" onChange={handleTimeChange}/>
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
            
            <p className="todo-status">
            finish task when?
            <br/>status effect
            </p>
            this is tamagotchi placeholder
        </div>
    );
}