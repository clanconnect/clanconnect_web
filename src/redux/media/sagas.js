import { all, takeLatest, put, call } from 'redux-saga/effects';
import actionConstants from './actions';
import { getMediaApi } from 'services/media';

export function* getMedia() {
  try {
    const response = yield call(getMediaApi);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

export default function* mediaSaga() {
  yield all([takeLatest(actionConstants.GET_MEDIA, getMedia)]);
}
