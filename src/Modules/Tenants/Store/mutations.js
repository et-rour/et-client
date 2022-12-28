export const loadProperties = (state, properties) => {

  state.properties = properties;
  state.loadingProperties = false;
};
export const fetchPropertyDetails = (state, property) => {
  state.propertyDetails = property;
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

export const cleanImageInfo = (state) => {
  state.imageUploaded = null;
  state.imageUploadedState = null;
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

export const updateLocationLease = (state, newLocationInfo) => {
  state.properties = state.properties.map((property) => {
    if (newLocationInfo.id !== property.id) {
      return property;
    }
    return {
      ...property,
      startLease: newLocationInfo.startLease,
      endLease: newLocationInfo.endLease,
    };
  });
};
