type StateType = {
    age:number,
    childrenCount:number,
    name:string
}

type ActionType = {
     type:string,
    [key:string]:any
}

export const userReducer = (state:StateType,action:ActionType) => {
    switch (action.type){
        case 'INCREMENT-AGE':
            return {
                ...state, age: state.age + 1
            }
        case 'INCREMENT-CHILDREN-COUNT':
            const newState = {...state}
            newState.childrenCount = state.childrenCount + 1
            return newState
        case 'CHANGE-NAME':
            return {
                ...state, name:'Andrei'
            }
        default: throw new Error('I don\'t understand this type')
    }
}