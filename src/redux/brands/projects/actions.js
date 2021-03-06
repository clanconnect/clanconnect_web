const actionConstants = {
  GET_PROJECTS: 'projects/GET_PROJECTS',
  SET_STATE: 'projects/SET_STATE',
};

export default actionConstants;

export const getProjectsAction = (payload) => ({
  type: actionConstants.GET_PROJECTS,
  payload,
});
