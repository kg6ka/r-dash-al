import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config from 'config';

const GETTING_TAGS = 'argus/getTags/GETTING_TAGS';
const GOT_TAGS = 'argus/getTags/GOT_TAGS';
const GET_TAGS_FAILURE = 'argus/getTags/GET_TAGS_FAILURE';
const CHANGE_CURRENT_TAG = 'argus/getTags/CHANGE_CURRENT_TAG';


const initialState = {
  data: [{
    tagId: 0,
    name: 'Polo 2016',
  }],
  currentTag: 0,
  loading: false,
};

export default function getTagsReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GETTING_TAGS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOT_TAGS:
      const res = {
        ...state,
        ...data,
        currentTag: data.data[0].tagId,
        loading: false,
      };
      return res;
    case GET_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CHANGE_CURRENT_TAG:
      return {
        ...state,
        currentTag: data,
      };
    default:
      return state;
  }
}

export function getCurrentTags() {
  return {
    type: GETTING_TAGS,
  };
}

export function changeCurrentTag(data) {
  return {
    type: CHANGE_CURRENT_TAG,
    data,
  };
}

export function* getTagsSaga() {
  while (1) {
    try {
      yield take(GETTING_TAGS);
      const { apiBaseUrl } = config;
      const result = yield request
          .get(`${apiBaseUrl}/v1/tags`)
          .promise()
        ;
      const { body } = result;
      yield put({ type: GOT_TAGS, data: body });
    } catch (err) {
      yield put({ type: GET_TAGS_FAILURE });
    }
  }
}

export const sagas = [
  getTagsSaga,
];
