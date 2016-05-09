import { combineReducers } from 'redux';
import currentUser, { sagas as currentUserSagas } from './currentUser';
import alerts from './alerts';

export default combineReducers({
  currentUser,
  alerts
});

export const sagas = [
  ...currentUserSagas,
];
