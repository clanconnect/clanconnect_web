import axios from 'axios';
import { toast } from 'react-toastify';
const axiosConfiguration = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    timeout: 30000,
  });

const axiosInstance = axiosConfiguration();

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    Accept: 'application/json',
    'sess-token': process.env.REACT_APP_API_SESSION_TOKEN,
    withCredentials: true,
  };

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    console.log(err);
    if (err.response.status != 422) {
      toast.error(err.response.data.message);
      toast.error();
    }

    if (err.response.status === 422 && err.response.data.message) {
      toast.error(err.response.data.message);
      return;
    }
    return Promise.reject(err.response.data);
  }
);

export default axiosInstance;
