export const getaLLPublications = (state) => {
  return state.publications;
};
export const getPublicationById = (state) => (id) => {
  return state.publications.find((publication) => publication.id == id);
};
export const getFilteredPublications = (state) => (word) => {
  return state.publications.filter((publication) => {
    if (
      publication.title.toLowerCase().indexOf(word.toLowerCase()) > -1 ||
      publication.description.toLowerCase().indexOf(word.toLowerCase()) > -1
    ) {
      return publication;
    }
  });
};
