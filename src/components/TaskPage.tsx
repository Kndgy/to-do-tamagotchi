import { NavLink, useParams } from "react-router-dom"

export const TaskPage = () => {
    const param = useParams()
    return(
        <div className="todo-outlet">
            hi from task page, task id is {param.todoid}
            <br/>
            <NavLink to={'/'}>back</NavLink>    
        </div>
    )
}