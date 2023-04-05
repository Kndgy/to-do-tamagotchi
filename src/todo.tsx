import { Link, Outlet } from "react-router-dom";
import { useTodos } from "./utils/state"
import React, { useState } from "react";
import { Tamagotchi } from "./components/tamagotchi";
import { Task } from "./components/task";

export const TodoPage = () => {

    const {    
        todos,
        newDesc,
        newTodo,
        deleteTodo,
        updateTodoStatus,
        handleAddTodo,
        handleTodoText,
        handleTodoDescText,
        handleEditTodo,
        handleDateChange,
        handleTimeChange
    } = useTodos()

    // console.log(todos)

    const storedTodos = localStorage.getItem("todos")
    if(storedTodos){
        // console.log(JSON.parse(storedTodos))
    }

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <form className="todo-form" onSubmit={handleAddTodo}>
                <input className="todo-input" type="text" value={newTodo} onChange={handleTodoText} placeholder="Enter a new to-do" />
                <input className="todo-input" type="text" value={newDesc} onChange={handleTodoDescText} placeholder="Enter a descriptions" />
                <input className="todo-input" type="time" onChange={handleTimeChange}/>
                <input className="todo-date" type="date" onChange={handleDateChange}/>
                <button className="todo-button" type="submit">Add A Task</button>
            </form>
            <ul>
            {todos
                .filter((todo) => !todo.completed)
                .map((todo) => (
                    <Task key={todo.id} todo={todo} update={updateTodoStatus} handle={handleEditTodo} deleteTask={deleteTodo} />
                ))
            }
            </ul>
            <div><Outlet/></div>
            <Tamagotchi/>
            <p>
                <Link to={'/alltask'}>see all completed task</Link>
            </p>
        </div>
    );
}