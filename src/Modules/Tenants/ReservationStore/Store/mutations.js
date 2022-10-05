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
  { start, end, correctDate, value, name, address }
) => {
  state.reservationDateRange = {
    start,
    end,
  };
  state.correctReservationDateRange = correctDate;
  state.reservationValue = value;
  state.reservationName = name;
  state.address = address;
};
export const changeContract = (state, contract) => {
  state.contract = contract;
};
export const changeSignature = (state, signature) => {
  state.signature = signature;
};
export const changeReservationValue = (state, { value }) => {
  state.reservationValue = value;
};
