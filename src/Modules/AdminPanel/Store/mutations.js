// USERS
export const getUsers = (state, users) => {
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

// LOCATIONS
export const getLocations = (state, locations) => {
  state.locations = locations;
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
