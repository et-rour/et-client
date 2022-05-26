export const isAuth = (state) => {
  return state.isAuth;
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
}