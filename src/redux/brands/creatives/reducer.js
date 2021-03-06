import actions from './actions';

const initialState = {
  creativeDetails: [],
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
