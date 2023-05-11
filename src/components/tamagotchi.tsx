import { useTodos } from "../utils/state"

export const Tamagotchi = () => {
    const {todos} = useTodos()
    console.log("plain deadline", todos.map((item)=>item.plainDeadline))
    console.log("deadline string", todos.map((item)=>item.deadline))
    console.log("total task/feeds", todos.length)
    const level = [1,2,3,4,5,6,7,8,9]; 
    const status = []
    return(
        <>
            <p className="todo-status">
                finish task when?
                <br/>
                status effect
            </p>
            this is tamagotchi placeholder
            <div>
              status bars
            </div>
        </>
    )
}