const TestimonialsLayout = () =>
  import(
    /* webpackChunkName: "TestimonialsLayout" */ "../Layouts/TestimonialsLayout.vue"
  );
const Testimonials = () =>
  import(/* webpackChunkName: "Testimonials" */ "../Views/Testimonials.vue");

export default {
  name: "admin-testimonial",
  path: "/testimonials",
  component: TestimonialsLayout,
  children: [
    {
      name: "admin-testimonial-detail",
      path: "/testimonial/:id/detail",
      component: Testimonials,
    },
  ],
};
