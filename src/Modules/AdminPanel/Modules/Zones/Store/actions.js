import EspacioAPI from "@/Api/index.js";

export const getZones = async ({ commit }) => {
  const res = await EspacioAPI.get("/admin/zone");
  const zones = res.data;
  commit("getZones", zones);
};

export const fetchZoneDetails = async ({ commit }, idZone) => {
  const res = await EspacioAPI.get(`/admin/zone/${idZone}`);
  const zone = res.data;
  commit("fetchZoneDetails", zone);
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
