import actions from './actions';

const initialState = {
  commentData: [],
  meta: [],
};

export default function commentsReducer(state = initialState, action) {
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
