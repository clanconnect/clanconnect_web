const actionConstants = {
  GET_COMMENTS: "comments/GET_COMMENTS",
  POST_COMMENTS: "comments/POST_COMMENTS",
  SET_STATE: "comments/SET_STATE",
};

export default actionConstants;

export const getCommentsAction = (payload) => {
  return {
    type: actionConstants.GET_COMMENTS,
    payload,
  };
};

export const postCommentsAction = (payload) => ({
  type: actionConstants.POST_COMMENTS,
  payload,
});
