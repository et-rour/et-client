export const getPublications = (state, publications) => {
  state.publications = publications;
};

export const changeIsVerifiedPublication = (
  state,
  { idPublication, isVerified }
) => {
  const publications = state.publications.map((publication) => {
    if (publication.id === idPublication) {
      return {
        ...publication,
        isVerified,
      };
    }
    return publication;
  });

  state.publications = publications;
};
