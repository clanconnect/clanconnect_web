import actions from './actions';

const initialState = {
  creativeDetails: [],
  allCreativeDetails: [],
  meta: [],
};

export default function creativesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
