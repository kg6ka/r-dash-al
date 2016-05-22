import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config, { dataFrom } from 'config';

const GETTING_MAP = 'argus/carsStatus/GETTING_MAP';
const GOT_MAP = 'argus/carsStatus/GOT_MAP';
const GET_MAP_FAILURE = 'argus/carsStatus/GET_MAP_FAILURE';

const INITIAL_STATE = {
  locations: [
    {
      lat: 48.856614,
      lng: 2.3522219,
      count: 20,
      desc: ''
    },
    {
      lat: 35.856614,
      lng: 1.3522219,
      count: 20,
      desc: ''
    }
  ],
  data: [],
  center: {desc:'GERMANY',lng:0,lat:0},
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

export function getMap(tagId,from) {
  return {
    type: GETTING_MAP,
    tagId,
    from
  };
}

export function* mapSaga() {
  while (1) {
    const { tagId,from } = yield take(GETTING_MAP);
    try {
      const { apiBaseUrl } = config;
      const map = yield request
          .get(`${config.apiBaseUrl}/v1/metrics/tags/${tagId}/heatmap?from=${from}`)
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

