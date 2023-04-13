import EspacioAPI from "@/Api/index";
export { PUT_ADMIN_LOCATION, PUT_ADMIN_LOCATIONS_ORDER };

async function PUT_ADMIN_LOCATION(location) {
  const { data } = await EspacioAPI.put(`/admin/modifylocation`, location);
  return data;
}

async function PUT_ADMIN_LOCATIONS_ORDER(locations) {
  const { data } = await EspacioAPI.put(`/admin/changeOrder`, locations);
  return data;
}
