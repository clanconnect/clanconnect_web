import { all, takeLatest, put, call } from "redux-saga/effects";
import { ACTIONS } from "./actions";
import { InstagramService, UserService } from "services/creators";

export function* fetchIndex({ payload: { query } }) {
  try {
    const response = yield call(InstagramService.index, { query });
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
export function* add({ payload: { body } }) {
  try {
    const response = yield call(InstagramService.addNewOrUpdate, { body });
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

export function* cancelPost({ payload: { query } }) {
  try {
    const response = yield call(InstagramService.cancel, { query });
    if (response.success) {
      yield put({ type: ACTIONS.SET_STATE, payload: { data: response.data } });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* finalApprove({ payload: { query } }) {
  try {
    const response = yield call(InstagramService.finalApprove, { query });
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
export function* fetchFbPages() {
  try {
    const response = yield call(UserService.fetchFbPages);
    if (response.success) {
      console.log("data", response.data);
      yield put({
        type: ACTIONS.SET_STATE,
        payload: {
          fbPages: response.data
            ?.filter((o) =>
              ["CREATE_CONTENT", "MANAGE"].every((i) => o.tasks.includes(i))
            )
            ?.map((o) => ({ name: o.name, id: o.id })),
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* fetchIgUserId({ payload: { path } }) {
  try {
    const response = yield call(UserService.fetchIgUserId, { path });
    if (response.success) {
      yield put({
        type: ACTIONS.SET_STATE,
        payload: {
          igId: response.data?.instagram_business_account?.id,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* creatorInstagramSagas() {
  yield all([
    takeLatest(ACTIONS.GET_INDEX, fetchIndex),
    takeLatest(ACTIONS.ADD_POST, add),
    takeLatest(ACTIONS.FINAL_APPROVE, finalApprove),
    takeLatest(ACTIONS.CANCEL_POST, cancelPost),
    takeLatest(ACTIONS.FETCH_FB_PAGES, fetchFbPages),
    takeLatest(ACTIONS.FETCH_IG_ID, fetchIgUserId),
  ]);
}
