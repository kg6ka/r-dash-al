import { take, fork } from 'redux-saga/effects';

const SET_TIME = 'argus/setTime/SET_TIME';
const STOP_TIME = 'argus/setTime/STOP_TIME';
const REMOVE_TIME = 'argus/setTime/REMOVE_TIME';

let timerGenerator;
let bufferFn;
let isPaused = false;
export function setTime(fn) {
  return {
    type: SET_TIME,
    fn,
  };
}

export function stopTime() {
  return {
    type: STOP_TIME,
  };
}

export function removeTime() {
  return {
    type: REMOVE_TIME,
  };
}

export function* timeManagementSaga() {
  while (1) {
    const action = yield take([SET_TIME, STOP_TIME, REMOVE_TIME]);

    if (action.type === REMOVE_TIME) {
      isPaused = false;
    }
    if (action.type === STOP_TIME) {
      isPaused = true;
    }

    if (timerGenerator) {
      clearInterval(timerGenerator.result());
      timerGenerator.cancel();
      timerGenerator = undefined;
    } else {
      timerGenerator = yield fork(setTimeoutSaga, action.fn || bufferFn);
      bufferFn = action.fn || bufferFn;
    }

  }
}

function* setTimeoutSaga(fn) {
    return window.setInterval(fn, 5000);
}

export const sagas = [
  timeManagementSaga,
];
