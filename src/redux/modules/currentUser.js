import { take, put } from 'redux-saga/effects';
import request from 'superagent-es6-promise';
import config from 'config';

const LOGOUT = 'argus/currentUser/LOGOUT';
const LOGIN = 'argus/currentUser/LOGIN';
const LOGIN_SUCCESS = 'argus/currentUser/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'argus/currentUser/LOGIN_FAILURE';


const initialState = {
  token: null,
  loading: false,
};

export default function currentUserReducer(state = initialState, action) {
  const { type, ...rest } = action;
  switch (type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        ...rest,
      };
    }
    case LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}

export function login(user, password) {
  return {
    type: LOGIN,
    user,
    password,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function* loginSaga() {
  while (1) {
    const { user: username, password } = yield take(LOGIN);
    try {
      const { apiBaseUrl } = config;
      // FIXME: replace with real login
      const result = yield request
        .get(`${apiBaseUrl}/samples`)
        // .type('form')
        // .send({ username, password })
        .promise()
      ;
      const { body } = result;
      yield put({ type: LOGIN_SUCCESS, token: body.data[0].data });
    } catch (err) {
      yield put({ type: LOGIN_FAILURE });
    }
  }
}

export const sagas = [
  loginSaga,
];
