import {userReducer} from "../state/user-reducer";


test('user reducer should increment only age',()=>{
    const startState = {age:35,childrenCount:0,name:'Gulliver'}
    const endState = userReducer(startState,{type:'INCREMENT-AGE'})

    expect(endState.age).toBe(36)
    expect(endState.childrenCount).toBe(0)
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age:35,childrenCount:0,name:'Gulliver'}
    const endState = userReducer(startState,{type:'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(35)
    expect(endState.childrenCount).toBe(1)
})

test('user reducer should change name of user',()=>{
    const startState = {age:35,childrenCount:0,name:'Gulliver'}
    const newName = 'Andrei'
    const endState = userReducer(startState,{type:'CHANGE-NAME',newName:newName})

    expect(endState.name).toBe(newName)
})