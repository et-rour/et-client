import EspacioAPI from "../../../Api/index";

export const ACTION_GET_OWNER_LOCATIONS = async ({ commit }, idOwner) => {
  const { data } = await EspacioAPI.get(`/owner/${idOwner}`);
  commit("MUTATION_GET_OWNER_LOCATIONS", data);
};

