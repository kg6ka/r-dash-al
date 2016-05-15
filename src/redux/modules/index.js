import { combineReducers } from 'redux';
import currentUser, { sagas as currentUserSagas } from './currentUser';
import alerts from './alerts';
import map from './map';
import anomalies from './anomalies';

export default combineReducers({
  currentUser,
  alerts,
  map,
  anomalies
});

export const sagas = [
  ...currentUserSagas,
];
