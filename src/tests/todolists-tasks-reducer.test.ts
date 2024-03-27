import {TaskStateType, TodolistType} from "../App";
import {TasksReducer} from "../state/tasks-reducer";
import {AddNewTodolistAC, TodolistReducer} from "../state/todolist-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistState: Array<TodolistType> = []

    const action = AddNewTodolistAC('new todolist')

    const endTasksState = TasksReducer(startTasksState, action)
    const endTodolistState = TodolistReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistState[0].id

    expect(idFromTasks).toBe(action.todoId)
    expect(idFromTodolist).toBe(action.todoId)
})