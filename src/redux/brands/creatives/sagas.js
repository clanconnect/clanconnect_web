import { all, takeLatest, put, call } from 'redux-saga/effects';
import actionConstants from './actions';
import {
  getCreativesAPI,
  creativeUpdateStatusApi,
  creativesBulkUpdateApi,
} from 'services/brands';
import { getCreativesAction } from './actions';

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

//update creative status
export function* updateCreativeStatus(action) {
  try {
    const response = yield call(creativeUpdateStatusApi, action.payload);
    if (response.success) {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
}

//bulk update
export function* creativesBulkUpdate(action) {
  try {
    const response = yield call(creativesBulkUpdateApi, action.payload);
    if (response.success) {
      yield getCreatives(
        getCreativesAction({
          params: {
            include: 'media,user',
            status: action.payload.currentStatus,
          },
          id: action.payload.id,
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* proposalsSaga() {
  yield all([
    takeLatest(actionConstants.GET_CREATIVES, getCreatives),
    takeLatest(actionConstants.CREATIVE_UPDATE_STATUS, updateCreativeStatus),
    takeLatest(actionConstants.CREATIVE_BULK_UPDATE, creativesBulkUpdate),
  ]);
}
