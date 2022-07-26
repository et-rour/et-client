const ZoneLayout = () =>
  import(/* webpackChunkName: "ZoneLayout" */ "../Layouts/ZonesLayout.vue");
const Zone = () => import(/* webpackChunkName: "Zone" */ "../Views/Zone.vue");

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
