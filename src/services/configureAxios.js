import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
const axiosConfiguration = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    timeout: 30000,
    withCredentials: true,
  });

const axiosInstance = axiosConfiguration();

axiosInstance.interceptors.request.use((config) => {
  // const sessionToken = window.location.pathname.includes("/influencer")
  //   ? process.env.REACT_APP_INFLUENCER_SESSION_TOKEN
  //   : process.env.REACT_APP_BRAND_SESSION_TOKEN;

  config.headers = {
    Accept: "application/json",
    // "sess-token": sessionToken,
    withCredentials: true,
  };

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    if (err.response.status !== 422) {
      toast.error(err.response.data.message);
    }

    if (err.response.status === 422 && err.response.data.message) {
      toast.error(err.response.data.message);
      return;
    }

    return Promise.reject(err.response.data);
  }
);

export default axiosInstance;
