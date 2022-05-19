// USERS
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

// ZONES
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

// LOCATIONS
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

// REVIEWS
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

export const getReservations = (state, reservations) => {
  console.log(
    "%cmutations.js line:191 reservations",
    "color: #007acc;",
    reservations
  );
  state.reservations = reservations;
};
