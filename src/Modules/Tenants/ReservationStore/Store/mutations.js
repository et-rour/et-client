export const changeReservationDateRange = (
  state,
  { start, end, correctDate, timeQuantity }
) => {
  state.reservationDateRange = {
    start,
    end,
  };
  state.correctReservationDateRange = correctDate;
  state.timeQuantity = timeQuantity;
};

export const initRasarvationStorage = (state, reservationData) => {
  state.reservationValue = reservationData.value;
  state.reservationName = reservationData.name;
  state.address = reservationData.address;
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
export const changeSignature = (state, contractData) => {
  state.contractData = contractData;
};
export const changeReservationValue = (state, { value }) => {
  state.reservationValue = value;
};
