import axios from "axios";
import store from "../store/index";
const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
});
instance.interceptors.request.use(
  (config) => {
    let token = "";
    if (store && store.state && store.state.authStore)
      token = store.state.authStore.token;

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
