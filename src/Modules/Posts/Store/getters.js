export const postList = (state) => {
  return state.postsList;
};
export const postImage = (state) => {
  return state.postImage;
};
export const postImageUploadingState = (state) => {
  return state.postImageUploadingStatus;
};
export const postById = (state) => (id) => {
  return state.postsList.find((post) => post.id === id);
};
export const isLoading = (state) => {
  return state.loadingPosts;
};
export const currencies = (state) => {
  return state.currencies;
};
