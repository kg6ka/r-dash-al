import { combineReducers } from 'redux';
import currentUser, { sagas as currentUserSagas } from './currentUser';
import alerts from './alerts';
import map from './map';
import categories from './categories';
import mapsPopup from './mapsPopup';


export default combineReducers({
  currentUser,
  alerts,
  map,
  categories,
  mapsPopup,
});

export const sagas = [
  ...currentUserSagas,
];
