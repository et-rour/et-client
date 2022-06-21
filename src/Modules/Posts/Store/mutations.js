export const loadPosts = (state, postsList) => {
  state.postsList = postsList;
  state.loadingPosts = false;
};
// export const createNewPost = (state, post) => {
//   state.postsList = { ...state.postsList, post };
// };
export const changeLoadingPosts = (state, loading) => {
  state.loadingPosts = loading;
};
export const imageUploaded = (state, url) => {
  state.postImage = url;
};
export const imageUploadedState = (state, progress) => {
  state.postImageUploadingStatus = progress;
};

export const cleanImageInfo = (state) => {
  state.postImage = null;
  state.postImageUploadingStatus = null;
};

export const loadCurrencies = (state, currencies) => {
  state.currencies = currencies;
};