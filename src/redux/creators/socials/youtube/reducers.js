import { ACTIONS } from "./actions";

const initialState = {
  data: {},
  countryCategoriesYoutubeResponse: [],
  shouldConnectGoogleAccount: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      console.log("in reducer ===>", action);
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
