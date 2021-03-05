const actionConstants = {
  SET_STATE: 'media/SET_STATE',
};

export default actionConstants;

export const setState = (payload) => ({
  type: actionConstants.SET_STATE,
  payload,
});
