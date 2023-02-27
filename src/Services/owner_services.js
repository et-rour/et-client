import EspacioAPI from "@/Api/index"
export {
  GET_RESERVATIONS_LIST,
  PUT_UPDATE_LEASE_DATES,
  PUT_UPDATE_LOCATION,
  GET_PAYMENTS_BY_CLIENT,
  GET_LOCATIONS_BY_OWNER,
}


async function GET_LOCATIONS_BY_OWNER(id) {
  const { data } = await EspacioAPI.get(`/owner/${id}`);
  return data
}
async function GET_RESERVATIONS_LIST(id) {
  const { data } = await EspacioAPI.get(`/owner/reservations/${id}`)
  return data
}
async function PUT_UPDATE_LEASE_DATES(body) {
  const { data } = await EspacioAPI.put("/locations/lease", body)
  return data
}
async function PUT_UPDATE_LOCATION(location) {
  const { data } = await EspacioAPI.put(`/locations/${location.id}`, location)
  return data
}
async function GET_PAYMENTS_BY_CLIENT() {
  const { data } = await EspacioAPI.get(`/owner/payments`)
  return data
}