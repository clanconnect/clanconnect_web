import { all, takeLatest, put, call } from "redux-saga/effects";
import actionConstants from "./actions";
import { getProjectsApi } from "services/brands";

export function* getProjects(action) {
  try {
    const response = yield call(getProjectsApi, action.payload);
    if (response.success) {
      yield put({
        type: actionConstants.SET_STATE,
        payload: { projectDetail: response.data },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* projectsSaga() {
  yield all([takeLatest(actionConstants.GET_PROJECTS, getProjects)]);
}
