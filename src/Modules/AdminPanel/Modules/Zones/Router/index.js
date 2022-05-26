import ZoneLayout from "../Layouts/ZonesLayout.vue";
import Zone from "../Views/Zone.vue";

export default {
  name: "admin-zones",
  path: "/zones",
  component: ZoneLayout,
  children: [
    {
      name: "admin-zones-detail",
      path: "/zones/detail/:id",
      component: Zone,
      props: (route) => {
        return {
          idZone: route.params.id,
        };
      },
    },
  ],
};
