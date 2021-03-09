const actionConstants = {
  GET_CREATIVES: 'creatives/GET_CREATIVES',
  CREATIVE_UPDATE_STATUS: 'creatives/CREATIVE_UPDATE_STATUS',
  CREATIVE_BULK_UPDATE: 'creatives/CREATIVE_BULK_UPDATE',
  SET_STATE: 'creatives/SET_STATE',
};

export default actionConstants;

export const getCreativesAction = (payload) => ({
  type: actionConstants.GET_CREATIVES,
  payload,
});

export const creativeUpdateStatusAction = (payload) => ({
  type: actionConstants.CREATIVE_UPDATE_STATUS,
  payload,
});

export const creativeUpdateBulkAction = (payload) => ({
  type: actionConstants.CREATIVE_BULK_UPDATE,
  payload,
});
