import { all, takeLatest, put, call } from "redux-saga/effects";
import { ACTIONS } from "./actions";
import { InstagramService } from "services/brands";

export function* fetchIndex({ payload: { query } }) {
  try {
    const response = yield call(InstagramService.index, { query });
    console.log("response, query =>>>", response, query);
    if (response.success) {
      yield put({
        type: ACTIONS.SET_STATE,
        payload: { data: response.data },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* cancel({ payload: { query } }) {
  try {
    const response = yield call(InstagramService.cancel, { query });
    if (response.success) {
      yield put({
        type: ACTIONS.SET_STATE,
        payload: { data: response.data },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* approve({ payload: { query } }) {
  try {
    const response = yield call(InstagramService.approve, { query });
    if (response.success) {
      yield put({
        type: ACTIONS.SET_STATE,
        payload: { data: response.data },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* brandInstagramSagas() {
  yield all([
    takeLatest(ACTIONS.GET_INDEX, fetchIndex),
    takeLatest(ACTIONS.CANCEL_POST, cancel),
    takeLatest(ACTIONS.APPROVE_POST, approve),
  ]);
}
