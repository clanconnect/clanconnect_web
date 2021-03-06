const actionConstants = {
  SET_STATE: 'media/SET_STATE',
  GET_MEDIA: 'media/GET_MEDIA',
};

export default actionConstants;

export const setState = (payload) => ({
  type: actionConstants.SET_STATE,
  payload,
});

export const getMediaAction = (payload) => ({
  type: actionConstants.GET_MEDIA,
  payload,
});
