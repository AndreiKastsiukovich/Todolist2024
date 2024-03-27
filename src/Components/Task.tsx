import {Checkbox, IconButton,} from "@mui/material";
import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../App";

type TaskPropsType = {
    todoId:string
    task: TaskType,
    removeTask: (taskId:string,todoId:string) => void
    changeTaskStatus:(newStatus:boolean, taskId:string, todoId:string) => void
    updateTask:(newTaskTitle:string, taskId:string, todoId:string)=>void
}

export const Task = React.memo(({task,removeTask,changeTaskStatus,updateTask,todoId}:TaskPropsType) => {

    const removeTaskHandler = (id:string) => {
        removeTask(id,todoId)
    }

    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newStatus = event.currentTarget.checked
        changeTaskStatus(newStatus,task.id,todoId)
    }

    const changeTaskTitleHandler = useCallback((newTaskTitle:string) => {
        updateTask(newTaskTitle,task.id,todoId)
    },[updateTask,todoId])

    return (

        <ul>
            <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                <IconButton onClick={()=>removeTaskHandler(task.id)}>
                    <Delete/>
                </IconButton>
            </li>
        </ul>
    )

})