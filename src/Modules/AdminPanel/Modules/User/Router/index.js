import Layout from "../Layouts/userLayout.vue";
import User from "../Views/User.vue";

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
          idUser: route.params.id,
        };
      },
    },
  ],
};
