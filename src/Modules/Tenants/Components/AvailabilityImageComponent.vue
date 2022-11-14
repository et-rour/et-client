<template>
  <img :src="availabilityImage" alt="agotada" class="absolute top-5 left-0 w-32" />
</template>

<script>
export default {
  props:["isActive"],
  computed:{
    availabilityImage() {
      return this.isActive ? require('@/assets/images/DISPONIBLE_CUT.svg'):require('@/assets/images/AGOTADA_CUT.svg');
    },
  }
}
</script>

<style>

</style>