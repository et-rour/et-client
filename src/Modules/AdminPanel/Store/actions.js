import EspacioAPI from "../../../Api/index";

// USERS
export const getUsers = async ({ commit }) => {
  const res = await EspacioAPI.get("/admin/listusers");
  const users = res.data;
  console.log("%cactions.js line:6 users", "color: #007acc;", users);
  commit("getUsers", users);
};

export const changeIsActiveUser = async ({ commit }, { id, activeStatus }) => {
  const res = await EspacioAPI.put(`admin/changeuserstatus`, {
    id: id,
    isActive: activeStatus,
  });
  const { idUser, isActive } = res.data;
  commit("changeIsActiveUser", { idUser, isActive });
};

export const changeIsOwnerStatus = async (
  { commit },
  { id, isOwnerStatus }
) => {
  const res = await EspacioAPI.put(`admin/makeowner`, {
    id: id,
    isOwner: isOwnerStatus,
  });
  const { idUser, isOwner } = res.data;
  commit("changeIsOwnerStatus", { idUser, isOwner });
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
  const res = await EspacioAPI.get("/admin/zone");
  const zones = res.data;
  console.log("%cactions.js line:6 zones", "color: #007acc;", zones);
  commit("getZones", zones);
};
export const createZone = async ({ commit }, zone) => {
  const res = await EspacioAPI.post("/admin/zone", zone);
  const newZone = res.data;
  commit("createZone", newZone);
  return newZone.id;
};
export const modifyZone = async ({ commit }, zone) => {
  const res = await EspacioAPI.put("/admin/zone", zone);
  const newZone = res.data;
  commit("modifyZone", newZone);
};
export const changeIsActiveZone = async ({ commit }, { id, activeStatus }) => {
  const res = await EspacioAPI.put(`admin/changezonestatus`, {
    id: id,
    isActive: activeStatus,
  });
  const { idZone, isActive } = res.data;
  commit("changeIsActiveZone", { idZone, isActive });
};

// LOCATIONS
export const getLocations = async ({ commit }) => {
  const res = await EspacioAPI.get("/admin/listlocations");
  const locations = res.data.locations;
  commit("getLocations", locations);
};
export const modifyLocation = async ({ commit }, location) => {
  const res = await EspacioAPI.put("/admin/modifylocation", location);
  const newLocation = res.data;
  commit("modifyLocation", newLocation);
};
export const createLocation = async ({ commit }, location) => {
  const res = await EspacioAPI.post("/admin/createlocation", location);
  const newLocation = res.data;
  console.log("Created location", newLocation);
  commit("createLocation", newLocation);
};
export const changeIsActiveLocation = async (
  { commit },
  { id, activeStatus }
) => {
  const res = await EspacioAPI.put(`admin/changelocationstatus`, {
    id: id,
    isActive: activeStatus,
  });
  const { idLocation, isActive } = res.data;
  commit("changeIsActiveLocation", { idLocation, isActive });
};
export const changeIsVerifiedLocation = async (
  { commit },
  { id, isVerifiedStatus }
) => {
  const res = await EspacioAPI.put(`admin/verifylocation`, {
    id: id,
    isVerified: isVerifiedStatus,
  });
  const { idLocation, isVerified } = res.data;
  commit("changeIsVerifiedLocation", { idLocation, isVerified });
};
export const setLocationValue = async ({ commit }, data) => {
  const res = await EspacioAPI.put("/admin/setlocationvalue", data);
  const { value, stripePriceId, stripeProductId } = res.data;
  commit("setLocationValue", {
    idLocation: data.locationId,
    value,
    stripePriceId,
    stripeProductId,
  });
  return value;
};
export const changeIsActivePropertyInLocation = async (
  { commit },
  { idLocation, isActive }
) => {
  const res = await EspacioAPI.put(`/locations/toogleActive/${idLocation}`, {
    active: isActive,
  });
  const location = res.data;
  commit("changeIsActivePropertyInLocation", location);
};

// ROOMS
export const createRoom = async (
  { commit },
  { name, image, squareMeter, value, locationId, description }
) => {
  const res = await EspacioAPI.post(`room/`, {
    name,
    image,
    squareMeter,
    locationId,
    value,
    description,
  });
  const newRoom = res.data;
  commit("createRoom", newRoom);
};
export const updateRoom = async (
  { commit },
  { id, name, image, squareMeter, locationId, value, description }
) => {
  const res = await EspacioAPI.put(`room/${id}`, {
    name,
    image,
    squareMeter,
    locationId,
    value,
    description,
  });
  const newRoom = res.data;
  commit("updateRoom", newRoom);
};

export const updateRoomImage = async (
  { commit },
  { locationId, idRoom, imageUrl }
) => {
  const res = await EspacioAPI.put(`room/${idRoom}/image`, {
    image: imageUrl,
    locationId,
  });
  const newImageUrl = res.data;
  commit("updateRoomImage", newImageUrl);
};

// REVIEWS
export const getReviews = async ({ commit }) => {
  const res = await EspacioAPI.get("/admin/review");
  const zones = res.data;
  commit("getReviews", zones);
};

export const changeIsActiveReview = async (
  { commit },
  { id, activeStatus }
) => {
  const res = await EspacioAPI.put(`admin/changereviewstatus`, {
    id: id,
    isActive: activeStatus,
  });
  const { idReview, isActive } = res.data;
  commit("changeIsActiveReview", { idReview, isActive });
};

export const changeIsVerifiedReview = async (
  { commit },
  { id, isVerifiedStatus }
) => {
  const res = await EspacioAPI.put(`admin/verifyreview`, {
    id: id,
    isVerified: isVerifiedStatus,
  });
  const { idReview, isVerified } = res.data;
  commit("changeIsVerifiedReview", { idReview, isVerified });
};

export const getReservations = async ({ commit }) => {
  const res = await EspacioAPI.get("/admin/reservation");
  const reservations = res.data;
  console.log(
    "%cactions.js line:159 reservations",
    "color: #007acc;",
    reservations
  );
  commit("getReservations", reservations);
};

// POSTS

export const getPublications = async ({ commit }) => {
  const res = await EspacioAPI.get("/admin/publications");
  const publications = res.data.publications;
  commit("getPublications", publications);
};

export const changeIsVerifiedPublication = async (
  { commit },
  { id, isVerifiedStatus }
) => {
  const res = await EspacioAPI.put(`admin/verifypublication/${id}`, {
    isVerified: isVerifiedStatus,
  });
  const { idPublication, isVerified } = res.data;
  commit("changeIsVerifiedPublication", { idPublication, isVerified });
};
// IMAGE3D
export const postImage3d = async ({ commit }, { imageData, idLocation }) => {
  const res = await EspacioAPI.post("/image3d/", imageData);
  const savedImage = res.data;
  console.log({ image3d: savedImage });
  commit("postImage3d", { savedImage, idLocation });
};
export const updateImage3d = async (
  { commit },
  { imageData, locationId, idImage3d }
) => {
  const res = await EspacioAPI.put(`/image3d/${idImage3d}`, {
    ...imageData,
    locationId,
  });
  const updatedImage = res.data;
  console.log({ updatedImage });
  commit("updateImage3d", { updatedImage, locationId });
};
