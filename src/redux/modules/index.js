import { combineReducers } from 'redux';
import currentUser, { sagas as currentUserSagas } from './currentUser';

export default combineReducers({
  currentUser,
});

export const sagas = [
  ...currentUserSagas,
];
