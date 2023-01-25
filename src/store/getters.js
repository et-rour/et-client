export const GETTER_SHOW_COOKIES_BANNER = (state) => {
  return state.showCookiesBanner;
};
export const lastUsedBy = (state) => {
  return state.id;
};
export const imageUrl = (state) => {
  return state.imageUrl;
};
export const ImageUploadingState = (state) => {
  return state.ImageUploadingStatus;
};

export const getHomeCoverData = (state) => (id) => {
  const res = state.coversData.find(cover => cover.id == id);
  return { ...res }
};

export const getPersonalMembers = (state) => {
  const userIsAdmin = state.authStore.user && state.authStore.user.isAdmin;

  if (!userIsAdmin) {
    let newPersonalArray = state.personal.filter((person) => {
      if (person.isVisible) {
        return person;
      }
    });
    return newPersonalArray;
  } else {
    return [...state.personal];
  }
};
