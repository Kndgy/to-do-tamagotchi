import { NavLink } from "react-router-dom";
import { taskProps } from "../interface";

export const Task = ({todo, update, handle, deleteTask}: taskProps) => {
    return(
        <>
            <li key={todo.id}>
                <input
                    className="todo-checkbox"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(event) =>
                        update(todo.id, event.target.checked)
                    }
                />
                <NavLink style={{width:'100%', textDecoration:'none'}} to={`${todo.id}`}>
                    <div
                        className="todo-task"
                        style={{
                        textDecoration: todo.completed ? "line-through" : "",
                        }}
                    >
                        <div
                            style={{
                                textDecoration: todo.completed ? "line-through" : "",
                            }}
                            onClick={() => {
                                const newTask = prompt("Enter new task", todo.task);
                                if (newTask) {
                                handle(todo.id, newTask.trim());
                                }
                            }}
                        >
                            {todo.task}
                        </div>
                        <div className='todo-task-date'>
                        {todo.dueDate ? <>{todo.startDate} - {todo.dueDate}</> : <>b</> }
                        </div>
                    </div>
                </NavLink>
                <div className="todo-delete-wrapper"><button className="todo-delete" onClick={() => deleteTask(todo.id)}>Delete</button></div>
            </li>
        </>
    )
}