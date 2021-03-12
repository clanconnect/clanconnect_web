import { all, takeLatest, put, call, select } from "redux-saga/effects";
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

export function* update({ payload: { body, path, query }, onSuccess }) {
  const currentStatus = yield select((state) => {
    return state.CreatorCreatives.list[0]?.creatives[0]?.status || "pending";
  });

  yield call(CreativeService.update, { body, path, query });
  if (onSuccess) yield onSuccess();
  yield put({
    type: ACTIONS.GET_INDEX,
    payload: { query: { status: currentStatus } },
  });
}

export function* updateAttachments({
  payload: { body, path, query },
  onSuccess,
}) {
  const currentStatus = yield select((state) => {
    return state.CreatorCreatives.list[0]?.creatives[0]?.status || "pending";
  });

  yield call(CreativeService.updateAttachments, { body, path, query });
  if (onSuccess) yield onSuccess();
  yield put({
    type: ACTIONS.GET_INDEX,
    payload: { query: { status: currentStatus } },
  });
}

export function* fetchAll({ payload }) {
  try {
    const response = yield call(CreativeService.getAll, payload);

    if (response.success) {
      yield put({
        type: ACTIONS.SET_STATE,
        payload: {
          allCreatives: {
            list: response.data,
            pagination: response.meta.pagination || {},
          },
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* creatorCreativesSagas() {
  yield all([
    takeLatest(ACTIONS.GET_INDEX, fetchIndex),
    takeLatest(ACTIONS.ADD, add),
    takeLatest(ACTIONS.UPDATE, update),
    takeLatest(ACTIONS.UPDATE_ATTACHMENTS, updateAttachments),
    takeLatest(ACTIONS.GET_ALL, fetchAll),
  ]);
}
