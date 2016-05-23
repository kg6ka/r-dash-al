import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config, { dataFrom } from 'config';

const GETTING_TARGETS = 'argus/carsStatus/GETTING_TARGETS';
const GOT_TARGETS = 'argus/carsStatus/GOT_TARGETS';
const GET_TARGETS_FAILURE = 'argus/carsStatus/GET_TARGETS_FAILURE';

const initialState = {
  ECU: [],
  MSG: [],
  Vehicle: [],
  loading: false,
};

export default function targetReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GETTING_TARGETS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOT_TARGETS: {
      return {
        ...state,
        ...data,
        loading: false,
      };
    }
    case GET_TARGETS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export function getTarget(tagId) {
  return {
    type: GETTING_TARGETS,
    tagId,
  };
}

export function* targetSaga() {
  while (1) {
    const { tagId } = yield take(GETTING_TARGETS);
    try {
      const { apiBaseUrl } = config;
      const ecu = yield request
          .get(`${apiBaseUrl}/v1/metrics/tags/${tagId}/bars/all/2/anomaliesByEcu?from=0`)
          .promise()
        ;
      const msg = yield request
          .get(`${apiBaseUrl}/v1/metrics/tags/${tagId}/bars/all/2/anomaliesByVehicle?from=0`)
          .promise()
        ;
      const vehicle = yield request
          .get(`${apiBaseUrl}/v1/metrics/tags/${tagId}/bars/all/2/anomaliesByMessage?from=0`)
          .promise()
        ;

      const body = {
        ECU: [...ecu.body.data],
        MSG: [...msg.body.data],
        Vehicle: [...vehicle.body.data],
      };
      yield put({ type: GOT_TARGETS, data: body });
    } catch (err) {
      yield put({ type: GET_TARGETS_FAILURE });
    }
  }
}

export const sagas = [
  targetSaga,
];
