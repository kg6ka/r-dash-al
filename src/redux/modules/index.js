import { combineReducers } from 'redux';
import currentUser, { sagas as currentUserSagas } from './currentUser';
import alerts from './alerts';
import map from './map';
import categories from './categories';


export default combineReducers({
  currentUser,
  alerts,
  map,
  categories
});

export const sagas = [
  ...currentUserSagas,
];
