import EspacioAPI from "@/Api/index.js";

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
