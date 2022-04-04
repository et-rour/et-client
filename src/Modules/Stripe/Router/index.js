const stripeSuccess = () => import("../Views/Success.vue");
const stripeError = () => import("../Views/Error.vue");
// const stripeTest = () => import("../Views/Test.vue");
export default [
  // {
  //   path: "/stripe",
  //   name: "stripe-test",
  //   component: stripeTest,
  // },
  {
    path: "/stripe/success",
    name: "stripe-success",
    component: stripeSuccess,
  },
  {
    path: "/stripe/error",
    name: "stripe-error",
    component: stripeError,
  },
];
