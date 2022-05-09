import AdminLayout from "../../OwnerPanel/Layouts/AdminLayout.vue";
import Main from "../../OwnerPanel/Views/Main.vue";
import Image3d from "../../OwnerPanel/Views/Image3d.vue";
import Payment from "../Views/Payments.vue";
export default [
  {
    name: "my-locations",
    path: "/my-locations",
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
      {
        name: "locations-payment",
        path: "/payment",
        component: Payment,
      },
    ],
  },
];
