import PublicationLayout from "../Layouts/PublicationLayout.vue";
import Publication from "../Views/Publication.vue";

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
