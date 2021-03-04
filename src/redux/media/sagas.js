import { all, takeLatest, put, call } from 'redux-saga/effects';
import actionConstants from './actions';
import { getUploadUrlsApi, registerMediaApi } from 'services/media';

export function* getUploadUrls({ payload }) {
  try {
    const response = yield call(getUploadUrlsApi, payload);
    if (response.success) {
      console.log(response.data, 'success=>');
    }
  } catch (err) {
    console.log(err, 'error=>');
  }
}

export default function* userSaga() {
  yield all([takeLatest(actionConstants.SET_STATE, getUploadUrls)]);
}
