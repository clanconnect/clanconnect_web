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
  const headers = {
    Accept: "application/json",
    withCredentials: true,
  };

  if (process.env.REACT_APP_STAGE === "local") {
    console.log(process.env.REACT_APP_STAGE);
    headers["sess-token"] =
      "_irida_session=nRu14cgCz%2FCM4TV4QDeSvzzEUULUOvhmz3H10bQ4ABrCTpO8mxUlAnQd%2Bq3HIhMwr52s5Em%2FQip0ED1rCtl64Ucc2iYT0H3TeZp7UlPiZfOf8rBcavHj%2BomE8STLIPQICasv64RR43qSSkEY4iyeHYWNtLU5cXnhUKp8aQ6aYTcBby5H6Bv4vDOMn00wlzyPGb7JIbdnwAnNICIYPE0t8qca556nSN9AWajDhUly8AsGUDBbgDhTMBek9VzyVY6st21YLg%3D%3D--eDeNMoZ96bvDKhuQ--%2FIOTH%2BCpIwdASbnVwtwelg%3D%3D";
    // // influencer
    // "_irida_session=nRu14cgCz%2FCM4TV4QDeSvzzEUULUOvhmz3H10bQ4ABrCTpO8mxUlAnQd%2Bq3HIhMwr52s5Em%2FQip0ED1rCtl64Ucc2iYT0H3TeZp7UlPiZfOf8rBcavHj%2BomE8STLIPQICasv64RR43qSSkEY4iyeHYWNtLU5cXnhUKp8aQ6aYTcBby5H6Bv4vDOMn00wlzyPGb7JIbdnwAnNICIYPE0t8qca556nSN9AWajDhUly8AsGUDBbgDhTMBek9VzyVY6st21YLg%3D%3D--eDeNMoZ96bvDKhuQ--%2FIOTH%2BCpIwdASbnVwtwelg%3D%3D",
    // // advertiser
    // // "_irida_session=NB3kmZU4hw%2BtbjVQI4JG7o%2FYmlMC9jCE5uspyw0uP7xRjgBi1pkTfqKfy9Sq5492K1lb3U0S7KlcCrC7rJ5GYmubKEqixZCnzgZsHaH6rMTIkx4wSteIoHT7SBwnmW%2BU4mADIYGZJHsWRihdAX7nx%2Bwgsu%2BXfkI7QzIrTOyl5CrvOL4n3k0fpTwlS9Hcjpz70HeCYxv0ezQsDfE86WKUOHeZrld3Rp%2B5OyIGiFYtSVYbFmv%2Foi9UVneDOuwuDWNXjCmm1Q%3D%3D--XeiBMVcDvGonOFoK--ouHQw%2Bv00ILE0YJ1R4eVfA%3D%3D",
  }
  config.headers = headers;
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
