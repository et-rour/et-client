const ReviewLayout = () =>
  import(/* webpackChunkName: "ReviewLayout" */ "../Layouts/ReviewLayout.vue");
const Review = () =>
  import(/* webpackChunkName: "Review" */ "../Views/Review.vue");

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
