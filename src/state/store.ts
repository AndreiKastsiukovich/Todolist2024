import {combineReducers,legacy_createStore} from "redux";
import {TodolistReducer} from "./todolist-reducer";
import {TasksReducer} from "./tasks-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducers = combineReducers({
    todolists:TodolistReducer,
    tasks:TasksReducer
})

// непосредственно создаём store
export const store = legacy_createStore(rootReducers)

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducers>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store