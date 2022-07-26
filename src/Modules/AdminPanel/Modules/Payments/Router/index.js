const PaymentsLayout = () =>
  import(
    /* webpackChunkName: "PaymentsLayout" */ "../Layouts/PaymentsLayout.vue"
  );
const Payments = () =>
  import(/* webpackChunkName: "Payments" */ "../Views/Payments.vue");

export default {
  name: "admin-payments",
  path: "/payments",
  component: PaymentsLayout,
  children: [
    {
      name: "admin-payments-detail",
      path: "/payments/detail",
      component: Payments,
    },
  ],
};
