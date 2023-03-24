import React from "react";
import { Routes, Route, Navigate, BrowserRouter, useParams} from "react-router-dom"
import { TodoPage } from "../todo";
import { TaskPage } from "../components/TaskPage";

export const RoutesPages = () => {
    
    return(
        <Routes>
            <Route path={`/`} element={<TodoPage/>}>
                <Route path={`:todoid`} element={<TaskPage/>}/>
            </Route>
        </Routes>
    )
};