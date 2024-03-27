import {v1} from "uuid";
import {
    AddNewTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    TodolistReducer
} from "../state/todolist-reducer";
import {FilterType, TodolistType} from "../App";

let todolistId1:string
let todolistId2:string
let startState:TodolistType[] = []

beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id:todolistId1, title:'What to learn', filter:'all'},
        {id:todolistId2, title:'What to do', filter:'all'}
    ]
})


test('correct todolist should be removed',()=>{

    const endState =  TodolistReducer(startState,RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added',()=>{

    const newTitle = 'New Todolist'

    const endState = TodolistReducer(startState,AddNewTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test('correct todolist should change its name',()=>{

    const newTitle = 'New Todolist'

    const endState =  TodolistReducer(startState,ChangeTodolistTitleAC(todolistId1,newTitle))

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('What to do')
})

test('correct filter of todolist should be changed',()=>{

    const newFilter:FilterType = 'active'

    const endState = TodolistReducer(startState,ChangeTodolistFilterAC(todolistId1,newFilter))

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})