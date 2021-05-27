import { all, takeLatest, put, call } from "redux-saga/effects";
import { ACTIONS } from "./actions";
import { YoutubeService } from "services/creators";

export function* fetchIndex({ payload: { query } }) {
  try {
    const response = yield call(YoutubeService.index, { query });
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
    const response = yield call(YoutubeService.addNewOrUpdate, { body });
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
    const response = yield call(YoutubeService.cancel, { query });
    if (response.success) {
      yield put({ type: ACTIONS.SET_STATE, payload: { data: response.data } });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* finalApprove({ payload: { query } }) {
  try {
    const response = yield call(YoutubeService.finalApprove, { query });
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

export function* fetchCategories({ payload: { query } }) {
  try {
    const response = yield call(YoutubeService.getCategories, { query });
    if (response.success) {
      yield put({
        type: ACTIONS.SET_STATE,
        payload: {
          countryCategoriesYoutubeResponse: response.data.items
            .map((item) => {
              return { id: item.id, snippet: item.snippet };
            })
            .filter((item) => item.snippet.assignable === true),
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* creatorYoutubeSagas() {
  yield all([
    takeLatest(ACTIONS.GET_INDEX, fetchIndex),
    takeLatest(ACTIONS.ADD_POST, add),
    takeLatest(ACTIONS.FINAL_APPROVE, finalApprove),
    takeLatest(ACTIONS.CANCEL_POST, cancelPost),
    takeLatest(ACTIONS.GET_CATEGORIES, fetchCategories),
  ]);
}
