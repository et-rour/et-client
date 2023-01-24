import EspacioAPI from "@/Api/index.js";

export const ACTION_GET_TESTIMONIALS = async ({ commit }) => {
  const { data } = await EspacioAPI.get(`/testimonial/`);
  commit("MUTATION_GET_TESTIMONIALS", data);
};

export const ACTION_GET_TESTIMONIAL_BY_ID = async ({ commit }, id) => {
  const { data } = await EspacioAPI.get(`/testimonial/${id}`);
  commit("MUTATION_GET_TESTIMONIAL_BY_ID", data);
  return data
};

export const ACTION_POST_TESTIMONIAL = async ({ commit }, testimonial) => {
  const { data } = await EspacioAPI.post(`/admin/testimonial/`, testimonial);
  commit("MUTATION_POST_TESTIMONIAL", data);
  return data
};

export const ACTION_PUT_TESTIMONIAL = async ({ commit }, {id,testimonial}) => {
  const { data } = await EspacioAPI.put(`/admin/testimonial/${id}`,testimonial);
  commit("MUTATION_PUT_TESTIMONIAL", data);
};
export const ACTION_DELETE_TESTIMONIAL = async ({ commit }, id) => {
  await EspacioAPI.delete(`/admin/testimonial/${id}`);
  commit("MUTATION_DELETE_TESTIMONIAL", id);
};