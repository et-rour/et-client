import Owners from "../../Owners/Views/Main.vue";
const CreateProperty = () =>
  import(
    /* webpackChunkName: "CreateProperty" */ "../../Owners/Views/CreateForm.vue"
  );
const ResultCreateProperty = () =>
  import(
    /* webpackChunkName: "ResultCreateProperty" */ "../../Owners/Views/CreateResult.vue"
  );
// const Schedule = () =>
//   import(/* webpackChunkName: "Schedule" */ "../../Owners/Views/Schedule.vue");
// const ScheduleResult = () =>
//   import(
//     /* webpackChunkName: "ScheduleResult" */ "../../Owners/Views/ScheduleResult.vue"
//   );

export default [
  {
    name: "owner",
    path: "/propiedad",
    component: Owners,
  },
  {
    name: "property",
    path: "/propiedad/cargar",
    component: CreateProperty,
  },
  {
    name: "result",
    path: "/propiedad/result",
    component: ResultCreateProperty,
  },
];
