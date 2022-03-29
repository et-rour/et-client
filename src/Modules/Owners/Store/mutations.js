export const loadProperties = (state, properties) => {
  state.properties = properties;
  state.loadingProperties = false;
};
export const loadZones = (state, zones) => {
  state.zones = zones;
};
export const changeLoading = (state, loading) => {
  state.loadingProperties = loading;
};
export const imageUploaded = (state, url) => {
  state.imageUploaded = url;
};
export const imageUploadedState = (state, progress) => {
  state.imageUploadedState = progress;
};
export const createNewProperty = (state, { location, calculatorData }) => {
  state.creatingProperty = {
    location,
    calculatorData,
  };
};

export const createNewImage = (state, image) => {
  state.properties = state.properties.map((property) => {
    if (image.location !== property.id) {
      return property;
    }
    property.images3D.unshift(image);
    const newProperty = property;
    return newProperty;
  });
};
