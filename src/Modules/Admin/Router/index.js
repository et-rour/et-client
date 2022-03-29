import AdminLayout from "../../Admin/Layouts/AdminLayout.vue";
import Main from "../../Admin/Views/Main.vue";
import Image3d from "../../Admin/Views/Image3d.vue";

export default [
  {
    name: "admin",
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        name: "locations-list",
        path: "locations",
        component: Main,
      },
      {
        name: "create-image-3d",
        path: ":id/newImage",
        component: Image3d,
        props: (route) => {
          return {
            idProperty: route.params.id,
          };
        },
      },
    ],
  },
];
