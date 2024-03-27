import {TaskStateType} from "../App";
import {AddNewTodolistAC, RemoveTodolistAC} from "../state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksReducer} from "../state/tasks-reducer";


let startState:TaskStateType

beforeEach(()=>{
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('todolistId1','1')

    const endState = TasksReducer(startState,action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
}
)

test('correct task should be added to correct array',()=>{

    const action = addTaskAC('todolistId1','bear')

    const endState = TasksReducer(startState,action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId1'][3].title).toBe('bear')
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('todolistId2', '2', false)

    const endState = TasksReducer(startState, action)

    expect(endState['todolistId2'].find(el=>el.id === '2')?.isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(true)
})

test('status of specified task should be changed', () => {

    const action = changeTaskTitleAC('todolistId2','2','coffee')

    const endState = TasksReducer(startState,action)

    expect(endState['todolistId2'].find(el=>el.id === '2')?.title).toBe('coffee')
    expect(endState['todolistId1'].find(el=>el.id === '2')?.title).toBe('JS')

})

test('new array should be added when new todolist is added', () => {

    const action = AddNewTodolistAC('new todolist')

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC('todolistId2')

    const endState = TasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['todolistId2']).toBeDefined()
})