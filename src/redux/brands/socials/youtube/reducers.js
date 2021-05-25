import { ACTIONS } from "./actions";

const initialState = {
  data: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      console.log("payload", action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
