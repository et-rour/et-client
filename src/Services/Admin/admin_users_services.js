import EspacioAPI from "@/Api/index"
export {
  GET_ADMIN_USERS,
  PUT_ADMIN_USER,
}

async function GET_ADMIN_USERS() {
  const { data } = await EspacioAPI.get(`/admin/listusers`)
  return data
}
async function PUT_ADMIN_USER(user) {
  const { data } = await EspacioAPI.put(`/admin/user/${user.id}`, user)
  return data
}