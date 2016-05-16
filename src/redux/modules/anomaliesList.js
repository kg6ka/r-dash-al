const INITIAL_STATE = {anomalies : []};


const anomalies = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'FETCH_ANOMALIES':
            return state;
        case 'SET_ANOMALIES':
            return {...state,anomalies:action.data }
        default:
            return state
    }
}

export default anomalies