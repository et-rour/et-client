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
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log({ uid });
      commit("changeAccessToken", user.accessToken);
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

export const register = ({ commit }, credentials) => {
  EspacioAPI.post("/auth/register", credentials).then((response) => {
    if (response.data && response.data.token)
      window.localStorage.setItem(
        process.env.VUE_APP_API_BASE,
        response.data.token
      );
    commit("register", response.data);
  });
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

export const updateUser = async ({ commit }, currentUser) => {
  const newUserPayload = {
    ...currentUser,
    firstname: currentUser.firstName,
    lastname: currentUser.lastName,
  };
  const res = await EspacioAPI.put("/auth/update", newUserPayload);
  console.log("%cactions.js line:102 res", "color: #007acc;", res);
  const newUser = {
    id: res.data.id,
    firstName: res.data.firstName,
    lastName: res.data.lastName,
    country: res.data.country,
    isOwner: res.data.isOwner,
    phone: res.data.phone,
  };
  commit("updateUser", newUser);
};

export const setSiteCountry = ({ commit }, country) => {
  commit("setSiteCountry", country);
};
