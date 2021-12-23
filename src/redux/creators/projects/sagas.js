import { all, takeLatest, put, call } from "redux-saga/effects";
import { ACTIONS } from "./actions";
import { ProjectService, ProjectServiceById } from "services/creators";

export function* fetchIndex({ payload }) {
  try {
    const response = yield call(ProjectService.index, payload);

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

export function* fetchByProjectId({ payload }) {
  try {
    const response = yield call(ProjectServiceById.index, payload);

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

export default function* creatorProjectSagas() {
  yield all([takeLatest(ACTIONS.GET_INDEX, fetchIndex)]);
  yield all([takeLatest(ACTIONS.BY_PROJECT_ID, fetchByProjectId)]);
}
