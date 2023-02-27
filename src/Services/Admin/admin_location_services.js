import EspacioAPI from "@/Api/index"
export {
  PUT_ADMIN_LOCATION,
}

async function PUT_ADMIN_LOCATION(location) {
  const { data } = await EspacioAPI.put(`/admin/modifylocation`, location)
  return data
}