import {v1} from "uuid";
import {FilterType, TodolistType} from "../App";



export type RemoveTodolistType = {
    type:'REMOVE-TODOLIST'
    todoId:string
}

export type AddNewTodolist = {
    type: 'ADD-TODOLIST'
    title:string
    todoId:string
}

type ChangeTodolistTitle = {
    type:'CHANGE-TODOLIST-TITLE',
    todoId:string,
    title:string
}

type ChangeTodolistFilter = {
    type:'CHANGE-TODOLIST-FILTER',
    todoId:string,
    filter:FilterType
}


type ActionType =
    RemoveTodolistType
    | AddNewTodolist
    | ChangeTodolistTitle
    | ChangeTodolistFilter

const initialState: Array<TodolistType> = []

export const TodolistReducer = (state:TodolistType[] = initialState, action:ActionType):TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el=>el.id !== action.todoId)
        case "ADD-TODOLIST":
            const newTodolist:TodolistType = {id:action.todoId,title:action.title,filter:'all'}
            return [...state,newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el=>el.id === action.todoId ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el=>el.id === action.todoId ? {...el, filter:action.filter}: el)
        default:
            return state;

    }
}

export const RemoveTodolistAC = (id:string):RemoveTodolistType => {
    return {
        type:'REMOVE-TODOLIST',
        todoId:id
    }
}

export const AddNewTodolistAC = (newTodolist:string):AddNewTodolist =>{
    return{
        type:'ADD-TODOLIST',
        title:newTodolist,
        todoId:v1()
    }
}
 export const ChangeTodolistTitleAC = (id:string,newTitle:string):ChangeTodolistTitle => {
    return{
        type:'CHANGE-TODOLIST-TITLE',
        title:newTitle,
        todoId:id
     }
 }

 export const ChangeTodolistFilterAC = (id:string,newFilter:FilterType):ChangeTodolistFilter => {
    return{
        type:'CHANGE-TODOLIST-FILTER',
        filter: newFilter,
        todoId: id
    }
 }
