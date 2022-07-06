export const getReviews = (state, reviews) => {
  state.reviews = reviews;
};

export const changeIsActiveReview = (state, { idReview, isActive }) => {
  console.log("%cmutations.js line:163 mutation", "color: #007acc;", idReview);
  const reviews = state.reviews.map((review) => {
    if (review.id === idReview) {
      return {
        ...review,
        isActive,
      };
    }
    return review;
  });

  state.reviews = reviews;
};
export const changeIsVerifiedReview = (state, { idReview, isVerified }) => {
  const reviews = state.reviews.map((review) => {
    if (review.id === idReview) {
      return {
        ...review,
        isVerified,
      };
    }
    return review;
  });

  state.reviews = reviews;
};

export const getReservations = (state, reservations) => {
  console.log(
    "%cmutations.js line:191 reservations",
    "color: #007acc;",
    reservations
  );
  state.reservations = reservations;
};
