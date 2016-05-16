import { combineReducers } from 'redux';
import currentUser, { sagas as currentUserSagas } from './currentUser';
import alerts from './alerts';
import map from './map';
<<<<<<< HEAD
import anomalies from './anomalies';
=======
import categories from './categories';
import mapsPopup from './mapsPopup';

>>>>>>> a94618b63103b007f158c37f9a39216c946fef8f

export default combineReducers({
  currentUser,
  alerts,
  map,
<<<<<<< HEAD
  anomalies
=======
  categories,
  mapsPopup,
>>>>>>> a94618b63103b007f158c37f9a39216c946fef8f
});

export const sagas = [
  ...currentUserSagas,
];
