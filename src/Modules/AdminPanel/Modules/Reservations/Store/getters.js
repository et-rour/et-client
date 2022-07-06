import moment from "moment";

export const getAllReservationsCorrectDataStructure = (state) => {
  const reservationsData = state.reservations.map((reserv) => {
    return {
      id: reserv.id,
      start: moment(reserv.start).format("DD/MM/YYYY"),
      end: moment(reserv.end).format("DD/MM/YYYY"),
      price: Number(reserv.price),
      status: reserv.status,
      created: moment(reserv.created).format("DD/MM/YYYY"),
      location: reserv.location ? reserv.location.id : "",
      room: reserv.room ? reserv.room.id : "",
    };
  });
  return reservationsData;
};
