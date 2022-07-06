export const getAllReviews = (state) => {
  return state.reviews;
};
export const getFilteredReviews = (state) => (word, rating) => {
  return state.reviews.filter((review) => {
    if (
      (review.comment.toLowerCase().indexOf(word.toLowerCase()) > -1 ||
        review.title.toLowerCase().indexOf(word.toLowerCase()) > -1) &&
      !review.review.indexOf(rating)
    ) {
      return review;
    }
  });
};
export const getReviewById = (state) => (id) => {
  console.log("%cgetters.js line:47 getReview", "color: #007acc;", id);
  return state.reviews.find((review) => review.id == id);
};
