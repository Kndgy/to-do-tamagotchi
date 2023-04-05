import { useTodos } from "../utils/state"

export const Tamagotchi = () => {
    const {todos} = useTodos()
    // console.log(todos)
    console.log("plain deadline", todos.map((item)=>item.plainDeadline))
    console.log("deadline string", todos.map((item)=>item.deadline))
    console.log("total task/feeds", todos.length)
    return(
        <>
            <p className="todo-status">
                finish task when?
                <br/>
                status effect
            </p>
            this is tamagotchi placeholder
        </>
    )
}