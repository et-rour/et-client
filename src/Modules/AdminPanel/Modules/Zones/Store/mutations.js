export const getZones = (state, zones) => {
  state.zones = zones;
};
export const fetchZoneDetails = (state, zone) => {
  state.zoneDetails = zone;
};
export const createZone = (state, zone) => {
  const newZones = [...state.zones, zone];
  state.zones = newZones;
};
export const modifyZone = (state, newZone) => {
  const newZones = state.zones.map((zone) => {
    if (zone.id === newZone.id) {
      return newZone;
    }
    return zone;
  });

  state.zones = newZones;
  state.zoneDetails = newZone;
};
export const changeIsActiveZone = (state, { isActive }) => {
  state.zoneDetails = {
    ...state.zoneDetails,
    isActive,
  };
};
