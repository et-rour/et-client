// USERS
/*
export const getUsers = (state, users) => {
  state.users = users;
};

export const changeIsActiveUser = (state, { idUser, isActive }) => {
  const users = state.users.map((user) => {
    if (user.id === idUser) {
      return {
        ...user,
        isActive: isActive,
      };
    }
    return user;
  });

  state.users = users;
};

export const changeIsOwnerStatus = (state, { idUser, isOwner }) => {
  const users = state.users.map((user) => {
    if (user.id === idUser) {
      return {
        ...user,
        isOwner,
      };
    }
    return user;
  });

  state.users = users;
};
*/

// ZONES
/*
export const getZones = (state, zones) => {
  state.zones = zones;
};
export const createZone = (state, zone) => {
  const newZones = [...state.zones, zone];
  state.zones = newZones;
};
export const modifyZone = (state, newZone) => {
  const newZones = state.zones.map((zone) => {
    if (zone.id === newZone.id) {
      return newZone;
    }
    return zone;
  });
  state.zones = newZones;
};
export const changeIsActiveZone = (state, { idZone, isActive }) => {
  const zones = state.zones.map((zone) => {
    if (zone.id === idZone) {
      return {
        ...zone,
        isActive: isActive,
      };
    }
    return zone;
  });

  state.zones = zones;
};
*/

// LOCATIONS
/*
export const changeIsActiveProperty = (state, newUser) => {
  const users = state.users.map((user) => {
    if (user.id === newUser.id) {
      return {
        ...user,
        isActive: newUser.isActive,
      };
    }
    return user;
  });

  state.users = users;
};
export const getLocations = (state, locations) => {
  state.locations = locations;
};
export const modifyLocation = (state, newLocation) => {
  const newLocations = state.locations.map((location) => {
    if (location.id === newLocation.id) {
      return {
        ...location,
        ...newLocation,
      };
    }
    return location;
  });
  state.locations = newLocations;
};
export const createLocation = (state, newLocation) => {
  state.locations = [...state.locations, newLocation];
};
export const changeIsActiveLocation = (state, { idLocation, isActive }) => {
  const locations = state.locations.map((location) => {
    if (location.id === idLocation) {
      return {
        ...location,
        isActive: isActive,
      };
    }
    return location;
  });

  state.locations = locations;
};
export const changeIsVerifiedLocation = (state, { idLocation, isVerified }) => {
  const locations = state.locations.map((location) => {
    if (location.id === idLocation) {
      return {
        ...location,
        isVerified,
      };
    }
    return location;
  });

  state.locations = locations;
};
export const setLocationValue = (
  state,
  { idLocation, value, stripePriceId, stripeProductId }
) => {
  const newLocations = state.locations.map((location) => {
    if (location.id === idLocation) {
      return {
        ...location,
        value,
        stripePriceId,
        stripeProductId,
      };
    }
    return location;
  });
  state.locations = newLocations;
};
export const changeIsActivePropertyInLocation = (state, newLocation) => {
  const locations = state.locations.map((location) => {
    if (location.id === newLocation.id) {
      console.log(
        "%cmutations.js line:33 locationMAtch",
        "color: #007acc;",
        location
      );
      return {
        ...location,
        isActive: newLocation.isActive,
      };
    }
    return location;
  });

  state.locations = locations;
};
*/

// ROOMS
/*
export const createRoom = (state, room) => {
  const locations = state.locations.map((location) => {
    if (location.id === room.location) {
      const newRooms = [...location.roomsDetails, room];
      return {
        ...location,
        roomsDetails: newRooms,
      };
    }
    return location;
  });

  state.locations = locations;
};
export const updateRoom = (state, { idLocation, room }) => {
  const locations = state.locations.map((location) => {
    if (location.id === idLocation) {
      const newRooms = location.roomsDetails.map((currentRoom) => {
        if (currentRoom.id === room.id) {
          return room;
        }
        return currentRoom;
      });
      location.roomsDetails[room.id] = room;
      return {
        ...location,
        roomsDetails: newRooms,
      };
    }
    return location;
  });

  state.locations = locations;
};
export const updateRoomImage = (state, { idLocation, room }) => {
  console.log("%cmutations.js line:158 mutation", "color: #007acc;", {
    idLocation,
    room,
  });
  const locations = state.locations.map((location) => {
    if (location.id === idLocation) {
      const newRooms = location.roomsDetails.map((currentRoom) => {
        if (currentRoom.id === room.id) {
          return room;
        }
        return currentRoom;
      });
      location.roomsDetails[room.id] = room;
      return {
        ...location,
        roomsDetails: newRooms,
      };
    }
    return location;
  });

  state.locations = locations;
};
*/

// REVIEWS
/*
export const getReviews = (state, reviews) => {
  state.reviews = reviews;
};

export const changeIsActiveReview = (state, { idReview, isActive }) => {
  console.log("%cmutations.js line:163 mutation", "color: #007acc;", idReview);
  const reviews = state.reviews.map((review) => {
    if (review.id === idReview) {
      return {
        ...review,
        isActive,
      };
    }
    return review;
  });

  state.reviews = reviews;
};
export const changeIsVerifiedReview = (state, { idReview, isVerified }) => {
  const reviews = state.reviews.map((review) => {
    if (review.id === idReview) {
      return {
        ...review,
        isVerified,
      };
    }
    return review;
  });

  state.reviews = reviews;
};
*/

// RESERVATIONS
/*
export const getReservations = (state, reservations) => {
  console.log(
    "%cmutations.js line:191 reservations",
    "color: #007acc;",
    reservations
  );
  state.reservations = reservations;
};
*/

// PUBLICATIONS
/*
export const getPublications = (state, publications) => {
  state.publications = publications;
};

export const changeIsVerifiedPublication = (
  state,
  { idPublication, isVerified }
) => {
  const publications = state.publications.map((publication) => {
    if (publication.id === idPublication) {
      return {
        ...publication,
        isVerified,
      };
    }
    return publication;
  });

  state.publications = publications;
};
*/

// IMAGE 3D
/*
export const postImage3d = (state, { savedImage, idLocation }) => {
  const locations = state.locations.map((location) => {
    if (location.id === Number(idLocation)) {
      return {
        ...location,
        images3D: [savedImage, ...location.images3D],
      };
    }
    return location;
  });

  state.locations = locations;
};

export const updateImage3d = (state, { updatedImage, locationId }) => {
  const locations = state.locations.map((location) => {
    if (location.id === Number(locationId)) {
      let newImagenes3d = [];
      console.log("first");
      const findOldImage3d = location.images3D.findIndex(
        (image) => image.id === updatedImage.id
      );

      console.log({ findOldImage3d });

      if (findOldImage3d === -1) return location;

      newImagenes3d = [...location.images3D];
      newImagenes3d[findOldImage3d] = updatedImage;
      return {
        ...location,
        images3D: newImagenes3d,
      };
    }
    return location;
  });

  state.locations = locations;
};
*/
