import EspacioAPI from "@/Api/index.js";

export const fetchUserDetails = async ({ commit }, id) => {
  const res = await EspacioAPI.get(`/admin/user/${id}`);
  const user = res.data;
  commit("fetchUserDetails", user);
};

export const getUsers = async ({ commit }) => {
  const res = await EspacioAPI.get("/admin/listusers");
  const users = res.data;
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

export const changeIsAdminRol = async ({ commit }, { id, isAdminStatus }) => {
  const res = await EspacioAPI.put(`admin/user/${id}/asignAdmin`, {
    isAdmin: isAdminStatus,
  });
  commit("changeIsAdminRol", res.data);
};
