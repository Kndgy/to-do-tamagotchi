import { NavLink } from "react-router-dom"
import { useTodos } from "../utils/state"
import { Task } from "../components/task"

export const AllTaskPage = () =>{

    const {todos, permanentDeleteTodo} = useTodos()
    console.log(todos)
    return(
        <div className="todo-outlet">
            <div className="outlet-child">
                {todos
                    .map((todo) => (
                        <li key={todo.id}>
                        <NavLink style={{width:'100%', textDecoration:'none'}} to={`/${todo.id}`}>
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
                                >
                                    {todo.task}
                                </div>
                                <div className='todo-task-date'>
                                </div>
                            </div>
                        </NavLink>
                        <div className="todo-delete-wrapper"><button className="todo-delete" onClick={() => permanentDeleteTodo(todo.id)}>Delete</button></div>
                        </li>
                    ))
                }
            </div>
        </div>
    )
}