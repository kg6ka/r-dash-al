import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config from 'config';

const GETTING_ANOMALIES_LIST = 'argus/carsStatus/GETTING_ANOMALIES_LIST';
const GOT_ANOMALIES_LIST = 'argus/carsStatus/GOT_ANOMALIES_LIST';
const GET_ANOMALIES_LIST_FAILURE = 'argus/carsStatus/GET_ANOMALIES_LIST_FAILURE';

const initialState = {
  data: [],
  loading: false,
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
      const anomaliesList = yield request
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

export const sagas = [
  anomaliesListSaga,
];
