const INITIAL_STATE = {anomalies : [{id:2,confidence:2,blocked:'dde',date:new Date(),time:20,bus: 1,
                      msgId:2,data:'',category:'invalidData',vehicleId:'ff',ruleset:'129'},
             {id:3,confidence:2,blocked:'dde',date:new Date(),time:20,bus: 1,
        msgId:2,data:'',category:'noData',vehicleId:'gdgdg',ruleset:'129'}]};


const anomalies = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'FETCH_ALERTS':
            return state;
        case 'DELETE_ALERT':
            return {
                ...state,
                alerts: state.alerts.filter(function (alert) {
                    return alert.id != action.id
                })
            }
        default:
            return state
    }
}

export default anomalies