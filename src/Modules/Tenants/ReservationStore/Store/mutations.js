export const changeReservationDateRange = (
  state,
  { start, end, correctDate }
) => {
  state.reservationDateRange = {
    start,
    end,
  };
  state.correctReservationDateRange = correctDate;
};
export const changeReservationData = (
  state,
  { start, end, correctDate, value, name }
) => {
  state.reservationDateRange = {
    start,
    end,
  };
  state.correctReservationDateRange = correctDate;
  state.reservationValue = value;
  state.reservationName = name;
};
export const changeContract = (state, contract) => {
  state.contract = contract;
};
export const changeReservationValue = (state, { value }) => {
  state.reservationValue = value;
};
