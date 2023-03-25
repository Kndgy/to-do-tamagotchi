import { invoke } from "@tauri-apps/api";
import React from "react";
import './App.css'
import { RoutesPages } from "./utils/routes";
import { useTodos } from "./utils/state";

const App = () => {
    // if(typeof window !== 'undefined'){
    //     console.log("this code is running in the browser")
    // }else{
    //     invoke('greet', { name: 'World' })
    //     .then((response) => console.log(response))
    // }

    const {    
        todos,
    } = useTodos()

    console.log(todos)

    return(
        <div>
            <RoutesPages/>
        </div>
    )
};

export default App;
