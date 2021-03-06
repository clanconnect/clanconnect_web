import { all, takeLatest, put, call } from 'redux-saga/effects';
import actionConstants from './actions';
import { getCreativesAPI } from 'services/brands';

export function* getCreatives(action) {
  try {
    const response = yield call(getCreativesAPI, action.payload);
    if (response.success) {
      yield put({
        type: actionConstants.SET_STATE,
        payload: {
          creativeDetails: response.data,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* proposalsSaga() {
  yield all([takeLatest(actionConstants.GET_CREATIVES, getCreatives)]);
}
