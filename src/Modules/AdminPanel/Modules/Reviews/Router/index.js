import ReviewLayout from "../Layouts/ReviewLayout.vue";
import Review from "../Views/Review.vue";

export default {
  name: "admin-reviews",
  path: "/reviews",
  component: ReviewLayout,
  children: [
    {
      name: "admin-reviews-detail",
      path: "/reviews/detail/:id",
      component: Review,
      props: (route) => {
        return {
          idReview: route.params.id,
        };
      },
    },
  ],
};
