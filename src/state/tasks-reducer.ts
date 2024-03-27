import {AddNewTodolist, RemoveTodolistType} from "./todolist-reducer";
import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";

type RemoveTaskType = {
    type:'REMOVE-TASK',
    todoId:string,
    taskId:string
}

type AddTaskType = {
    type: 'ADD-TASK',
    todoId:string,
    title:string
}

type ChangeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS',
    taskId:string,
    todoId:string,
    newIsDone:boolean
}

type ChangeTaskTitleACType = {
    type:'CHANGE-TASK-TITLE',
    todoId:string,
    taskId:string,
    newTaskTitle:string
}

type ActionType =
    RemoveTaskType | AddTaskType | ChangeTaskStatusACType | ChangeTaskTitleACType | AddNewTodolist | RemoveTodolistType

const initialState:TaskStateType = {
    key:[]
}

export const TasksReducer = (state:TaskStateType = initialState,action:ActionType):TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
             ...state,[action.todoId]:state[action.todoId].filter(el=>el.id !== action.taskId)
            }
        case "ADD-TASK":
            const newTask:TaskType = {id:v1(),title:action.title,isDone:false}
            return{
                ...state,[action.todoId]:[...state[action.todoId],newTask]
            }
        case "CHANGE-TASK-STATUS":
                return {
                    ...state, [action.todoId]:state[action.todoId].map(el=>el.id === action.taskId ? {...el, isDone: action.newIsDone} : el)
                }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,[action.todoId]:state[action.todoId].map(el=>el.id === action.taskId ? {...el, title:action.newTaskTitle} : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todoId]:[]
            }
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete state[action.todoId]
            return stateCopy
        default:
            return state;
    }
}

export const removeTaskAC = (todolistId:string,taskId:string):RemoveTaskType => {
    return{
        type:'REMOVE-TASK',
        todoId:todolistId,
        taskId:taskId
    }
}

export const addTaskAC = (todolistId:string, newTitle:string):AddTaskType => {
    return {
        type:'ADD-TASK',
        todoId:todolistId,
        title:newTitle
    }
}

export const changeTaskStatusAC = (todolistId:string,taskId:string,newStatus:boolean):ChangeTaskStatusACType => {
    return{
        type:'CHANGE-TASK-STATUS',
        taskId:taskId,
        todoId:todolistId,
        newIsDone:newStatus,
    }
}

export const changeTaskTitleAC = (todolistId:string,taskId:string,newTitle:string):ChangeTaskTitleACType => {
    return{
        type:'CHANGE-TASK-TITLE',
        todoId:todolistId,
        taskId:taskId,
        newTaskTitle:newTitle
    }
}