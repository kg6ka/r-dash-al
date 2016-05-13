const INITIAL_STATE = {locations : [{id:1,lat:48.856614,lng:2.3522219,total:20,blocked:5},
    {id:2,lat:35.856614,lng:1.3522219,total:20,blocked:4},
    {id:3,lat:20.856677,lng:1.3342212,total:20,blocked:0},
    {id:4,lat:42.856619,lng:1.3522222,total:20,blocked:0}
  ]};


const map = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'FETCH_LOCATIONS':
            return state;
        case 'SET_LOCATIONS':
            return {...state,locations:action.data }
        default:
            return state
    }
}

export default map