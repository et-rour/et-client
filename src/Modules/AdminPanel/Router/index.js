const Layout = () =>
  import(/* webpackChunkName: "Layout" */ "../Layouts/AdminPanelLoyaut.vue");

import userRouter from "../Modules/User/Router/index.js";
import zonesRouter from "../Modules/Zones/Router/index.js";
import locationsRouter from "../Modules/Locations/Router/index.js";
import reviewRouter from "../Modules/Reviews/Router/index.js";
import publicationRouter from "../Modules/Publications/Router/index.js";
import paymentsRouter from "../Modules/Payments/Router/index.js";
import testimonialsRouter from "../Modules/Testimonials/Router/index.js";
import trashRouter from "../Modules/Trash/Router/index.js";

const Reservation = () =>
  import(
    /* webpackChunkName: "Reservation" */ "../Modules/Reservations/Views/Reservation.vue"
  );
export default [
  {
    name: "admin",
    path: "/admin",
    component: Layout,
    children: [
      {
        ...userRouter,
      },
      {
        ...zonesRouter,
      },
      {
        ...locationsRouter,
      },
      {
        ...reviewRouter,
      },
      {
        ...publicationRouter,
      },
      {
        ...paymentsRouter,
      },
      {
        ...testimonialsRouter,
      },
      {
        ...trashRouter,
      },
      {
        name: "admin-reservations",
        path: "/reservations",
        component: Reservation,
      },
    ],
  },
];
