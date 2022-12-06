import axios from "axios";
import moment from "moment";
import store from "../store/index";
const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  // baseURL: "https://espacio-temporal-api-production.up.railway.app",
});

instance.interceptors.request.use(
  (config) => {
    let token = "";
    if (store && store.state && store.state.authStore){
      
      if (store.state.authStore.tokenLastUpdated) {
        const minutesDiffNowAndTokenLastUpdate = moment().diff(store.state.authStore.tokenLastUpdated,"minutes")
        if (minutesDiffNowAndTokenLastUpdate >= 1) {
          console.log('%c Rainbowww!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113); margin-bottom: 12px; padding: 5%;',minutesDiffNowAndTokenLastUpdate);
          store.dispatch("authStore/loadSession")
        }
      }
      token = store.state.authStore.token;
    }

    if (token !== "") {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
