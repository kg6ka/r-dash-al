import { take, fork } from 'redux-saga/effects';

const SET_TIME = 'argus/setTime/SET_TIME';
const STOP_TIME = 'argus/setTime/STOP_TIME';
const REMOVE_TIME = 'argus/setTime/REMOVE_TIME';
const UPDATE_PERIOD = 'argus/setTime/UPDATE_PERIOD';

let timerGenerator;
let bufferFn;
let isPaused = false;

const initialState = {
  paused: true,
  period: '10m',
};


export default function timeReducer(state = initialState, action) {
  switch (action.type) {
    case STOP_TIME: {
      return {
        ...state,
        paused: true,
      };
    }
    case REMOVE_TIME: {
      return {
        ...state,
        paused: false,
      };
    }
    case UPDATE_PERIOD: {
      return {
        ...state,
        period: action.period,
      }
    }
    default:
      return state;
  }
}

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

export function setPeriod(period) {
  return {
    type: UPDATE_PERIOD,
    period,
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
      if (timerGenerator) {
        clearInterval(timerGenerator.result());
        timerGenerator.cancel();
      }
      isPaused = true;
    }

    if (action.type === SET_TIME && isPaused) {
      bufferFn = action.fn;
    }

    if (isPaused) {
      continue;
    }

    if (timerGenerator) {
      clearInterval(timerGenerator.result());
      timerGenerator.cancel();
    }

    timerGenerator = yield fork(setTimeoutSaga, action.fn || bufferFn);
    bufferFn = action.fn || bufferFn;
  }
}

function* setTimeoutSaga(fn) {
  return window.setInterval(fn, 5000);
}

export const sagas = [
  timeManagementSaga,
];
