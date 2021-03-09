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

export function* add({
  payload: { body, path, query },
  onSuccess,
  selectedStatus,
}) {
  yield call(CreativeService.addNew, { body, path, query });
  if (onSuccess) yield onSuccess();
  yield put({
    type: ACTIONS.GET_INDEX,
    payload: { query: { status: selectedStatus } },
  });
}

export default function* creatorCreativesSagas() {
  yield all([
    takeLatest(ACTIONS.GET_INDEX, fetchIndex),
    takeLatest(ACTIONS.ADD, add),
  ]);
}
