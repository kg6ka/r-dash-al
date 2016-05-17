import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config, { dataFrom } from 'config';

const GETTING_CARS_STATUS = 'argus/carsStatus/GETTING_CARS_STATUS';
const GOT_CARS_STATUS = 'argus/carsStatus/GOT_CARS_STATUS';
const GET_CARS_STATUS_FAILURE = 'argus/carsStatus/GET_CARS_STATUS_FAILURE';

const initialState = {
  activities: [],
  registeredVehicles: [],
  updatedVehicles: [],
  loading: false,
};

export default function carsStatusReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GETTING_CARS_STATUS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOT_CARS_STATUS: {
      return {
        ...state,
        ...data,
        loading: false,
      };
    }
    case GET_CARS_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export function getCarsStatus(tagId) {
  return {
    type: GETTING_CARS_STATUS,
    tagId,
  };
}

export function* carsStatusSaga() {
  while (1) {
    const { tagId } = yield take(GETTING_CARS_STATUS);
    try {
      const { apiBaseUrl } = config;
      const activities = yield request
          .get(`${apiBaseUrl}/v1/metrics/tags/${tagId}/bars/${dataFrom}/1/activeVehiclesStatus?from=0`)
          .promise()
        ;
      const registeredVehicles = yield request
          .get(`${apiBaseUrl}/v1/tags/${tagId}/vehicles/counts/total`)
          .promise()
        ;
      const updatedVehicles = yield request
          .get(`${apiBaseUrl}/v1/metrics/tags/${tagId}/statuses/vehicles/counts/updated`)
          .promise()
        ;
      const body = {
        activities: [...activities.body.data],
        registeredVehicles: [...registeredVehicles.body.data],
        updatedVehicles: [...updatedVehicles.body.data],
      };
      yield put({ type: GOT_CARS_STATUS, data: body });
    } catch (err) {
      yield put({ type: GET_CARS_STATUS_FAILURE });
    }
  }
}

export const sagas = [
  carsStatusSaga,
];
