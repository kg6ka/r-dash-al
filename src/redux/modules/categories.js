import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config, { dataFrom } from 'config';

const GETTING_CATEGORIES = 'argus/carsStatus/GETTING_CATEGORIES';
const GOT_CATEGORIES = 'argus/carsStatus/GOT_CATEGORIES';
const GET_CATEGORIES_FAILURE = 'argus/carsStatus/GET_CATEGORIES_FAILURE';

const initialState = {
  data: [],
  loading: true,
};

export default function categoriesReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GETTING_CATEGORIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOT_CATEGORIES: {
      return {
        ...state,
        ...data,
        loading: false,
      };
    }
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export function getCategories(tagId, from, to) {
  return {
    type: GETTING_CATEGORIES,
    tagId,
    from,
    to,
  };
}

export function* categoriesSaga() {
  while (1) {
    const { tagId, from, to } = yield take(GETTING_CATEGORIES);
    try {
      const { apiBaseUrl } = config;
      const categories = yield request
          .get(`${config.apiBaseUrl}/v1/metrics/tags/${tagId}/bars/all/2/anomaliesByCause?from=${from}&to=${to}`)
          .promise()
        ;
      const { body } = categories;
      yield put({ type: GOT_CATEGORIES, data: body });
    } catch (err) {
      yield put({ type: GET_CATEGORIES_FAILURE });
    }
  }
}

export const sagas = [
  categoriesSaga,
];
