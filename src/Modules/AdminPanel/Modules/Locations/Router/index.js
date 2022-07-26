const LocationLayout = () =>
  import(
    /* webpackChunkName: "LocationLayout" */ "../Layouts/LocationsLayout.vue"
  );
const DetailsLayout = () =>
  import(/* webpackChunkName: "DetailsLayout" */ "../Views/DetailsLayout.vue");
const CreatePropertyForm = () =>
  import(
    /* webpackChunkName: "CreatePropertyForm" */ "../Views/CreatePropertyForm.vue"
  );
const Location = () =>
  import(/* webpackChunkName: "Location" */ "../Views/Location.vue");
const Rooms = () =>
  import(/* webpackChunkName: "Rooms" */ "../Views/Rooms.vue");
const CreateRoom = () =>
  import(/* webpackChunkName: "CreateRoom" */ "../Views/CreateRoom.vue");
const Images3d = () =>
  import(/* webpackChunkName: "Images3d" */ "../Views/Images3d.vue");
const Images = () =>
  import(/* webpackChunkName: "Images" */ "../Views/Images.vue");

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
        },
        {
          name: "admin-locations-detail-images",
          path: "/locations/detail/:id/images",
          component: Images,
        },
        {
          name: "admin-locations-detail-rooms",
          path: "/locations/detail/:id/rooms",
          component: Rooms,
        },
        {
          name: "admin-locations-detail-rooms-create",
          path: "/locations/detail/:id/rooms/new",
          component: CreateRoom,
        },
        {
          name: "admin-locations-detail-image3d",
          path: "/locations/detail/:id/image3d",
          component: Images3d,
        },
      ],
    },
  ],
};
