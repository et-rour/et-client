const Layout = () =>
  import(/* webpackChunkName: "Layout" */ "../Layouts/userLayout.vue");
const User = () => import(/* webpackChunkName: "User" */ "../Views/User.vue");
const Locations = () =>
  import(/* webpackChunkName: "Locations" */ "../Views/Locations.vue");
const Reviews = () =>
  import(/* webpackChunkName: "Reviews" */ "../Views/Reviews.vue");
const Details = () =>
  import(/* webpackChunkName: "Details" */ "../Views/Details.vue");
const Payments = () =>
  import(/* webpackChunkName: "Payments" */ "../Views/Payments.vue");

export default {
  name: "admin-users",
  path: "/users",
  component: Layout,
  children: [
    {
      name: "admin-users-detail",
      path: "/users/detail/:id",
      component: User,
      props: (route) => {
        return {
          idUser: `${route.params.id}`,
        };
      },
      children: [
        {
          name: "admin-users-detail-details",
          path: "/users/detail/:id/details",
          component: Details,
          props: (route) => {
            return {
              idUser: `${route.params.id}`,
            };
          },
        },
        {
          name: "admin-users-detail-locations",
          path: "/users/detail/:id/locations",
          component: Locations,
          props: (route) => {
            return {
              idUser: `${route.params.id}`,
            };
          },
        },
        {
          name: "admin-users-detail-reviews",
          path: "/users/detail/:id/reviews/:CreatorOrReceiver",
          component: Reviews,
          props: (route) => {
            return {
              idUser: `${route.params.id}`,
              isCreator: route.params.CreatorOrReceiver,
            };
          },
        },
        {
          name: "admin-users-detail-payments",
          path: "/users/detail/:id/payments",
          component: Payments,
          props: (route) => {
            return {
              idUser: `${route.params.id}`,
            };
          },
        },
      ],
    },
  ],
};
