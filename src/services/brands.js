import axiosInstance from './configureAxios';
import apiConstant from 'common/apiConstant';

export async function getProjectsApi(payload = '5f888ecae9dac36951051c17') {
  return await axiosInstance.get(
    apiConstant.GET_PROJECT_BY_ID.replace(':id', payload)
  );
}

export async function getProposalsAPI(payload) {
  return await axiosInstance.get(
    apiConstant.GET_PROPOSALS + `5f8d3415e9dac37cb736defe/proposals`,
    {
      params: payload.payload,
    }
  );
}

export async function getCreativesAPI(payload) {
  return await axiosInstance.get(
    apiConstant.GET_CREATIVES + `5f8d3415e9dac37cb736defe/creatives`,
    {
      params: payload.payload,
    }
  );
}
