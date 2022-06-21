export const changeLastUsedBy = (state, id) => {
  state.id = id;
};
export const imageUploaded = (state, { id, downloadURL }) => {
  state.id = id;
  state.imageUrl = downloadURL;
};
export const imageUploadedState = (state, progress) => {
  state.ImageUploadingStatus = progress;
};

export const cleanImageInfo = (state) => {
  state.imageUrl = null;
  state.ImageUploadingStatus = null;
};
