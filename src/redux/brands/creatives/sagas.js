import { all, takeLatest, put, call, select } from "redux-saga/effects";
import actionConstants from "./actions";
import {
  getCreativesAPI,
  creativeUpdateStatusApi,
  creativesBulkUpdateApi,
  getAllCreativesApi,
} from "services/brands";
import { getCreativesAction } from "./actions";

export function* getCreatives(action) {
  try {
    const response = yield call(getCreativesAPI, action.payload);
    if (response.success) {
      yield put({
        type: actionConstants.SET_STATE,
        payload: { creativeDetails: response.data },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

//update creative status
export function* updateCreativeStatus(action) {
  try {
    const response = yield call(creativeUpdateStatusApi, action.payload);
    if (response.success) {
      yield getCreatives(
        getCreativesAction({
          params: {
            include: "media,user",
            status: action.payload.currentStatus,
          },
          id: action.payload.projectId,
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
}

//bulk update
export function* creativesBulkUpdate(action) {
  try {
    const response = yield call(creativesBulkUpdateApi, action.payload);
    if (response.success) {
      yield getCreatives(
        getCreativesAction({
          params: {
            include: "media,user",
            status: action.payload.currentStatus,
          },
          id: action.payload.projectId,
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
}

//all creative list
export function* getAllCreatives(action) {
  try {
    const response = yield call(getAllCreativesApi, action.payload);
    if (response.success) {
      yield put({
        type: actionConstants.SET_STATE,
        payload: {
          allCreativeDetails: response.data,
          pagination: response.meta.pagination,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
// update stats (unread comments)
export function* updateCreativeStats(action) {
  const creativeDetails = yield select(
    (store) => store.creatives.creativeDetails
  );

  for (const arr1 of creativeDetails) {
    for (const obj1 in arr1) {
      if (obj1 === "creatives") {
        for (const creative of arr1[obj1]) {
          console.log("creative", creative, action.payload.id);
          if (creative.id === action.payload.id) {
            creative.stats.unreadComments = 0;
          }
        }
      }
    }
  }
  // const creative = creativeDetails[0].creatives.filter(
  //   (creative) => creative.id === action.payload.id
  // );
  yield put({
    type: actionConstants.SET_STATE,
    payload: {
      creativeDetails,
    },
  });
}

export default function* proposalsSaga() {
  yield all([
    takeLatest(actionConstants.GET_CREATIVES, getCreatives),
    takeLatest(actionConstants.CREATIVE_UPDATE_STATUS, updateCreativeStatus),
    takeLatest(actionConstants.CREATIVE_BULK_UPDATE, creativesBulkUpdate),
    takeLatest(actionConstants.GET_ALL_CREATIVES, getAllCreatives),
    takeLatest(actionConstants.UPDATE_STATS, updateCreativeStats),
  ]);
}
