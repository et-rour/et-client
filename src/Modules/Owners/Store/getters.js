export const propertiesList = (state) => {
  return state.properties;
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
  return state.zones;
};
export const isLoading = (state) => {
  return state.loadingProperties;
};
export const getPropertyDetails = (state) => {
  return state.propertyDetails;
};
