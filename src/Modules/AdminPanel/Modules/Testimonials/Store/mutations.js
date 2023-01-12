export const MUTATION_GET_TESTIMONIALS = (state, list) => {
  console.log('%cmutations.js line:2 list', 'color: white; background-color: #007acc;', list);
  state.testimonials = list;
};
export const MUTATION_GET_TESTIMONIAL_BY_ID = (state, details) => {
  state.testimonialDetails = details;
};
export const MUTATION_POST_TESTIMONIAL = (state, details) => {
  state.testimonials = [...state.testimonials, details]
};
export const MUTATION_PUT_TESTIMONIAL = (state, details) => {
  state.testimonials = state.testimonials.map(testimonial => {
    if (testimonial.id === details.id) {
      return {...details}
    }
    return {...testimonial}
  });
};
export const MUTATION_DELETE_TESTIMONIAL = (state, idTestimonial) => {
  state.testimonials = state.testimonials.filter(testimonial => testimonial.id!==idTestimonial) 
};
