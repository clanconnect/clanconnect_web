import { ACTIONS } from "./actions";

const initialState = {
  user: {},
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
