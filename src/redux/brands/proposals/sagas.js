import { all, takeLatest, put, call } from "redux-saga/effects";
import actionConstants from "./actions";
import { getProposalsAPI } from "services/brands";

export function* getProposals(action) {
  try {
    const response = yield call(getProposalsAPI, action.payload);
    if (response.success) {
      yield put({
        type: actionConstants.SET_STATE,
        payload: { proposalDetails: response.data },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* proposalsSaga() {
  yield all([takeLatest(actionConstants.GET_PROPOSALS, getProposals)]);
}
