import EspacioAPI from "../../../Api/index";

// USERS
export const getUsers = async ({ commit }) => {
  const res = await EspacioAPI.get("/auth/users");
  const users = res.data.users;
  console.log("%cactions.js line:6 users", "color: #007acc;", users);
  commit("getUsers", users);
};

export const changeIsActiveProperty = async (
  { commit },
  { idUser, isActive }
) => {
  const res = await EspacioAPI.put(`/auth/toogleActive/${idUser}`, {
    active: isActive,
  });
  const user = res.data;
  console.log("%cactions.js line:6 users", "color: #007acc;", user);
  commit("changeIsActiveProperty", user);
};

// ZONES
export const getZones = async ({ commit }) => {
  const res = await EspacioAPI.get("/zones");
  const zones = res.data.zones;
  console.log("%cactions.js line:6 zones", "color: #007acc;", zones);
  commit("getZones", zones);
};

export const getLocations = async ({ commit }) => {
  const res = await EspacioAPI.get("/locations/all");
  const locations = res.data.locations;
  console.log("%cactions.js line:6 locations", "color: #007acc;", locations);
  commit("getLocations", locations);
};

export const changeIsActivePropertyInLocation = async (
  { commit },
  { idLocation, isActive }
) => {
  const res = await EspacioAPI.put(`/locations/toogleActive/${idLocation}`, {
    active: isActive,
  });
  const location = res.data;
  console.log("%cactions.js line:6 location", "color: #007acc;", location);
  commit("changeIsActivePropertyInLocation", location);
};
