export const getOwnersLocations = (state, ownersLocations) => {
  state.ownersLocations = ownersLocations;
};
export const image3dUploaded = (state, url) => {
  state.image3dUploaded = url;
};
export const image3dUploadedState = (state, progress) => {
  state.image3dUploadedState = progress;
};
export const resetImageInfo = (state) => {
  state.image3dUploadedState = null;
  state.image3dUploaded = null;
};

// export const createNewImage = (state, image) => {
//   console.log(state);
//   state.properties = state.properties.map((property) => {
//     if (image.location !== property.id) {
//       return property;
//     }
//     property.images3d.push(image);
//     const newProperty = property;
//     return newProperty;
//   });
// };
