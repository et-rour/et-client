const AdminLayout = () =>
  import(
    /* webpackChunkName: "AdminLayout" */ "../../OwnerPanel/Layouts/AdminLayout.vue"
  );
const Main = () =>
  import(/* webpackChunkName: "Main" */ "../../OwnerPanel/Views/Main.vue");
const Image3d = () =>
  import(
    /* webpackChunkName: "Image3d" */ "../../OwnerPanel/Views/Image3d.vue"
  );
const Payment = () =>
  import(/* webpackChunkName: "Payment" */ "../Views/Payments.vue");
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
