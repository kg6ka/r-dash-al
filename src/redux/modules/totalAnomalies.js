import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config, { dataFrom } from 'config';

const GETTING_TOTAL_ANOMALIES = 'argus/carsStatus/GETTING_TOTAL_ANOMALIES';
const GOT_TOTAL_ANOMALIES = 'argus/carsStatus/GOT_TOTAL_ANOMALIES';
const GET_TOTAL_ANOMALIES_FAILURE = 'argus/carsStatus/GET_TOTAL_ANOMALIES_FAILURE';

const initialState = {
  data: [],
  cars1: 90,
  cars2: 85,
  cars3: 5,
  loading: false,
};

export default function totalAnomaliesReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GETTING_TOTAL_ANOMALIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOT_TOTAL_ANOMALIES: {
      return {
        ...state,
        ...data,
        loading: false,
      };
    }
    case GET_TOTAL_ANOMALIES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export function getTotalAnomalies(tagId, period,from,to) {
  return {
    type: GETTING_TOTAL_ANOMALIES,
    tagId,
    period,
    from,
    to,
  };
}

export function* totalAnomaliesSaga() {
  while (1) {
    const { tagId, period, from,to } = yield take(GETTING_TOTAL_ANOMALIES);
    try {
      const { apiBaseUrl } = config;
      const totalAnomalies = yield request
          .get(`${apiBaseUrl}/v1/metrics/tags/${tagId}/bars/${period}/1/anomalies?from=${from}&to=${to}`)
          .promise()
        ;
      const carsData = yield request
          .get(`${apiBaseUrl}/v1/metrics/tags/${tagId}/bars/all/1/anomalousVehicles?from=${from}&to=${to}`)
          .promise()
        ;

      const body = {
        data: totalAnomalies.body.data,
        cars1: carsData.body.data.values[0].value + carsData.body.data.values[1].value,
        cars2: carsData.body.data.values[0].value,
        cars3: carsData.body.data.values[1].value,
      };
      yield put({ type: GOT_TOTAL_ANOMALIES, data: body });
    } catch (err) {
      yield put({ type: GET_TOTAL_ANOMALIES_FAILURE });
    }
  }
}

export const sagas = [
  totalAnomaliesSaga,
];
