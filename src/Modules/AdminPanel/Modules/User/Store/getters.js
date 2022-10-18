import moment from "moment";

export const getUserDetails = (state) => {
  return state.userDetails;
};

export const getUserListForExcel = (state) => {
  const dataExcel = state.users.map((user) => {
    console.log(user);
    const {
      id,
      firstName,
      lastName,
      created,
      didReview,
      email,
      isActive,
      isAdmin,
      isClient,
      isOwner,
      isVerified,
      phone,
      whatsapp,
    } = user;
    return {
      id: id,
      registro: created,
      nombre: `${firstName} ${lastName}`,
      email: email,
      telefono: phone,
      whatsapp: whatsapp ? `"${whatsapp}"` : "",
      verificado: isVerified ? "Si" : "No",
      activado: isActive ? "Si" : "No",
      dueño: isOwner ? "Si" : "No",
      cliente: isClient ? "Si" : "No",
      admin: isAdmin ? "Si" : "No",
      review: didReview ? "Si" : "No",
    };
  });
  return dataExcel;
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
  if (state.users.length && word.length) {
    return state.users.filter((user) => {
      if (user.firstName.toLowerCase().indexOf(word.toLowerCase()) > -1) {
        return user;
      }
    });
  } else {
    return state.users;
  }
};

export const getFilteredTrashUsers = (state) => (word) => {
  if (state.trash.length && word.length) {
    return state.trash.filter((user) => {
      if (user.firstName.toLowerCase().indexOf(word.toLowerCase()) > -1) {
        return user;
      }
    });
  } else {
    return state.trash;
  }
};

export const getUserById = (state) => (id) => {
  return state.users.find((user) => user.id == id);
};

export const getAllUsers = (state) => {
  return state.users;
}