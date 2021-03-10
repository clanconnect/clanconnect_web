import axiosInstance from './configureAxios';
import apiConstant from 'common/apiConstant';
import * as queryString from 'query-string';

export async function getProjectsApi(payload) {
  return await axiosInstance.get(
    apiConstant.GET_PROJECT_BY_ID.replace(':id', payload.id),
    {
      params: payload.params,
    }
  );
}

export async function getProposalsAPI(payload) {
  return await axiosInstance.get(
    apiConstant.GET_PROPOSALS.replace(':id', payload.id),
    {
      params: payload.params,
    }
  );
}

export async function getCreativesAPI(payload) {
  return await axiosInstance.get(
    apiConstant.GET_CREATIVES.replace(':id', payload.id),
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

export async function creativeUpdateStatusApi(payload) {
  return await axiosInstance.patch(
    apiConstant.CREATIVE_UPDATE_STATUS.replace(
      ':projectId',
      payload.projectId
    ).replace(':creativeId', payload.creativeId),
    { status: payload.status }
  );
}

export async function creativesBulkUpdateApi({ id, status, creatives }) {
  return await axiosInstance.patch(
    apiConstant.CREATIVE_BULK_UPDATE.replace(':projectId', id),
    { status, creatives }
  );
}

export async function getAllCreativesApi(payload) {
  return await axiosInstance.get(
    apiConstant.GET_ALL_CREATIVES.replace(':projectId', payload.id),
    {
      params: payload.params,
    }
  );
}
