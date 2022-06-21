import Layout from "../Layouts/userLayout.vue";
import User from "../Views/User.vue";
import Locations from "../Views/Locations.vue";
import Reviews from "../Views/Reviews.vue";
import Details from "../Views/Details.vue";

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
      ],
    },
  ],
};
