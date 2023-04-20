import EspacioAPI from "@/Api/index.js";

export const getLocations = async ({ commit }) => {
  const res = await EspacioAPI.get("/admin/listlocations");
  const locations = res.data.locations;
  commit("getLocations", locations);
};

export const getCurrenciesList = async ({ commit }) => {
  const res = await EspacioAPI.get("/currency");
  const currencies = res.data;
  commit("getCurrencies", currencies);
};

export const getTrashLocations = async ({ commit }) => {
  const res = await EspacioAPI.get("/admin/listlocationstrash");
  const locations = res.data.locations.length ? res.data.locations : [];
  commit("getTrashLocations", locations);
};

export const fetchLocationDetails = async ({ commit }, idLocation) => {
  commit("changeLoadingLocationDetails", true);
  const res = await EspacioAPI.get(`/admin/location/${idLocation}`);
  const location = res.data;
  commit("fetchLocationDetails", location);
  commit("changeLoadingLocationDetails", false);
};

export const modifyLocation = async ({ commit }, location) => {
  const res = await EspacioAPI.put("/admin/modifylocation", location);
  const newLocation = res.data;
  commit("modifyLocation", newLocation);
};

export const permanentDeleteLocation = async ({ commit }, idLocation) => {
  await EspacioAPI.put("/admin/deletelocationpermanent", { id: idLocation });
  commit("hideLocationTrash", idLocation);
};

export const restoreLocation = async ({ commit }, idLocation) => {
  await EspacioAPI.put("/admin/restorelocation", { id: idLocation });
  commit("restoreLocation", idLocation);
};

export const deleteLocation = async ({ commit }, idLocation) => {
  await EspacioAPI.put("/admin/deletelocation", { id: idLocation });
  commit("hideLocation", idLocation);
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

export const updateZone = async (_, { id, zoneId }) => {
  const res = await EspacioAPI.put("/admin/modifylocation", {
    id: id,
    zone: Number(zoneId),
  });
  console.log("%cactions.js line:110 res", "color: #007acc;", res);
  return true;
};
/*
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
*/

// ROOMS
export const createRoom = async (
  { commit },
  { name, image, squareMeter, value, locationId, description }
) => {
  const res = await EspacioAPI.post(`admin/room/`, {
    name,
    image,
    squareMeter,
    locationId,
    description,
    value,
  });
  const newRoom = res.data;
  commit("createRoom", newRoom);
};
export const updateRoom = async ({ commit }, { id, body }) => {
  const res = await EspacioAPI.put(`admin/room/${id}`, body);
  const newRoom = res.data;
  commit("updateRoom", newRoom);
};
export const updateRoomImage = async (
  { commit },
  { locationId, idRoom, imageUrl }
) => {
  const res = await EspacioAPI.put(`admin/room/${idRoom}/image`, {
    image: imageUrl,
    locationId,
  });
  const room = res.data;
  commit("updateRoom", room);
};
export const updateRoomIsActive = async (
  { commit },
  { locationId, idRoom, isActive }
) => {
  const res = await EspacioAPI.put(`admin/room/${idRoom}/isActive`, {
    isActive,
    locationId,
  });
  const newRoom = res.data;
  commit("updateRoom", newRoom);
};

//  IMAGES 3D
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

// IMAGES
export const changeCoverImage = async ({ commit }, { image, idLocation }) => {
  const res = await EspacioAPI.put(
    `/admin/modifylocation/changeCoverImage/${idLocation}`,
    {
      image,
    }
  );
  const newImage = res.data.image;
  console.log({ image: image });
  commit("changeCoverImage", newImage);
};

export const postLocationImage = async (
  { commit },
  { imageUrl, idLocation }
) => {
  const res = await EspacioAPI.post("/images", {
    image: imageUrl,
    locationId: idLocation,
  });
  const savedImageData = res.data;
  console.log({ image: savedImageData });
  commit("postLocationImage", savedImageData);
};

export const changeIsVisibilityImage = async (_, { idImage, isVisible }) => {
  const res = await EspacioAPI.put(`/admin/images/${idImage}/visible`, {
    isVisible,
  });
  const { image } = res.data;
  // commit("changeIsVisibilityImage", image);
  console.log(
    "%cactions.js line:189 { saved: true, isVisible: image.isVisible }",
    "color: white; background-color: #007acc;",
    { saved: true, isVisible: image.isVisible }
  );
  return { saved: true, isVisible: image.isVisible };
};
