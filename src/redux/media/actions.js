const actionConstants = {
  SET_STATE: 'media/SET_STATE',
  GET_UPLOADS_URLS: 'media/GET_UPLOADS_URLS',
  REGISTER_MEDIA: 'media/REGISTER_MEDIA',
};

export default actionConstants;

export const uploadMedia = (payload) => ({
  type: actionConstants.SET_STATE,
  payload,
});
