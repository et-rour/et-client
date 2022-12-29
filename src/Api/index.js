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
