import EspacioAPI from "@/Api/index.js";

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
