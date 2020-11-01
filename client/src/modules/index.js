import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import room, { roomSaga } from './room';
import roomList, { roomListSaga } from './roomList';

const rootReducer = combineReducers({
  loading,
  room,
  roomList,
});

export const rootSaga = function* () {
  yield all([roomSaga(), roomListSaga()]);
};

export default rootReducer;
