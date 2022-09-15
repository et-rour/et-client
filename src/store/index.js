import Vue from "vue";
import Vuex from "vuex";
import authStore from "../Modules/Auth/Store/index";
import propertiesStore from "../Modules/Tenants/Store/index";
import ownerPanelStore from "../Modules/OwnerPanel/Store/index";
import adminPanelStore from "../Modules/AdminPanel/Store/index";
import postsStore from "../Modules/Posts/Store/index";

import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ authStore: state.authStore }),
});

Vue.use(Vuex);

import state from "./state";
import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    authStore,
    propertiesStore,
    ownerPanelStore,
    adminPanelStore,
    postsStore,
  },
  plugins: [vuexLocal.plugin],
});
