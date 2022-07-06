export const getAllZones = (state) => {
  return state.zones;
};
export const getZoneDetails = (state) => {
  return state.zoneDetails;
};
export const getZoneById = (state) => (id) => {
  return state.zones.find((zone) => zone.id == id);
};
