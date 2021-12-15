import { ACTIONS } from "./actions";

const initialState = {
  data: {},
  fbPages: [],
  igId: "",
  shouldConnectFbAccount: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
