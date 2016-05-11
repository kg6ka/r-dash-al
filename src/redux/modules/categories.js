const INITIAL_STATE = {};


const categories = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'FETCH_CATEGORIES':
            return state;
        case 'SET_CATEGORIES':
            return {...state,categories:action.data }
        default:
            return state
    }
}

export default categories