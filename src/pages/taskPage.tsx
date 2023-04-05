import { NavLink, useParams } from "react-router-dom"
import { useTodos } from "../utils/state"

export const TaskPage = () => {
    const param = useParams()
    const {todos} = useTodos()

    const TaskCheck = () => {
        if(param.todoid){
            const paramInt = parseInt(param.todoid)
            const currentTask = todos.find((item)=>item.id === paramInt)
            console.log(currentTask)
    
            if(!currentTask){
                return(
                    <>
                        <NavLink to={'/'}>back</NavLink>
                        <br/>    
                        it seems like theres missmatched id on the task
                    </>
                )
            }
            return(
                <>
                    <NavLink to={'/'}>back</NavLink>    
                    <p/>
                    hi from task page, task id is {param.todoid}
                    <br/>
                    title {currentTask.task}
                    <br/>
                    description {currentTask.description}
                    <br/>
                    start date {currentTask.startDate} - due date {currentTask.dueDate}
                    <br/>
                    start time {currentTask.startTime} - due time {currentTask.dueTime}
                </>
            )
        }
        return(
            <></>
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