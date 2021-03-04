import { all, fork } from 'redux-saga/effects';
import mediaSaga from './media/sagas';
export default function* rootSaga() {
  yield all([fork(mediaSaga)]);
}
