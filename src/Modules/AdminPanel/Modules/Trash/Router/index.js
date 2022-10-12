const TrashLayout = () =>
  import(
    /* webpackChunkName: "TrashLayout" */ "../Layouts/TrashLayout.vue"
  );
const Trash = () =>
  import(/* webpackChunkName: "Trash" */ "../Views/Trash.vue");
const Location = () =>
  import(/* webpackChunkName: "Trash" */ "../Views/Location.vue");

export default {
  name: "admin-trashbin",
  path: "/trash",
  component: TrashLayout,
  children: [
    {
      name: "admin-trash-bin",
      path: "/trash",
      component: Trash,
    },
    {
      name: "admin-trash-location",
      path: "/trash/location",
      component: Location,
    },
  ],
};
