import axiosInstance from "./configureAxios";
import apiConstant from "common/apiConstant";
import * as queryString from "query-string";

export async function getProjectsApi(payload) {
  return await axiosInstance.get(
    apiConstant.GET_PROJECT_BY_ID.replace(":id", payload.id),
    {
      params: payload.params,
    }
  );
}

export async function getProposalsAPI(payload) {
  return await axiosInstance.get(
    apiConstant.GET_PROPOSALS.replace(":id", payload.id),
    {
      params: payload.params,
    }
  );
}

export async function getCreativesAPI(payload) {
  return await axiosInstance.get(
    apiConstant.GET_CREATIVES.replace(":id", payload.id),
    {
      params: payload.params,
    }
  );
}

export async function getCommentsApi({ page, id }) {
  return await axiosInstance.get(
    apiConstant.GET_COMMENTS.replace(":id", id) +
      queryString.stringify({ page: page })
  );
}

export async function postCommentsApi({ text, id }) {
  return await axiosInstance.post(
    apiConstant.POST_COMMENTS.replace(":id", id),
    { text }
  );
}

export async function creativeUpdateStatusApi(payload) {
  return await axiosInstance.patch(
    apiConstant.CREATIVE_UPDATE_STATUS.replace(
      ":projectId",
      payload.projectId
    ).replace(":creativeId", payload.creativeId),
    { status: payload.status, mediaId: payload.mediaId }
  );
}

export async function creativesBulkUpdateApi({ id, status, creatives }) {
  return await axiosInstance.patch(
    apiConstant.CREATIVE_BULK_UPDATE.replace(":projectId", id),
    { status, creatives }
  );
}

export async function getAllCreativesApi(payload) {
  return await axiosInstance.get(
    apiConstant.GET_ALL_CREATIVES.replace(":projectId", payload.id),
    {
      params: payload.params,
    }
  );
}
export class YoutubeService {
  static index({ query }) {
    // /brands/socials/youtube?creativeId=6043533e6d206f62c8236b71
    return axiosInstance.get(
      "/brands/socials/youtube?" + (query && queryString.stringify(query)) || ""
    );
  }
  static cancel({ query }) {
    // /brands/socials/youtube/cancel?socialId=60a398a099458eb97c58b076
    return axiosInstance.patch(
      "/brands/socials/youtube/cancel?" +
        (query && queryString.stringify(query)) || ""
    );
  }
  static approve({ query }) {
    // /brands/socials/youtube/approve?socialId=60a398a099458eb97c58b076
    return axiosInstance.patch(
      "/brands/socials/youtube/approve?" +
        (query && queryString.stringify(query)) || ""
    );
  }
}
