export const isAuth = (state) => {
  return state.isAuth;
};
export const isAdmin = (state) => {
  return state.user && state.user.isAdmin;
};
export const user = (state) => {
  return {
    user: state.user,
    token: state.token,
    firebaseToken: state.firebaseStoratgeToken,
  };
};
export const isModalOpen = (state) => {
  return state.showLoginModal;
};
export const isWelcomeModalOpen = (state) => {
  return state.showWelcomeModal;
};
export const siteCountry = (state) => {
  return state.siteCountry;
};

export const GETTER_SHOW_COOKIES_BANNER = (state) => {
  return state.showCookiesBanner;
};