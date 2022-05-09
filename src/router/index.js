import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../Modules/Main/Main.vue";
import OwnerRoutes from "../Modules/Owners/Router/index";
import TenantsRouter from "../Modules/Tenants/Router/index";
import ownerPanel from "../Modules/OwnerPanel/Router/index";
import adminPanel from "../Modules/AdminPanel/Router/index";
import PostsRouter from "../Modules/Posts/Router/index";
import StripeRouter from "../Modules/Stripe/Router/index";
import ProfileRouter from "../Modules/Profile/Router/index";
Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Landing,
  },
  ...OwnerRoutes,
  ...TenantsRouter,
  ...ownerPanel,
  ...adminPanel,
  ...PostsRouter,
  ...StripeRouter,
  ...ProfileRouter,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
