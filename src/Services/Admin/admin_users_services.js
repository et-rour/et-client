import EspacioAPI from "@/Api/index"
export {
  GET_ADMIN_USERS,
}

async function GET_ADMIN_USERS() {
  const { data } = await EspacioAPI.get(`/admin/listusers`)
  return data
}