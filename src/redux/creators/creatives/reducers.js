import { ACTIONS } from "./actions";

const initialState = {
  list: [],
  loading: true,
  allCreatives: { list: [], pagination: {} },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
