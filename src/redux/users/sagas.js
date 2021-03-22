import { ACTIONS } from "./actions";
import { call, put, takeLatest, all } from "redux-saga/effects";
import { UserService } from "../../services/user";
/**
 * GET a single user
 */
export function* fetchIndex() {
  try {
    const response = yield call(UserService.index);
    if (response.success) {
      console.log(response.data);
      // Action is dispatched to user reducer
      yield put({
        type: ACTIONS.SET_STATE,
        payload: { user: response.data, loading: false },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export default function* UserSagas() {
  // This is triggered by dispatch of GET_USER by the component
  yield all([takeLatest(ACTIONS.GET_USER, fetchIndex)]);
}
