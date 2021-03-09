import actions from './actions';

const initialState = {
  commentData: [],
  meta: [],
  commentDataTs: null,
};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      // const tempArr = state.commentData;
      if (action.payload.meta.page === 1) {
        state.commentData = action.payload.commentData;
      } else {
        state.commentData.push(...action.payload.commentData);
      }
      return {
        ...state,
        commentDataTs: Date.now(),
        commentData: state.commentData,
        meta: action.payload.meta,
      };

    default:
      return state;
  }
}
