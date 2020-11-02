import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import room, { roomSaga } from './room';
import roomList, { roomListSaga } from './roomList';
import user from './user';

const rootReducer = combineReducers({
  loading,
  room,
  roomList,
  user,
});

export const rootSaga = function* () {
  yield all([roomSaga(), roomListSaga()]);
};

export default rootReducer;
