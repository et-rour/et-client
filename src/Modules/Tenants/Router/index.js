import Index from "../Views/index.vue";
import LocationLayout from "../Layout/Layout.vue";
import LocationDetails from "../Views/locationDetails.vue";
import Calendar from "../Views/Calendar.vue";
import Schedule from "../Views/Schedule.vue";
import { isAuth } from "../../../Guards/isAuth";
export default [
  {
    name: "tenants",
    path: "/propietario",
    component: Index,
  },
  {
    name: "tenants-layout",
    path: "/propietario/:id",
    component: LocationLayout,
    props: (route) => {
      return {
        idProperty: route.params.id,
      };
    },
    children: [
      {
        name: "tenants-detail",
        path: "/propietario/:id/details",
        component: LocationDetails,
        props: (route) => {
          return {
            idProperty: route.params.id,
          };
        },
      },
      {
        name: "tenants-calendar",
        path: "/propietario/:id/calendar/:idRoom",
        component: Calendar,
        props: (route) => {
          return {
            idRoom: `${route.params.idRoom}`,
          };
        },
        beforeEnter(_, __, next) {
          isAuth(next);
        },
      },
      {
        name: "tenants-schedule",
        path: "/propietario/:id/schedule",
        component: Schedule,
        beforeEnter(_, __, next) {
          isAuth(next);
        },
      },
    ],
  },
];
