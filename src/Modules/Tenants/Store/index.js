import state from "./state";
import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";
import reservationStorage from "../ReservationStore/Store/index";
const propertiesStore = {
  namespaced: true,
  state,

  mutations,

  actions,
  // son iguales a computed
  getters,
  modules: {
    reservationStorage,
  },
};

export default propertiesStore;
