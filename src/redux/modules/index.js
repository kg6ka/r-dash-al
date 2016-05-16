import { combineReducers } from 'redux';
import currentUser, { sagas as currentUserSagas } from './currentUser';
import alerts from './alerts';
import map from './map';
import anomaliesList from './anomaliesList';
import categories from './categories';
import mapsPopup from './mapsPopup';
 
export default combineReducers({
  currentUser,
  alerts,
  map,
  anomaliesList,
  categories,
  mapsPopup
});

export const sagas = [
  ...currentUserSagas,
];
