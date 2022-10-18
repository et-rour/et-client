export const lastUsedBy = (state) => {
  return state.id;
};
export const imageUrl = (state) => {
  return state.imageUrl;
};
export const ImageUploadingState = (state) => {
  return state.ImageUploadingStatus;
};

export const getHomeCoverData = (state) => {
  return state.HomeCoverData;
};

export const getPersonalMembers = (state) => {
  console.log(
    "%cgetters.js line:16 state.authStore.user",
    "color: white; background-color: #007acc;",
    state.authStore.user
  );
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
