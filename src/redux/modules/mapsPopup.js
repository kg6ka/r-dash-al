const OPEN_MAPS_POPUP = 'argus/mapsPopup/OPEN_MAPS_POPUP';
const HIDE_MAPS_POPUP = 'argus/mapsPopup/HIDE_MAPS_POPUP';
const LOAD_DATA = 'argus/mapsPopup/LOAD_DATA';
const LOAD_DATA_SUCCESS = 'argus/mapsPopup/LOAD_DATA_SUCCESS';
const LOAD_DATA_FAIL = 'argus/mapsPopup/LOAD_DATA_FAIL';

const initialState = {
  entity: {},
  isMapsModalOpen: false,
  loading: false,
  loaded: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_MAPS_POPUP:
      return {
        ...state,
        isMapsModalOpen: true,
      };
    case HIDE_MAPS_POPUP:
      return {
        ...state,
        isMapsModalOpen: false,
      };
    case LOAD_DATA:
      return {
        ...state,
        loading: true,
      };
    case LOAD_DATA_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        loaded: true,
        entity: { ...action.result },
      };
    case LOAD_DATA_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function openMapsPopup() {
  return {
    type: OPEN_MAPS_POPUP,
  };
}

export function hideMapsPopup() {
  return {
    type: HIDE_MAPS_POPUP,
  };
}

export function getHeatmapData(qqq) {
  console.log(qqq);
  return {
    types: [LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_FAIL],
    promise: (client) => client.get('http://newdash.argus-sec.com:8080/api/v1/metrics/tags/1111/heatmap?from=0'),
  };
}
