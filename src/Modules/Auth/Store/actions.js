import EspacioAPI from "../../../Api/index";
import {
  auth,
  signInWithCustomToken,
  onAuthStateChanged,
  signOut,
  analytics,
  logEvent,
} from "../../../Firebase/index";

export const login = async ({ commit }, data) => {
  const res = await EspacioAPI.post("/auth/login", data);
  console.log({ token: res.data.token });
  const { user } = await signInWithCustomToken(
    auth,
    res.data.storageTokenAuthFirebase
  );
  logEvent(analytics, "login", { user: user.uid });
  console.log({ user });
  commit("login", res.data);
};

export const loadSession = async ({ commit }) => {
  await onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      // console.log({ uid });
      if (!auth) return;
      const refreshtoken = await auth.currentUser.getIdToken(true);
      // console.log(
      //   "%cactions.js line:32 refreshtoken",
      //   "color: #007acc;",
      //   refreshtoken
      // );

      commit("changeAccessToken", refreshtoken);
      // ...
    }
  });
};

// export const refresh = async ({ commit }) => {
//   console.log(commit);
//   auth.currentUser
//     .getIdToken(/* forceRefresh */ true)
//     .then(function (idToken) {
//       // Send token to your backend via HTTPS
//       // ...
//       console.log(idToken);
//     })
//     .catch(function (error) {
//       // Handle error
//       console.log(error);
//     });
// };

export const loginInfirebaseStorage = async (_, customTokenAuthFirebase) => {
  // console.log(commit);
  let userAuthFirebase;
  try {
    userAuthFirebase = await signInWithCustomToken(
      auth,
      customTokenAuthFirebase
    );

    console.log(userAuthFirebase);
    return true;
  } catch (error) {
    console.log(`You are not allowed to do that error:${error}`);
    throw new Error(`${error}`);
  }
};

export const register = async ({ commit }, credentials) => {
  const response = await EspacioAPI.post("/auth/register", credentials);
  if (response.data && response.data.token)
    window.localStorage.setItem(
      process.env.VUE_APP_API_BASE,
      response.data.token
    );
  commit("register", response.data);
};

export const logout = async ({ commit }) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      commit("logout");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

export const updateUser = async ( _ , {id,data}) => {
  const result  = await EspacioAPI.put(`/auth/${id}`, data);
  return result.data
};

export const setSiteCountry = ({ commit }, country) => {
  commit("setSiteCountry", country);
};

export const updateUserExtraData = async ({commit}, data) => {
  const res = await EspacioAPI.put(`/auth/extra`, data)
  console.log('%cactions.js line:123 res', 'color: white; background-color: #007acc;', res.data);
  commit("updateUserExtraData", res.data)
};

