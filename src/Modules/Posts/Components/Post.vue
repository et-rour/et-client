<template>
  <div class="w-full">
    <h3 class="my-title font-normal mb-2">{{ post.title }}</h3>
    <img
      src="@/assets/images/Bartalent.jpg"
      alt="post image"
      class="w-full h-72 object-cover"
    />
    <p class="mb-5">“{{ post.description }}”</p>
    <p>{{ post.user.firstName }}, fundadora de Nombre del Negocio</p>
    <p>www.paginaweb.cl</p>
    <p>instagram/negocio.cl</p>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
