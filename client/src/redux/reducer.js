const initialState = {
    projects: [],
    tasks: [],
    filters: [],
    labels: [],
    taskLabels: [],
    user: {},
    userConfig: {},
    priorities: []
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'updateData':
            return {...state, ...action.payload}
        case 'deleteAllData':
            return initialState
        default:
            return state
    }
}