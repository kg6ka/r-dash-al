import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config, { dataFrom } from 'config';

const GETTING_MAP = 'argus/carsStatus/GETTING_MAP';
const GOT_MAP = 'argus/carsStatus/GOT_MAP';
const GET_MAP_FAILURE = 'argus/carsStatus/GET_MAP_FAILURE';

const INITIAL_STATE = {
  locations: [
    {
      id: 1,
      lat: 48.856614,
      lng: 2.3522219,
      total: 20,
      blocked: 5,
    },
    {
      id: 2,
      lat: 35.856614,
      lng: 1.3522219,
      total: 20,
      blocked: 4,
    },
    {
      id: 3,
      lat: 20.856677,
      lng: 1.3342212,
      total: 20,
      blocked: 0,
    },
    {
      id: 4,
      lat: 42.856619,
      lng: 1.3522222,
      total: 20,
      blocked: 0,
    },
  ],
};

export default function mapReducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GETTING_MAP: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOT_MAP: {
      return {
        ...state,
        ...data,
        loading: false,
      };
    }
    case GET_MAP_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export function getMap(tagId) {
  return {
    type: GETTING_MAP,
    tagId,
  };
}

export function* mapSaga() {
  while (1) {
    const { tagId } = yield take(GETTING_MAP);
    try {
      const { apiBaseUrl } = config;
      const map = yield request
          .get(`${config.apiBaseUrl}/v1/metrics/tags/${tagId}/heatmap?from=0`)
          .promise()
        ;
      const { body } = map;
      yield put({ type: GOT_MAP, data: body });
    } catch (err) {
      yield put({ type: GET_MAP_FAILURE });
    }
  }
}

export const sagas = [
  mapSaga,
];
