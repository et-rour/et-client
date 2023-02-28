import { isAuth } from "../../../Guards/isAuth";

const AdminLayout = () =>
  import(
    /* webpackChunkName: "AdminLayout" */ "../../OwnerPanel/Layouts/AdminLayout.vue"
  );
const LocationsList = () =>
  import(/* webpackChunkName: "LocationsList" */ "../../OwnerPanel/Views/LocationsList.vue");
const LocationDetails = () =>
  import(/* webpackChunkName: "LocationDetails" */ "../../OwnerPanel/Views/LocationDetails.vue");

const ReservationsList = () =>
  import(/* webpackChunkName: "ReservationsList" */ "../../OwnerPanel/Views/ReservationsList.vue");
const Image3d = () =>
  import(
    /* webpackChunkName: "Image3d" */ "../../OwnerPanel/Views/Image3d.vue"
  );
const Payment = () =>
  import(/* webpackChunkName: "Payment" */ "../Views/Payments.vue");
export default [
  {
    name: "my-locations",
    path: "/my-locations",
    component: AdminLayout,
    beforeEnter(to, __, next) {
      if (isAuth()) {
        next(true);
      }
      next(false);
    },
    children: [
      {
        name: "locations-list",
        path: "locations",
        component: LocationsList,
      },
      {
        name: "locations-list-details",
        path: "locations/:id",
        component: LocationDetails,
      },
      {
        name: "reservations-list",
        path: "reservations",
        component: ReservationsList,
      },
      {
        name: "create-image-3d",
        path: ":id/newImage",
        component: Image3d,
        props: (route) => {
          return {
            idProperty: route.params.id,
          };
        },
      },
      {
        name: "locations-payment",
        path: "/payment",
        component: Payment,
      },
    ],
  },
];
