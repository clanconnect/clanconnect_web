const actionConstants = {
  GET_PROPOSALS: 'proposals/GET_PROPOSALS',
  SET_STATE: 'projects/SET_STATE',
};

export default actionConstants;

export const getProposalsAction = (payload) => ({
  type: actionConstants.GET_PROPOSALS,
  payload,
});
