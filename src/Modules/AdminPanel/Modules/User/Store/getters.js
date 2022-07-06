import moment from "moment";

export const getUserDetails = (state) => {
  return state.userDetails;
};

export const getUserDetailsCreatedReservetions = (state) => {
  const reservationsData = state.userDetails.clientReservations.map(
    (reserv) => {
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
    }
  );
  return reservationsData;
};

export const getUserDetailsReceivedReservetions = (state) => {
  const reservationsData = state.userDetails.ownerReservations.map((reserv) => {
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

export const getFilteredUsers = (state) => (word) => {
  return state.users.filter((user) => {
    if (user.firstName.toLowerCase().indexOf(word.toLowerCase()) > -1) {
      return user;
    }
  });
};
export const getUserById = (state) => (id) => {
  return state.users.find((user) => user.id == id);
};
