import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config, { dataFrom } from 'config';

const GETTING_ANOMALIES_CONFIDENCE = 'argus/carsStatus/GETTING_ANOMALIES_CONFIDENCE';
const GOT_ANOMALIES_CONFIDENCE = 'argus/carsStatus/GOT_ANOMALIES_CONFIDENCE';
const GET_ANOMALIES_CONFIDENCE_FAILURE = 'argus/carsStatus/GET_ANOMALIES_CONFIDENCE_FAILURE';

const initialState = {
  data: [],
  loading: false,
};

export default function confidenceFilterReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GETTING_ANOMALIES_CONFIDENCE: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOT_ANOMALIES_CONFIDENCE: {
      return {
        ...state,
        ...data,
        loading: false,
      };
    }
    case GET_ANOMALIES_CONFIDENCE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export function getAnomaliesConfidence(tagId,from) {
  return {
    type: GETTING_ANOMALIES_CONFIDENCE,
    tagId,
    from
  };
}

export function* confidenceFilterSaga() {
  while (1) {
    const { tagId, from } = yield take(GETTING_ANOMALIES_CONFIDENCE);
    try {
      const { apiBaseUrl } = config;
      const anomalies = yield request
          .get(`${config.apiBaseUrl}/v1/metrics/tags/${tagId}/bars/all/2/anomaliesByConfidence?from=${from}`)
          .promise()
        ;
      const { body } = anomalies;
      yield put({ type: GOT_ANOMALIES_CONFIDENCE, data: body });
    } catch (err) {
      yield put({ type: GET_ANOMALIES_CONFIDENCE_FAILURE });
    }
  }
}

export const sagas = [
  confidenceFilterSaga,
];
