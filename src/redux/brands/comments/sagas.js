import { all, takeLatest, put, call } from "redux-saga/effects";
import actionConstants from "./actions";
import { getCommentsApi, postCommentsApi } from "services/brands";
import { getCommentsAction } from "./actions";

export function* getComments(action) {
  try {
    const response = yield call(getCommentsApi, action.payload);

    if (response.success) {
      yield put({
        type: actionConstants.SET_STATE,
        payload: {
          commentData: response.data,
          meta: response.meta.pagination,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* postComments(action) {
  try {
    const response = yield call(postCommentsApi, action.payload);

    if (response.success) {
      yield getComments(getCommentsAction({ page: 1, id: action.payload.id }));
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* proposalsSaga() {
  yield all([
    takeLatest(actionConstants.GET_COMMENTS, getComments),
    takeLatest(actionConstants.POST_COMMENTS, postComments),
  ]);
}
