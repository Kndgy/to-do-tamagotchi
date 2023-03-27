import { NavLink, useParams } from "react-router-dom"
import { useTodos } from "../utils/state"

export const TaskPage = () => {
    const param = useParams()
    const {todos} = useTodos()

    const TaskCheck = () => {
        if(param.todoid){
            const paramInt = parseInt(param.todoid)
            const currentTask = todos.find((item)=>item.id === paramInt)
    
            if(!currentTask){
                return(
                    <>
                        <NavLink to={'/'}>back</NavLink>
                        <br/>    
                        it seems like theres missmatched id on the task
                    </>
                )
            }
        }
        return(
            <>
                hi from task page, task id is {param.todoid}
                <br/>
                <NavLink to={'/'}>back</NavLink>    
            </>
        )
    }

    return (
        <div className="todo-outlet">
            <div className="outlet-child">
                <TaskCheck/>
            </div>
        </div>
    )
}