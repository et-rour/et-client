import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../Modules/Main/Main.vue";
import Questions from "../Modules/Main/Questions.vue";
import Terms from "../Modules/Main/Terms.vue";
import WorkWithUs from "../Modules/Main/WorkWithUs.vue";
import AboutUs from "../Modules/Main/AboutUs.vue";

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
  {
    name: "questions",
    path: "/questions",
    component: Questions,
  },
  {
    name: "terms",
    path: "/terms",
    component: Terms,
  },
  {
    name: "workwithus",
    path: "/workwithus",
    component: WorkWithUs,
  },
  {
    name: "about-us",
    path: "/about",
    component: AboutUs,
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
  scrollBehavior(to, from, savedPosition) {
    console.log(to.hash);
    // Exists when Browser's back/forward pressed
    if (savedPosition) {
      return savedPosition;
      // For anchors
    } else if (to.hash) {
      return { selector: to.hash };
      // By changing queries we are still in the same component, so "from.path" === "to.path" (new query changes just "to.fullPath", but not "to.path").
    } else if (from.path === to.path) {
      return { x: 0, y: 0 };
    }

    // Scroll to top
    return { x: 0, y: 0 };
  },
});

export default router;
