import { combineReducers } from 'redux';
import currentUser, { sagas as currentUserSagas } from './currentUser';
import alerts from './alerts';
import anomaliesList from './anomaliesList';
import carsStatus, { sagas as carsStatusSagas } from './carsStatus.js';
import totalAnomalies, { sagas as totalAnomaliesSagas } from './totalAnomalies.js';
import fleetActivities, { sagas as fleetActivitiesSagas } from './fleetActivities.js';
import categories, { sagas as categoriesSagas } from './categories.js';
import target, { sagas as targetSagas } from './target.js';
import map, { sagas as mapSagas } from './map.js';
import alertsList, { sagas as alertsSagas } from './alertsList';
import mapsPopup from './mapsPopup';
 
export default combineReducers({
  currentUser,
  alerts,
  map,
  anomaliesList,
  categories,
  carsStatus,
  totalAnomalies,
  fleetActivities,
  target,
  mapsPopup,
  alertsList,
});

export const sagas = [
  ...currentUserSagas,
  ...carsStatusSagas,
  ...totalAnomaliesSagas,
  ...fleetActivitiesSagas,
  ...categoriesSagas,
  ...targetSagas,
  ...mapSagas,
  ...alertsSagas,
];
