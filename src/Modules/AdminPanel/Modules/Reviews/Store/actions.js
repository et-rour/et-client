import EspacioAPI from "@/Api/index.js";

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
