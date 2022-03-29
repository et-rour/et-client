export const register = (state, { user, token, storageTokenAuthFirebase }) => {
  state.showWelcomeModal = true;
  state.user = user;
  state.isAuth = true;
  state.token = token;
  state.firebaseStoratgeToken = storageTokenAuthFirebase;
};
export const login = (state, { user, token, storageTokenAuthFirebase }) => {
  state.user = user;
  state.isAuth = true;
  state.token = token;
  state.firebaseStoratgeToken = storageTokenAuthFirebase;
  state.showWelcomeModal = true;
};
export const changeAccessToken = (state, token) => {
  state.token = token;
};

export const changeShowLoginModal = (state, open) => {
  state.showLoginModal = open;
};
export const changeShowWelcomeModal = (state, open) => {
  state.showWelcomeModal = open;
};
export const logout = (state) => {
  console.log("[[Mutations {{logout}}]]");
  state.user = {};
  state.token = null;
  state.firebaseStoratgeToken = null;
  state.isAuth = false;
  state.showWelcomeModal = false;
};
