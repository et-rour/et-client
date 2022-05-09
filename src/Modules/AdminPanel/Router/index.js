import Layout from "../Layouts/AdminPanelLoyaut.vue";
import Users from "../Views/Users.vue";
import Zones from "../Views/Zones.vue";
import Locations from "../Views/Locations.vue";

export default [
  {
    name: "admin",
    path: "/admin",
    component: Layout,
    children: [
      {
        name: "admin-users",
        path: "users",
        component: Users,
      },
      {
        name: "admin-zones",
        path: "zones",
        component: Zones,
      },
      {
        name: "admin-locations",
        path: "locations",
        component: Locations,
      },
    ],
  },
];
