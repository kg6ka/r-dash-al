import { combineReducers } from 'redux';
import currentUser, { sagas as currentUserSagas } from './currentUser';
import alerts from './alerts';
import map from './map';

export default combineReducers({
  currentUser,
  alerts,
  map
});

export const sagas = [
  ...currentUserSagas,
];
