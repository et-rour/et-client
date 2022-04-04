import Vue from "vue";
import Vuex from "vuex";
import authStore from "../Modules/Auth/Store/index";
import propertiesStore from "../Modules/Owners/Store/index";
import adminStore from "../Modules/Admin/Store/index";
import postsStore from "../Modules/Posts/Store/index";

import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ authStore: state.authStore }),
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authStore,
    propertiesStore,
    adminStore,
    postsStore,
  },
  plugins: [vuexLocal.plugin],
});
