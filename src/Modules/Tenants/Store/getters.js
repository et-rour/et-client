export const propertiesList = (state) => {
  return [...state.properties];
};
export const propertyImage = (state) => {
  return state.imageUploaded;
};
export const propertyImageState = (state) => {
  return state.imageUploadedState;
};
export const filteredPropertiesList = (state) => (search) => {
  return state.properties.filter((word) => {
    if (word.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
      return word;
    } else {
      return;
    }
  });
};
export const propertiesById = (state) => (id) => {
  return state.properties.find((location) => location.id === id);
};
export const createdProperty = (state) => {
  return state.creatingProperty;
};
export const zonesList = (state) => {
  return [...state.zones];
};
export const getZonesOrderedByCity = (state) => (countrySelected) => {
  // SORT ZONES
  const zones = [...state.zones];
  zones.sort((x, y) => {
    if (x.city < y.city) {
      return -1;
    }
    if (x.city > y.city) {
      return 1;
    }
    return 0;
  });

  // FILTER ZONES BY COUNTRY AND REMOVE DUPLICATED CITIES
  let comumeCities = [];
  const filteredCities = zones.filter((zone) => {
    if (zone.country === countrySelected || countrySelected === "") {
      if (!comumeCities.includes(zone.city)) {
        comumeCities.push(zone.city);
        return true;
      }
    }
  });
  // console.log(
  //   "%cgetters.js line:56 filteredCities",
  //   "color: #007acc;",
  //   filteredCities
  // );
  return filteredCities;
};
export const getZonesOrderedByComuna = (state) => (citySelected) => {
  // SORT ZONES
  const zones = [...state.zones];
  zones.sort((x, y) => {
    if (x.zone < y.zone) {
      return -1;
    }
    if (x.zone > y.zone) {
      return 1;
    }
    return 0;
  });

  // FILTER ZONES BY COUNTRY AND REMOVE DUPLICATED ZONES
  let comumeList = [];
  const filtered = zones.filter((zone) => {
    if (zone.city === citySelected) {
      if (!comumeList.includes(zone.zone)) {
        comumeList.push(zone.zone);
        return true;
      }
    }
  });
  // console.log("%cgetters.js line:56 filtered", "color: #007acc;", filtered);
  return filtered;
};
export const isLoading = (state) => {
  return state.loadingProperties;
};
export const getPropertyDetails = (state) => {
  return state.propertyDetails;
};
export const getPropertyImages = (state) => (propertyType) => {
  let imagesArray = [];
  state.propertyDetails.imagesLocation.forEach((image) => {
    imagesArray.push({
      ...image,
    });
  });
  if (propertyType === "room") {
    state.propertyDetails.roomsDetails.forEach((room) => {
      if (room.imagesRoom[0]) {
        imagesArray.push({
          ...room.imagesRoom[0],
        });
      }
    });
  }
  return imagesArray;
};

export const getCaledarData = (state) => (data) => {
  let calendarData;

  if (!state.propertyDetails) {
    return null;
  }
  if (data.type === "entire") {
    calendarData = {
      name: state.propertyDetails.name,
      value: state.propertyDetails.value,
      image: state.propertyDetails.image,
      reservations: [...state.propertyDetails.reservations],
      leaseRange: {
        start: state.propertyDetails.startLease,
        end: state.propertyDetails.endLease,
      },
    };
  } else {
    const room = state.propertyDetails.roomsDetails.find(
      (room) => room.id === Number(data.id)
    );
    calendarData = {
      name: `${state.propertyDetails.name} \n -${room.name}`,
      value: room.value,
      image: room.imagesRoom[0] && room.imagesRoom[0].image,
      reservations: [...room.reservations],
      leaseRange: {
        start: room.startLease,
        end: room.endLease,
      },
    };
  }
  return calendarData;
};
