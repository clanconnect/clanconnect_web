import { all, fork } from 'redux-saga/effects';
import mediaSaga from './media/sagas';
import projectsSaga from './brands/projects/sagas';
import proposalsSaga from './brands/proposals/sagas';
import creativeSaga from './brands/creatives/sagas';
import commentSaga from './brands/comments/sagas';
export default function* rootSaga() {
  yield all([
    fork(mediaSaga),
    fork(projectsSaga),
    fork(proposalsSaga),
    fork(creativeSaga),
    fork(commentSaga),
  ]);
}
