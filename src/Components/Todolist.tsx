
import {FilterType, TaskType} from "../App";
import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button,IconButton, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";



type TodolistPropsType = {
    todoId:string
    title: string
    task: TaskType[]
    date?: string
    removeTask: (taskId:string,todoId:string) => void
    changeFilter:(filter:FilterType,todolistId:string) => void
    addTask:(title:string,todoId:string) => void
    changeTaskStatus:(newStatus:boolean, taskId:string, todoId:string) => void
    filter:FilterType
    removeTodolist:(todoId:string) => void
    updateTask:(newTaskTitle:string, taskId:string, todoId:string)=>void
    updateTodolist:(newTodoTitle:string, todoId:string)=>void
}

export const Todolist = React.memo((
    {title,task,date,removeTask,changeFilter,addTask,changeTaskStatus,filter,todoId,removeTodolist,updateTask,updateTodolist}:TodolistPropsType) => {

    const addTaskHandler = useCallback((newTitle:string) => {
        addTask(newTitle,todoId)
    },[addTask,todoId])

    const changeFilterHandler = useCallback((filter:FilterType) => {
        changeFilter(filter,todoId)
    },[changeFilter,todoId])

    const deleteTodolistHandler = () => {
        removeTodolist(todoId)
    }

    const changeTodoTitleHandler = useCallback((newTodoTitle:string) => {
        updateTodolist(newTodoTitle,todoId)
    },[updateTodolist,todoId])

    let taskForTodolist = task

    if(filter === 'active'){
        taskForTodolist =  task.filter(el=>!el.isDone)
    }
    if(filter === 'completed'){
        taskForTodolist =  task.filter(el=>el.isDone)
    }

    return(

        <div>
            <div className={'todolist-title-container'}>
                <h3>
                    <EditableSpan value={title} onChange={changeTodoTitleHandler}/>
                    <IconButton onClick={deleteTodolistHandler}>
                        <Delete/>
                    </IconButton>
                </h3>
            </div>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>


            {task.length === 0
                ?
                <Typography variant={'h6'} color={'blueviolet'}>
                    No tasks!
                </Typography>
                :
                taskForTodolist.map(el=>{
                        return  (
                            <Task
                                key={el.id}
                                task={el}
                                removeTask={removeTask}
                                changeTaskStatus={changeTaskStatus}
                                updateTask={updateTask}
                                todoId={todoId}
                            />
                        )

                    })
            }




            <div>

                <Button
                    color={'secondary'}
                    variant={filter === 'all' ? 'outlined' : "text"}
                    onClick={()=>changeFilterHandler('all')}>
                    All
                </Button>

                <Button
                    color={'secondary'}
                    variant={filter === 'active' ? 'outlined' : "text"}
                    onClick={()=>changeFilterHandler('active')}>
                    Active
                </Button>

                <Button
                    color={'secondary'}
                    variant={filter === 'completed' ? 'outlined' : "text"}
                    onClick={()=>changeFilterHandler('completed')}>
                    Completed
                </Button>

            </div>

            <div>
                <Typography variant={'h6'} color={'brown'}>
                    {date}
                </Typography>
            </div>

        </div>

    )

})