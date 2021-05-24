import { ACTIONS } from "./actions";

const initialStateIg = {
  caption: "",
  scheduleDate: null,
  scheduleTime: null,
  approvalStatus: false,
  uploadStatus: false
}

const returnStateIg = {
  caption: "This is a test caption",
  scheduleDate: new Date("Tue May 25 2021 15:51:53 GMT+0530 (India Standard Time)"),
  scheduleTime: new Date("Mon May 10 2021 04:04:00 GMT+0530 (India Standard Time)"),
  approvalStatus: false,
  uploadStatus: false
};

export default function reducer(state = initialStateIg, action) {
    switch (action.type) {

      case ACTIONS.SET_FORM_IG:
        return { ...initialStateIg, ...action.payload };

      case ACTIONS.GET_FORM_IG:
        return { ...initialStateIg };

      case ACTIONS.GET_FORM_ADMIN_IG:
        return { ...returnStateIg };

      default:
        return initialStateIg;
    }
  }