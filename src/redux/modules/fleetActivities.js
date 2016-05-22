import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config, { dataFrom } from 'config';

const GETTING_FLEET_ACTIVITIES = 'argus/carsStatus/GETTING_FLEET_ACTIVITIES';
const GOT_FLEET_ACTIVITIES = 'argus/carsStatus/GOT_FLEET_ACTIVITIES';
const GET_FLEET_ACTIVITIES_FAILURE = 'argus/carsStatus/GET_FLEET_ACTIVITIES_FAILURE';

const initialState = {
  data: [],
  loading: false,
};

export default function fleetActivitiesReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GETTING_FLEET_ACTIVITIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOT_FLEET_ACTIVITIES: {
      return {
        ...state,
        ...data,
        loading: false,
      };
    }
    case GET_FLEET_ACTIVITIES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export function getFleetActivities(tagId, period,from) {
  return {
    type: GETTING_FLEET_ACTIVITIES,
    tagId,
    period,
    from
  };
}
 
export function* fleetActivitiesSaga() {
  while (1) {
    const { tagId, period,from } = yield take(GETTING_FLEET_ACTIVITIES);
    try {
      const { apiBaseUrl } = config;
      const anomalies = yield request
          .get(`${config.apiBaseUrl}/v1/metrics/tags/${tagId}/bars/${period}/1/anomalies?from=${from}`)
          .promise()
        ;

      const { body } = anomalies;
      yield put({ type: GOT_FLEET_ACTIVITIES, data: body });
    } catch (err) {
      yield put({ type: GET_FLEET_ACTIVITIES_FAILURE });
    }
  }
}

export const sagas = [
  fleetActivitiesSaga,
];
