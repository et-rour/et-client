export const getReservations = (state, reservations) => {
  console.log(
    "%cmutations.js line:191 reservations",
    "color: #007acc;",
    reservations
  );
  state.reservations = reservations;
};
