import LocationLayout from "../Layouts/LocationsLayout.vue";
import Location from "../Views/Location.vue";

export default {
  name: "admin-locations",
  path: "/locations",
  component: LocationLayout,
  children: [
    {
      name: "admin-locations-detail",
      path: "/locations/detail/:id",
      component: Location,
      props: (route) => {
        return {
          idLocation: route.params.id,
        };
      },
    },
  ],
};
