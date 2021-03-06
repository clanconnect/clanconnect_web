import axiosInstance from './configureAxios';
import apiConstant from 'common/apiConstant';

export async function getUploadUrlsApi(payload) {
  return await axiosInstance.get(
    apiConstant.GET_UPLOADS_URLS + `n=${payload.length}`
  );
}

export async function registerMediaApi(payload) {
  return await axiosInstance.post(apiConstant.REGISTER_MEDIA, payload);
}

export async function getMediaApi(payload) {
  return await axiosInstance.get(apiConstant.GET_MEDIA, payload);
}
