import { all, takeLatest, put, call } from 'redux-saga/effects';
import actionConstants from './actions';
import { getProjectsApi } from 'services/brands';
import ProjectDetails from 'containers/ProjectDetails';

export function* getProjects(payload) {
  try {
    const response = yield call(getProjectsApi);
    console.log(response);
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
