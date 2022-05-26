import Index from "../Views/index.vue";
import locationDetails from "../Views/locationDetails.vue";
import Schedule from "../Views/Schedule.vue";
export default [
  {
    name: "tenants",
    path: "/propietario",
    component: Index,
  },
  {
    name: "tenants-detail",
    path: "/propietario/:id",
    component: locationDetails,
    props: (route) => {
      return {
        idProperty: route.params.id,
      };
    },
  },
  {
    name: "tenants-schedule",
    path: "/propietario/:id/schedule",
    component: Schedule,
    props: (route) => {
      return {
        idLocation: `${route.params.id}`,
      };
    },
  },
];
