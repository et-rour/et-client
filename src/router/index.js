import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../Modules/Main/Main.vue";
import OwnerRoutes from "../Modules/Owners/Router/index";
import TenantsRouter from "../Modules/Tenants/Router/index";
import AdminRouter from "../Modules/Admin/Router/index";
import PostsRouter from "../Modules/Posts/Router/index";
import StripeRouter from "../Modules/Stripe/Router/index";
Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Landing,
  },
  ...OwnerRoutes,
  ...TenantsRouter,
  ...AdminRouter,
  ...PostsRouter,
  ...StripeRouter,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
