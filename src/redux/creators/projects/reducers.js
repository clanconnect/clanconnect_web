import { ACTIONS } from "./actions";

const initialState = {
  list: [],
  loading: true,
};

export default function proposalReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
