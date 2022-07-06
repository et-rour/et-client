import PaymentsLayout from "../Layouts/PaymentsLayout.vue";
import Payments from "../Views/Payments.vue";

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
