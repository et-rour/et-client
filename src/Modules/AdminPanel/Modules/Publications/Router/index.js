const PublicationLayout = () =>
  import(
    /* webpackChunkName: "PublicationLayout" */ "../Layouts/PublicationLayout.vue"
  );
const Publication = () =>
  import(/* webpackChunkName: "Publication" */ "../Views/Publication.vue");

export default {
  name: "admin-publications",
  path: "/publications",
  component: PublicationLayout,
  children: [
    {
      name: "admin-publications-detail",
      path: "/publications/detail/:id",
      component: Publication,
      props: (route) => {
        return {
          idPublication: route.params.id,
        };
      },
    },
  ],
};
