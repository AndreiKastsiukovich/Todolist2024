import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {Header} from "./Components/Header";
import {Container, Grid, Paper} from "@mui/material";

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

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolist, setTodolist] = useState<TodolistType[]>([
        {id:todolistId1, title:'What to learn', filter:'all'},
        {id:todolistId2, title:'What to do', filter:'all'}
    ])

    const [task, setTasks] = useState<TaskStateType>({
        [todolistId1]:[
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: true },

        ],
        [todolistId2]:[
            { id: v1(), title: 'Redux', isDone: false },
            { id: v1(), title: 'Typescript', isDone: false }
        ],
    })

    const changeFilter = (filter:FilterType,todolistId:string) => {
        setTodolist(todolist.map(el => el.id === todolistId ? {...el, filter:filter} : el ))
        // const newTodo = todolist.find(el=>el.id === todolistId)
        // if(newTodo){
        //     newTodo.filter = filter
        // }
        // setTodolist([...todolist])

    }

    const addTask = (title:string,todoId:string) => {
        const newTask = { id: v1(), title: title, isDone: false }
        // const todolistTask = task[todoId]
        // task[todoId] = [...todolistTask, newTask]
        // setTasks({...task})
        setTasks({...task , [todoId]:[...task[todoId], newTask]})
    }

    const removeTask = (taskId:string,todoId:string) => {
       // const deleteTask = task[todoId].filter(el=>el.id !== taskId)
       // task[todoId] = deleteTask
       //  setTasks({...task})
        setTasks({...task, [todoId]:task[todoId].filter(el=>el.id !== taskId)})

    }

    const changeTaskStatus = (newStatus:boolean, taskId:string,todoId:string) => {

        setTasks({...task, [todoId]: task[todoId].map(el=>el.id === taskId ? {...el, isDone:newStatus} : el)})
    }

    const removeTodolist = (todoId:string) => {
       setTodolist(todolist.filter(el=>el.id !== todoId))
        delete(task[todoId])
    }

    const addTodolist = (title:string) => {
        const newTodolistId = v1()
        const newTodolist:TodolistType = {id:newTodolistId, title:title, filter:'all'}
        setTodolist([...todolist, newTodolist])
        setTasks({...task, [newTodolistId]:[]})
    }

    const updateTask = (newTaskTitle:string, taskId:string, todoId:string) => {
        setTasks({...task, [todoId]:task[todoId].map(el=>el.id === taskId ? {...el, title:newTaskTitle} : el)})
    }

    const updateTodolist = (newTodoTitle:string,todoId:string) => {
        setTodolist(todolist.map(el=>el.id === todoId ? {...el, title: newTodoTitle} : el))
    }


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

                            let filteredTask = task[el.id]
                            if(el.filter === "completed"){
                                filteredTask = task[el.id].filter(el=> el.isDone )
                            }

                            if(el.filter === "active"){
                                filteredTask = task[el.id].filter(el=> !el.isDone )
                            }

                            return <Grid item>
                                <Paper style={{padding:'10px'}}>
                                    <Todolist
                                        key={el.id}
                                        todoId={el.id}
                                        title={el.title}
                                        task={filteredTask}
                                        date={"17.03.2024"}
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

export default App;
