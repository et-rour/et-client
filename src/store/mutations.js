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

export const fetchHomeCoverImage = (state, HomeCoverData) => {
  state.HomeCoverData = HomeCoverData;
};

export const updateHomeCoverImage = (state, imageUrl) => {
  const newHomeCoverData = {
    ...state.HomeCoverData,
    image: imageUrl,
  };
  state.HomeCoverData = newHomeCoverData;
};

export const updateHomeCoverText = (state, text) => {
  const newHomeCoverData = {
    ...state.HomeCoverData,
    text: text,
  };
  state.HomeCoverData = newHomeCoverData;
};
