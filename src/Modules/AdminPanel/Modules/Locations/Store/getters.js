export const getAllLocations = (state) => {
  return state.locations;
};
export const getLocationDetails = (state) => {
  return state.locationDetails;
};
export const getAllLocationRooms = (state) => {
  return state.locationDetails.roomsDetails;
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
