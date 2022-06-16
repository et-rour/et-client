import LocationLayout from "../Layouts/LocationsLayout.vue";
import DetailsLayout from "../Views/DetailsLayout.vue";
import CreatePropertyForm from "../Views/CreatePropertyForm.vue";
import Location from "../Views/Location.vue";
import Rooms from "../Views/Rooms.vue";
import CreateRoom from "../Views/CreateRoom.vue";
import Images3d from "../Views/Images3d.vue";

export default {
  name: "admin-locations",
  path: "/locations",
  component: LocationLayout,
  children: [
    {
      name: "admin-locations-new",
      path: "/locations/details/new",
      component: CreatePropertyForm,
    },
    {
      name: "admin-locations-detail",
      path: "/locations/details/:id",
      component: DetailsLayout,
      props: (route) => {
        return {
          idLocation: route.params.id.toString(),
        };
      },
      children: [
        {
          name: "admin-locations-detail-info",
          path: "/locations/detail/:id",
          component: Location,
          props: (route) => {
            return {
              idLocation: route.params.id.toString(),
            };
          },
        },
        {
          name: "admin-locations-detail-rooms",
          path: "/locations/detail/:id/rooms",
          component: Rooms,
          props: (route) => {
            return {
              idLocation: route.params.id.toString(),
            };
          },
        },
        {
          name: "admin-locations-detail-rooms-create",
          path: "/locations/detail/:id/rooms/new",
          component: CreateRoom,
          props: (route) => {
            return {
              idLocation: route.params.id.toString(),
            };
          },
        },
        {
          name: "admin-locations-detail-image3d",
          path: "/locations/detail/:id/image3d",
          component: Images3d,
          props: (route) => {
            return {
              idLocation: route.params.id.toString(),
            };
          },
        },
      ],
    },
  ],
};
