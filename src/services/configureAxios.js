import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;
const axiosConfiguration = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    timeout: 30000,
    withCredentials: true,
  });

const axiosInstance = axiosConfiguration();

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    Accept: "application/json",
    withCredentials: true,
    "sess-token":
      "_irida_session=nRu14cgCz%2FCM4TV4QDeSvzzEUULUOvhmz3H10bQ4ABrCTpO8mxUlAnQd%2Bq3HIhMwr52s5Em%2FQip0ED1rCtl64Ucc2iYT0H3TeZp7UlPiZfOf8rBcavHj%2BomE8STLIPQICasv64RR43qSSkEY4iyeHYWNtLU5cXnhUKp8aQ6aYTcBby5H6Bv4vDOMn00wlzyPGb7JIbdnwAnNICIYPE0t8qca556nSN9AWajDhUly8AsGUDBbgDhTMBek9VzyVY6st21YLg%3D%3D--eDeNMoZ96bvDKhuQ--%2FIOTH%2BCpIwdASbnVwtwelg%3D%3D",
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
