import { all, fork } from "redux-saga/effects";
import mediaSaga from "./media/sagas";
import projectsSaga from "./brands/projects/sagas";
import proposalsSaga from "./brands/proposals/sagas";
import creativeSaga from "./brands/creatives/sagas";
import commentSaga from "./brands/comments/sagas";
import creatorProjectSagas from "./creators/projects/sagas";
import creatorCreativesSagas from "./creators/creatives/sagas";
import UserSagas from "./users/sagas";
import creatorYoutubeSagas from "./creators/socials/youtube/sagas";
import brandYoutubeSagas from "./brands/socials/youtube/sagas";

export default function* rootSaga() {
  yield all([
    fork(mediaSaga),
    fork(projectsSaga),
    fork(proposalsSaga),
    fork(creativeSaga),
    fork(commentSaga),
    fork(creatorProjectSagas),
    fork(creatorCreativesSagas),
    fork(UserSagas),
    fork(creatorYoutubeSagas),
    fork(brandYoutubeSagas),
  ]);
}
