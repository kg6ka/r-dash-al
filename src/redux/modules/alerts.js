const INITIAL_STATE = {
  showAlerts: true
};


const alerts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_ALERTS':
          return {
              ...state,
              showAlerts:action.bool
          }

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
export function showAlerts(bool) {
  return {
    type: 'SHOW_ALERTS',
    bool
  }
}

export default alerts