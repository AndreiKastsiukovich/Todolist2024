import React, {useCallback, useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {Header} from "./Components/Header";
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    AddNewTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskType = {
    id:string,
    title:string,
    isDone:boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id:string,
    title:string,
    filter:FilterType
}

export type TaskStateType = {
    [key:string] : TaskType[]
}

function AppWithRedux() {

    // const todolistId1 = v1()
    // const todolistId2 = v1()
    //
    // const [todolist, setTodolist] = useState<TodolistType[]>([
    //     {id:todolistId1, title:'What to learn', filter:'all'},
    //     {id:todolistId2, title:'What to do', filter:'all'}
    // ])
    //
    // const [task, setTasks] = useState<TaskStateType>({
    //     [todolistId1]:[
    //         { id: v1(), title: 'HTML&CSS', isDone: true },
    //         { id: v1(), title: 'JS', isDone: true },
    //         { id: v1(), title: 'ReactJS', isDone: true },
    //
    //     ],
    //     [todolistId2]:[
    //         { id: v1(), title: 'Redux', isDone: false },
    //         { id: v1(), title: 'Typescript', isDone: false }
    //     ],
    // })

    const todolist = useSelector<AppRootStateType,TodolistType[]>(state => state.todolists);
    const task = useSelector<AppRootStateType,TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const changeFilter = useCallback((filter:FilterType,todolistId:string) => {
        const action = ChangeTodolistFilterAC(todolistId,filter)
        dispatch(action)
    },[])

    const addTask = useCallback((title:string,todoId:string) => {
        const action = addTaskAC(todoId,title)
        dispatch(action)
    },[])

    const removeTask = useCallback((taskId:string,todoId:string) => {
        const action = removeTaskAC(todoId,taskId)
        dispatch(action)

    },[])

    const changeTaskStatus = useCallback((newStatus:boolean, taskId:string,todoId:string) => {
        const action = changeTaskStatusAC(todoId,taskId,newStatus)
        dispatch(action)
    },[dispatch])

    const removeTodolist = useCallback((todoId:string) => {
        const action = RemoveTodolistAC(todoId)
        dispatch(action)
    },[])

    const addTodolist = useCallback((title:string) => {
        const action = AddNewTodolistAC(title)
        dispatch(action)
    },[])

    const updateTask = useCallback((newTaskTitle:string, taskId:string, todoId:string) => {
        const action = changeTaskTitleAC(todoId,taskId,newTaskTitle)
        dispatch(action)
    },[])

    const updateTodolist = useCallback((newTodoTitle:string,todoId:string) => {
        const action = ChangeTodolistTitleAC(todoId,newTodoTitle)
        dispatch(action)
    },[])


    return (
        <div className="App">

            <Header/>

            <Container fixed>

                <Grid container style={{padding:'10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {
                        todolist.map(el=>{

                            // let filteredTask = task[el.id]
                            // if(el.filter === "completed"){
                            //     filteredTask = task[el.id].filter(el=> el.isDone )
                            // }
                            //
                            // if(el.filter === "active"){
                            //     filteredTask = task[el.id].filter(el=> !el.isDone )
                            // }

                            return <Grid item>
                                <Paper style={{padding:'10px'}}>
                                    <Todolist
                                        key={el.id}
                                        todoId={el.id}
                                        title={el.title}
                                        task={task[el.id]}
                                        date={"22.03.2024"}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={el.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolist={updateTodolist}
                                    />
                                </Paper>
                            </Grid>

                        })
                    }
                </Grid>

            </Container>

        </div>
    );
}

export default AppWithRedux;
