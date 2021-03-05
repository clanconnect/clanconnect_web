import axios from 'axios';
import { toast } from 'react-toastify';

const axiosConfiguration = () =>
  axios.create({
    baseURL: 'https://api.clanconnect.sbtechzone.com',
    timeout: 30000,
  });

const axiosInstance = axiosConfiguration();

// axiosInstance.interceptors.request.use(async (config) => {
//   const { store } = await import('../index');
//   const state = store.getState().user;

//   config.headers = {
//     Accept: 'application/json',
//     Authorization: `${state.token}`,
//   };
//   return config;
// });

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    console.log(err);
    // if (err.response.status != 422) {
    //will show toast notification
    //toast.error(err.response.data.message);
    //toast.error();
    // }

    // if (err.response.status === 422 && err.response.data.message) {
    // toast.error(err.response.data.message);
    // return;
    // }
    return Promise.reject(err.response.data);
  }
);

export default axiosInstance;
