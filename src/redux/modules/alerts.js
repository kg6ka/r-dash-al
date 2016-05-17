const INITIAL_STATE = {
  alerts: {
    msg: [],
    vehicle:[],
  },
};
// {alerts : [{id:1,number:2,name:'dde',vehicleId:'231223',messages:20,date: new Date()},
//     {id:2,number:3,name:'fee',vehicleId:'23fdd223',messages:10,date: new Date()}]};


//{msg:[],vehicle:[]};

const alerts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_ALERTS':
      return state;
    case 'SET_ALERTS':
      return {
        ...state,
        alerts: action.data,
      };
    case 'DELETE_ALERT':
      return {
        ...state,
        alerts: state.alerts.msg.filter((alert) => {
          return alert.id !== action.id;
        }),
      };
    default:
      return state;
  }
};

export default alerts