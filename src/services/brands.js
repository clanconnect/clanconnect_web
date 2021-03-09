import axiosInstance from './configureAxios';
import apiConstant from 'common/apiConstant';
import * as queryString from 'query-string';

export async function getProjectsApi(payload = '5f888ecae9dac36951051c17') {
  return await axiosInstance.get(
    apiConstant.GET_PROJECT_BY_ID.replace(':id', payload)
  );
}

export async function getProposalsAPI(payload) {
  return await axiosInstance.get(
    apiConstant.GET_PROPOSALS.replace(':id', '5f8d3415e9dac37cb736defe'),
    {
      params: payload.params,
    }
  );
}

export async function getCreativesAPI(payload) {
  return await axiosInstance.get(
    apiConstant.GET_CREATIVES.replace(':id', '5f8d3415e9dac37cb736defe'),
    {
      params: payload.params,
    }
  );
}

export async function getCommentsApi({ page, id }) {
  return await axiosInstance.get(
    apiConstant.GET_COMMENTS.replace(':id', id) +
      queryString.stringify({ page: page })
  );
}

export async function postCommentsApi({ text, id }) {
  return await axiosInstance.post(
    apiConstant.POST_COMMENTS.replace(':id', id),
    { text }
  );
}
