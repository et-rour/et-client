import store from "@/store"; //or use a full path to ./store

const isAuth = (next) => {
  const { isAuth } = store.state.authStore;
  if (!isAuth) {
    store.commit("authStore/changeShowLoginModal", true);
    next(false);
  } else {
    next(true);
  }
};
export { isAuth };
