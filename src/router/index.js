import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../Modules/Main/Main.vue";
import Questions from "../Modules/Main/Questions.vue";
import Terms from "../Modules/Main/Terms.vue";
import WorkWithUs from "../Modules/Main/WorkWithUs.vue";
import HowItWorks from "../Modules/Main/HowItWorks.vue";
import WhatWeDo from "../Modules/Main/WhatWeDo.vue";
import Team from "../Modules/Main/Team.vue";
import TrustUs from "../Modules/Main/TrustUs.vue";
import Privacy from "../Modules/Main/Privacy.vue";

import OwnerRoutes from "../Modules/Owners/Router/index";
import TenantsRouter from "../Modules/Tenants/Router/index";
import ownerPanel from "../Modules/OwnerPanel/Router/index";
import adminPanel from "../Modules/AdminPanel/Router/index";
import PostsRouter from "../Modules/Posts/Router/index";
import StripeRouter from "../Modules/Stripe/Router/index";
import ProfileRouter from "../Modules/Profile/Router/index";
import store from "@/store"; //or use a full path to ./store

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Landing,
  },
  {
    name: "questions",
    path: "/preguntas",
    component: Questions,
  },
  {
    name: "terms",
    path: "/terminos",
    component: Terms,
  },
  {
    name: "what-we-do",
    path: "/que-hacemos",
    component: WhatWeDo,
  },
  {
    name: "team",
    path: "/equipo",
    component: Team,
  },
  {
    name: "workwithus",
    path: "/trabaja-con-nosotros",
    component: WorkWithUs,
  },
  {
    name: "how-it-works",
    path: "/casos-de-exito",
    component: HowItWorks,
  },
  {
    name: "privacy",
    path: "/politicas-cookies",
    component: Privacy,
  },
  {
    name: "trust-us",
    path: "/confian-en-nosotros",
    component: TrustUs,
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
router.beforeEach((to, from, next) => { // This way, you don't need to write hook for each route
  // get where user being stored ex:
  const { user } = store.state.authStore;
  if (to.name?.includes("admin")) {
      if (user.isAdmin) {
        next()
      } else {
        alert("No tienes permisos para entrar")
        next('/propiedad')
      }
  } else {
      next()
  }
})

export default router;
