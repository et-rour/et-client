export const getLocations = (state, locations) => {
  state.locations = locations;
};

export const changeLoadingLocationDetails = (state, loading) => {
  state.loadingLocationDetails = loading;
};

export const fetchLocationDetails = (state, location) => {
  state.locationDetails = location;
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

export const modifyLocation = (state, newLocation) => {
  const index = state.locations.findIndex(
    (location) => location.id == newLocation.id
  );

  if (index !== -1) {
    const newLocations = state.locations;
    newLocations[index].name = newLocation.name;
    state.locations = newLocations;
  }

  state.locationDetails = {
    ...state.locationDetails,
    ...newLocation,
  };
};

export const createLocation = (state, newLocation) => {
  state.locations = [...state.locations, newLocation];
};

export const changeIsActiveLocation = (state, { isActive }) => {
  state.locationDetails = {
    ...state.locationDetails,
    isActive: isActive,
  };
};

export const changeIsVerifiedLocation = (state, { isVerified }) => {
  state.locationDetails = {
    ...state.locationDetails,
    isVerified,
  };
};

export const setLocationValue = (
  state,
  { value, stripePriceId, stripeProductId }
) => {
  state.locationDetails = {
    ...state.locationDetails,
    value,
    stripePriceId,
    stripeProductId,
  };
};
/*
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
export const createRoom = (state, room) => {
  const newRooms = [...state.locationDetails.roomsDetails, room];

  state.locationDetails = {
    ...state.locationDetails,
    roomsDetails: newRooms,
  };
};

export const updateRoom = (state, { room }) => {
  const index = state.locationDetails.roomsDetails.findIndex(
    (currentRoom) => currentRoom.id == room.id
  );

  let newRooms = state.locationDetails.roomsDetails;
  if (index !== -1) {
    newRooms[index] = room;
  }

  state.locationDetails = {
    ...state.locationDetails,
    roomsDetails: newRooms,
  };
};

// IMAGES 3D
export const postImage3d = (state, { savedImage }) => {
  state.locationDetails = {
    ...state.locationDetails,
    images3D: [savedImage, ...state.locationDetails.images3D],
  };
};

export const updateImage3d = (state, { updatedImage }) => {
  const index = state.locationDetails.images3D.findIndex(
    (image3d) => image3d.id == updatedImage.id
  );

  let newImages3dArray = state.locationDetails.images3D;
  console.log(index);
  if (index !== -1) {
    newImages3dArray[index] = updatedImage;
  }

  state.locationDetails = {
    ...state.locationDetails,
    images3D: newImages3dArray,
  };
};

// IMAGES

export const changeCoverImage = (state, image) => {
  state.locationDetails = {
    ...state.locationDetails,
    image: image,
  };
};

export const postLocationImage = (state, savedImage) => {
  state.locationDetails = {
    ...state.locationDetails,
    imagesLocation: [...state.locationDetails.imagesLocation, savedImage],
  };
};

export const changeIsVisibilityImage = (state, image) => {
  const index = state.locationDetails.imagesLocation.findIndex(
    (imageDetails) => imageDetails.id == image.id
  );

  let newImagesLocationArray = state.locationDetails.imagesLocation;
  if (index !== -1) {
    newImagesLocationArray[index] = image;
  }

  state.locationDetails = {
    ...state.locationDetails,
    imagesLocation: newImagesLocationArray,
  };
};
