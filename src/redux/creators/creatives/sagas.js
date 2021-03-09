import { all, takeLatest, put, call } from "redux-saga/effects";
import { ACTIONS } from "./actions";
import { CreativeService } from "services/creators";

export function* fetchIndex({ payload }) {
  try {
    const response = yield call(CreativeService.index, payload);

    if (response.success) {
      yield put({
        type: ACTIONS.SET_STATE,
        payload: { list: response.data },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* creatorCreativesSagas() {
  yield all([takeLatest(ACTIONS.GET_INDEX, fetchIndex)]);
}
