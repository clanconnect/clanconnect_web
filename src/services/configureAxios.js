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
    //console.log(process.env.REACT_APP_STAGE);
    headers["sess-token"] =
    //"_irida_session=S0R82hhJOPMn56wrXDHlFTrv4C72iPj%2BhcyK%2BO50fFo8ttmcEZ7EW7ypsgx2KiHLKkMdeowjaU7cttp3Z5BTzV%2BoV5PhUEWQLSnM6Z%2BS7KNXXlRPWsVT5k5ABQLv8SkJ1EnlkpSU5RR9qw%2Fm6hDOJK7gC3RBvGtDmlbNdcCPZuMyGRC3XUIdIvY9Q64f1HOqNoau0HX7ujhYCTI9FxA3bXMw5KAM4X1EVBr7f3AfSc141340vzYA2cAygz09XljIFsMOZQ%3D%3D--R3SNDWOTvJ8g9KqI--pV66SBvezSezG1zJC6oX%2BQ%3D%3D"
    // // influencer
     //"_irida_session=IHB9EhXoMO0aB608hGHaHPhloCOpT6annHpAQsIU4M7RQJxacJuQr08Gl9lRafgHGtJzKLJngTKl87HEraxGMPuGCjdicJVmWN9BH6QdM3rS8ciWwp8kHPPKi4Y7KqXwlx0%2BmnzzGNPemDT4zp%2BIpqXRFt%2F3Gt%2B5faL0IwlMaWjL3ATy8za8R72r36%2BhB%2Fe9%2Bt2o2k7f8jMifI8hbKkXBkE20xK8LsYpyu4WNHVQL%2BoIR3J2sMTw16%2BEiYYS0HuObe9vuQ%3D%3D--iPcixv6Unrlpz9iE--Wlnk7jNOYzSZgA23nJiLxg%3D%3D"
    // // advertiser
    "_irida_session=LrRLpI1oMBI3ApZyn8o2Z4s4JHyxKkq5aWLQT4eGXusbWTNajnzOsbW7fsJtztnF15N2KjKZP1fBbEPXRv82nHew1VWnT3omIe3OqgN9ny97uSaxBYXGzmafuxO86bsXRkEersgINpsKMjkEGQ%2ByKSkfXN99FzvJEUBN2ucZd3%2FXSOSCzQzp--kz%2FA1HebTF0w7h6H--KQnLbf8glrB2kxcniHNIQw%3D%3D"
    
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
