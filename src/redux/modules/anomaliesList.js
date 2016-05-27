import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config from 'config';

const GETTING_ANOMALIES_LIST = 'argus/carsStatus/GETTING_ANOMALIES_LIST';
const GOT_ANOMALIES_LIST = 'argus/carsStatus/GOT_ANOMALIES_LIST';
const GET_ANOMALIES_LIST_FAILURE = 'argus/carsStatus/GET_ANOMALIES_LIST_FAILURE';
const UPDATE_TIME_RANGE='argus/anomalies/TIME_RANGE';


const initialState = {
  data: [],
  loading: false,
  startTime: new Date().getTime(),
  endTime: new Date().getTime(),
};

export default function AnomaliesListReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GETTING_ANOMALIES_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOT_ANOMALIES_LIST: {
      return {
        ...state,
        ...data,
        loading: false,
      };
    }
    case GET_ANOMALIES_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_TIME_RANGE:
      return {
        ...state,
        startTime: action.startTime,
        endTime: action.endTime,
      };
    default:
      return state;
  }
}

export function getAnomaliesList(tagId,from) {
  return {
    type: GETTING_ANOMALIES_LIST,
    tagId,
    from
  };
}

export function* anomaliesListSaga() {
  while (1) {
    const { tagId,from } = yield take(GETTING_ANOMALIES_LIST);
    try {
      const { apiBaseUrl } = config;
      const anomalies = yield request
          .get(`${apiBaseUrl}/v1/tags/${tagId}/anomalies?from=${from}`)
          .promise()
        ;
      const { body } = anomalies;
      yield put({ type: GOT_ANOMALIES_LIST, data: body });
    } catch (err) {
      yield put({ type: GET_ANOMALIES_LIST_FAILURE });
    }
  }
}

export function updateTimeRange(startTime, endTime) {
  return {
    type: UPDATE_TIME_RANGE,
    startTime,
    endTime,
  }
}

export const sagas = [
  anomaliesListSaga,
];
