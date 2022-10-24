import store from "@/store"; //or use a full path to ./store

const isAuth = () => {
  const { isAuth } = store.state.authStore;
  if (!isAuth) {
    store.commit("authStore/changeShowLoginModal", true);
    return false;
  } else {
    return true;
  }
};

const isValidCalendarLease = (id) => {
  const getCaledarData = store.getters["propertiesStore/getCaledarData"];
  const propertyCalendarData = getCaledarData(id);
  if (!propertyCalendarData) {
    return false;
  }
  const { leaseRange } = propertyCalendarData;

  if (leaseRange.start && leaseRange.end) {
    return true;
  }
  alert("Esta ubicación no tiene fecha de arriendo definido");
  return false;
};

export { isAuth, isValidCalendarLease };
