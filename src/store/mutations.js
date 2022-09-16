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

export const fetchPersonalMembers = (state, personalResponse) => {
  state.personal = personalResponse;
};

export const updatePersonalMember = (state, { updatedPersonal }) => {
  console.log(
    "\x1b[42m%s\x1b[0m",
    "mutations.js line:42 updatedPersonal",
    updatedPersonal
  );
  const index = state.personal.findIndex(
    (person) => person.id == updatedPersonal.id
  );

  let newPersonal = [...state.personal];

  if (index !== -1) {
    newPersonal[index] = updatedPersonal;
  }

  state.personal = newPersonal;
};
