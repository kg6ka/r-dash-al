import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config, { dataFrom } from 'config';

const GETTING_ALERTS_DATA = 'argus/carsStatus/GETTING_ALERTS_DATA';
const GOT_ALERTS_DATA = 'argus/carsStatus/GOT_ALERTS_DATA';
const GET_ALERTS_DATA_FAILURE = 'argus/carsStatus/GET_ALERTS_DATA_FAILURE';

const initialState = {
  alertsVehicle: [],
  alertsMessage: [],
  loading: false,
};

export default function carsStatusReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GETTING_ALERTS_DATA: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOT_ALERTS_DATA: {
      return {
        ...state,
        ...data,
        loading: false,
      };
    }
    case GET_ALERTS_DATA_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export function getAlertsData() {
  return {
    type: GETTING_ALERTS_DATA,
  };
}

export function* alertsListSaga() {
  while (1) {
    try {
      const { apiBaseUrl } = config;
      const alertsVehicle = yield request
          .get(`${apiBaseUrl}/v1/alerts/vehicle`)
          .promise()
        ;
      const alertsMessage = yield request
          .get(`${apiBaseUrl}/v1/alerts/message`)
          .promise()
        ;
      const body = {
        alertsVehicle: [...alertsVehicle.body.data],
        alertsMessage: [...alertsMessage.body.data],
      };
      yield put({ type: GOT_ALERTS_DATA, data: body });
    } catch (err) {
      yield put({ type: GET_ALERTS_DATA_FAILURE });
    }
  }
}

export const sagas = [
  alertsListSaga,
];

