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

export function* fetchById({ payload }) {
  try {
    const response = yield call(CreativeService.byProjectId, payload);

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
//fetchById
export function* addAndFetchById({
  payload: { body, path, query = {} },
  onSuccess,
  selectedStatus,
}) {
  yield call(CreativeService.addNew, { body, path, query });
  if (onSuccess) yield onSuccess();

  // if (selectedStatus) {
  //   yield put({
  //     type: ACTIONS.GET_BY_ID,
  //     payload: { query: { status: selectedStatus } },
  //   });
  // }

  let byIdPayload = {
    query: { status: null, include: "project" },
    id: body.projectId,
  };
  console.log(byIdPayload, " byIdPayload");
  const response = yield call(CreativeService.byProjectId, byIdPayload);

  if (response.success) {
    yield put({
      type: ACTIONS.SET_STATE,
      payload: { list: response.data },
    });
  }
}

export function* add({
  payload: { body, path, query },
  onSuccess,
  selectedStatus,
}) {
  yield call(CreativeService.addNew, { body, path, query });
  if (onSuccess) yield onSuccess();
  // if (selectedStatus) {
  //   yield put({
  //     type: ACTIONS.GET_INDEX,
  //     payload: { query: { status: selectedStatus } },
  //   });
  // }
}
export function* updateAndGetById({
  payload: { body, path, query, projectId },
  onSuccess,
}) {
  const currentStatus = yield select((state) => {
    return state.CreatorCreatives.list[0]?.creatives[0]?.status || "pending";
  });

  yield call(CreativeService.update, { body, path, query });

  if (onSuccess) yield onSuccess();

  let byIdPayload = {
    query: { status: null, include: "project" },
    id: projectId,
  };
  const response = yield call(CreativeService.byProjectId, byIdPayload);
  if (response.success) {
    yield put({
      type: ACTIONS.SET_STATE,
      payload: { list: response.data },
    });
  }
}

export function* update({
  payload: { body, path, query, projectId },
  onSuccess,
}) {
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
    yield put({ type: ACTIONS.SET_STATE, payload: { loading: true } });
    const response = yield call(CreativeService.getAll, payload);

    if (response.success) {
      yield put({
        type: ACTIONS.SET_STATE,
        payload: {
          loading: false,
          allCreatives: {
            list: response.data,
            pagination: response.meta.pagination || {},
          },
        },
      });
    }
  } catch (err) {
    console.log(err);
    yield put({ type: ACTIONS.SET_STATE, payload: { loading: false } });
  }
}

export function* bulkDelete({
  payload: { body, path = {}, query = {} },
  onSuccess,
}) {
  try {
    yield call(CreativeService.bulkDelete, { body, path, query });
    yield put({
      type: ACTIONS.GET_ALL,
      payload: { query: { include: "project,media,user" } },
    });
    if (onSuccess) yield onSuccess();
  } catch (e) {
    console.log(e);
  }
}

export default function* creatorCreativesSagas() {
  yield all([
    takeLatest(ACTIONS.GET_INDEX, fetchIndex),
    takeLatest(ACTIONS.ADD, add),
    takeLatest(ACTIONS.UPDATE, update),
    takeLatest(ACTIONS.UPDATE_ATTACHMENTS, updateAttachments),
    takeLatest(ACTIONS.GET_ALL, fetchAll),
    takeLatest(ACTIONS.BULK_DELETE, bulkDelete),
    takeLatest(ACTIONS.GET_BY_ID, fetchById),
    takeLatest(ACTIONS.ADD_GET_BY_ID, addAndFetchById),
    takeLatest(ACTIONS.UPDATE_GET_BY_ID, updateAndGetById),
  ]);
}
