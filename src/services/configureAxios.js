import axios from 'axios';
import { toast } from 'react-toastify';

const axiosConfiguration = () =>
  axios.create({
    baseURL: 'https://api.clanconnect.sbtechzone.com',
    timeout: 30000,
  });

const axiosInstance = axiosConfiguration();

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    Accept: 'application/json',
    ['sess-token']:
      '_irida_session=Wq11Hj5iYUR68m6wmaXnD%2Fq856sKfYNexm6B8Ys5z3Ii16uxoV1w7D2tqoFCIs3IA%2FNoNKONUjDHDWOcXW%2B3nUmmX9CzG4yC3uqfeXu8OH%2BTRmbNpmjsvb50r0UGD4aJl0pJgcAm9H3ffwe7ZpnddUYW5arBgatWmoenb5sf71PQ%2BL756Mxu6aHQ%2BVtAlbg2n0bBQqN3hBKamnBhoOCTXFpVVHjaUinZp5GVtJzeU3%2FH9Sh1yT0BDGe1zF2%2B6OW0EQ4ZOA%3D%3D--Dnqera9Ql3fO18X6--Zk893c5v1rXhkrgJcrY55Q%3D%3D',
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
