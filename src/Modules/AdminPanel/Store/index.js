import state from "./state";
import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";
import usersStore from "../Modules/User/Store/index";
import zonesStore from "../Modules/Zones/Store/index";
import locationsStore from "../Modules/Locations/Store/index";
import reviewsStore from "../Modules/Reviews/Store/index";
import publicationsStore from "../Modules/Publications/Store/index";
import reservationsStore from "../Modules/Reservations/Store/index";
import paymentsStore from "../Modules/Payments/Store/index";
const adminPanelStore = {
  namespaced: true,
  state,

  mutations,

  actions,
  // son iguales a computed
  getters,

  modules: {
    users: usersStore,
    zones: zonesStore,
    locations: locationsStore,
    reviews: reviewsStore,
    publications: publicationsStore,
    reservations: reservationsStore,
    payments: paymentsStore,
  },
};

export default adminPanelStore;
