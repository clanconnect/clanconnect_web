const actionConstants = {
  GET_CREATIVES: 'creatives/GET_CREATIVES',
  SET_STATE: 'creatives/SET_STATE',
};

export default actionConstants;

export const getCreativesAction = (payload) => ({
  type: actionConstants.GET_CREATIVES,
  payload,
});
