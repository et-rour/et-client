import Owners from "../../Owners/Views/Main.vue";
import CreateProperty from "../../Owners/Views/CreateForm.vue";
import ResultCreateProperty from "../../Owners/Views/CreateResult.vue";
import Schedule from "../../Owners/Views/Schedule.vue";
import ScheduleResult from "../../Owners/Views/ScheduleResult.vue";

export default [
  {
    name: "owner",
    path: "/dueños",
    component: Owners,
  },
  {
    name: "property",
    path: "/dueños/cargar",
    component: CreateProperty,
  },
  {
    name: "result",
    path: "/dueños/cargar/result",
    component: ResultCreateProperty,
  },
  {
    name: "schedule",
    path: "/dueños/cargar/schedule",
    component: Schedule,
  },
  {
    name: "scheduleResult",
    path: "/dueños/cargar/schedule/result",
    component: ScheduleResult,
  },
];
