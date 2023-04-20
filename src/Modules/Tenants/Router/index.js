import Main from "../Views/Main.vue";
import LocationLayout from "../Layout/Layout.vue";
import LocationDetails from "../Views/locationDetails.vue";
import Calendar from "../Views/Calendar.vue";
import Schedule from "../Views/Schedule.vue";
import { isAuth, isValidCalendarLease } from "../../../Guards/isAuth";
export default [
  {
    name: "tenants",
    path: "/propietario",
    component: Main,
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
        path: "/propietario/:id/calendar/:idRoom/:isDaily",
        component: Calendar,
        props: (route) => {
          return {
            idRoom: `${route.params.idRoom}`,
            idProperty: route.params.id,
          };
        },
        beforeEnter(to, __, next) {
          if (!isValidCalendarLease(to.params.idRoom)) {
            const idProperty = to.params.id;
            next({
              name: "tenants-detail",
              params: { id: idProperty },
            });
          }
          if (isAuth()) {
            next(true);
          }
          next(false);
        },
      },
      {
        name: "tenants-schedule",
        path: "/propietario/:id/schedule",
        component: Schedule,
      },
    ],
  },
];
