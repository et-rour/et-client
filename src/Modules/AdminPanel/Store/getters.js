import moment from "moment";
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

export const getAllZones = (state) => {
  return state.zones;
};
export const getZoneById = (state) => (id) => {
  return state.zones.find((zone) => zone.id == id);
};

export const getAllLocations = (state) => {
  return state.locations;
};
export const getFilteredLocations = (state) => (word) => {
  // console.log("%cgetters.js line:27 word", "color: #007acc;", word);
  return state.locations.filter((location) => {
    // console.log(location);
    if (location.name.toLowerCase().indexOf(word.toLowerCase()) > -1) {
      return location;
    }
  });
};
export const getLocationById = (state) => (id) => {
  return state.locations.find((location) => location.id == id);
};

export const getAllReviews = (state) => {
  return state.reviews;
};
export const getReviewById = (state) => (id) => {
  console.log("%cgetters.js line:47 getReview", "color: #007acc;", id);
  return state.reviews.find((review) => review.id == id);
};

export const getAllReservationsCorrectDataStructure = (state) => {
  const reservationsData = state.reservations.map((reserv) => {
    return {
      id: reserv.id,
      start: moment(reserv.start).format("LL"),
      end: moment(reserv.end).format("LL"),
      price: reserv.price,
      status: reserv.status,
      // client: `${reserv.client.firstName}`,
      // owner: `${reserv.owner.firstName}`,
    };
  });
  return reservationsData;
};
