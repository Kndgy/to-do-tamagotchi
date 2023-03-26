import { NavLink, useParams } from "react-router-dom"
import { useTodos } from "../utils/state"

export const TaskPage = () => {
    const param = useParams()
    const {todos} = useTodos()
    console.log(typeof param.todoid)

    const TaskCheck = () => {
        if(param.todoid){
            const currentTask = todos[parseInt(param.todoid)]
            console.log(currentTask)
    
            if(currentTask){
                return(
                    <>
                    hi from task page, task id is {param.todoid}
                    <br/>
                    <NavLink to={'/'}>back</NavLink>    
                    </>
                )
            }else{
                return(
                    <>
                        <NavLink to={'/'}>back</NavLink>
                        <br/>    
                        it seems like theres missmatched id on the task
                    </>
                )
            }
        }else{
            return(
                <>
                    <NavLink to={'/'}>back</NavLink>
                    <br/>    
                    it seems like theres missmatched id on the task ?
                </>
            )
        }
    }

    return (
        <div className="todo-outlet">
            <div className="outlet-child">
                <TaskCheck/>
            </div>
        </div>
    )
}