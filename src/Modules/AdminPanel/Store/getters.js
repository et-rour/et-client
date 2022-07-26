/*
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
*/

// zones
/*
export const getAllZones = (state) => {
  return state.zones;
};
export const getZoneById = (state) => (id) => {
  return state.zones.find((zone) => zone.id == id);
};
*/

// locations
/*
export const getAllLocations = (state) => {
  return state.locations;
};
export const getAllLocationRooms = (state) => (idLocation) => {
  const location = state.locations.find(
    (location) => location.id == idLocation
  );
  return location.roomsDetails;
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
*/

// reviews
/*
export const getAllReviews = (state) => {
  return state.reviews;
};
export const getFilteredReviews = (state) => (word, rating) => {
  return state.reviews.filter((review) => {
    if (
      (review.comment.toLowerCase().indexOf(word.toLowerCase()) > -1 ||
        review.title.toLowerCase().indexOf(word.toLowerCase()) > -1) &&
      !review.review.indexOf(rating)
    ) {
      return review;
    }
  });
};
export const getReviewById = (state) => (id) => {
  console.log("%cgetters.js line:47 getReview", "color: #007acc;", id);
  return state.reviews.find((review) => review.id == id);
};
*/

// RESERVATIONS
/*
export const getAllReservationsCorrectDataStructure = (state) => {
  const reservationsData = state.reservations.map((reserv) => {
    return {
      id: reserv.id,
      start: moment(reserv.start).format("LL"),
      end: moment(reserv.end).format("LL"),
      price: reserv.price,
      status: reserv.status,
      created: moment(reserv.created).format("DD/MM/YYYY"),
      location: reserv.location.id,
      room: reserv.room ? reserv.room.id : "",
    };
  });
  return reservationsData;
};
*/

// PUBLICATIONS
/*
export const getaLLPublications = (state) => {
  return state.publications;
};
export const getPublicationById = (state) => (id) => {
  return state.publications.find((publication) => publication.id == id);
};
export const getFilteredPublications = (state) => (word) => {
  return state.publications.filter((publication) => {
    if (
      publication.title.toLowerCase().indexOf(word.toLowerCase()) > -1 ||
      publication.description.toLowerCase().indexOf(word.toLowerCase()) > -1
    ) {
      return publication;
    }
  });
};
*/
