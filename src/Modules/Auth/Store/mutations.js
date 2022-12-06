import moment from "moment";

export const register = (state, { user, token, storageTokenAuthFirebase }) => {
  state.showWelcomeModal = true;
  state.user = user;
  state.isAuth = true;
  state.token = token;
  state.firebaseStoratgeToken = storageTokenAuthFirebase;
  state.tokenLastUpdated = moment()
};
export const login = (state, { user, token, storageTokenAuthFirebase }) => {
  state.user = user;
  state.isAuth = true;
  state.token = token;
  state.firebaseStoratgeToken = storageTokenAuthFirebase;
  state.showWelcomeModal = true;
  state.tokenLastUpdated = moment()
};
export const changeAccessToken = (state, token) => {
  state.token = token;
  state.tokenLastUpdated = moment()
};

export const changeShowLoginModal = (state, open) => {
  state.showLoginModal = open;
  state.showWelcomeModal = false;
};
export const changeShowWelcomeModal = (state, open) => {
  state.showWelcomeModal = open;
};
export const logout = (state) => {
  console.log("[[Mutations {{logout}}]]");
  state.user = {};
  state.token = null;
  state.tokenLastUpdated = null;
  state.firebaseStoratgeToken = null;
  state.isAuth = false;
  state.showWelcomeModal = false;
};
export const updateUser = (state, newUser) => {
  state.user = newUser;
};
export const setSiteCountry = (state, country) => {
  state.siteCountry = country;
};

export const updateUserExtraData = (state, { companyName, identityCard, representativeName, rut }) => {
  state.user.companyName = companyName;
  state.user.identityCard = identityCard;
  state.user.representativeName = representativeName;
  state.user.rut = rut;
};