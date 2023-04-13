<template>
  <div class="">
    <button
      class="my-btn rounded-lg w-auto px-4 py-1 ml-1 my-2"
      @click="isEditingOrder = true"
      v-if="!isEditingOrder">
      Editar orden
    </button>
    <button
      v-else
      class="my-btn rounded-lg w-auto px-4 ml-1 py-1 my-2 bg-red-500"
      @click="isEditingOrder = false">
      Cancelar
    </button>

    <ul class="flex flex-col h-40 md:h-auto relative" v-if="!isEditingOrder">
      <router-link
        v-for="location in locationsList"
        :key="`location_${location.id}`"
        :to="{
          name: 'admin-locations-detail-info',
          params: { id: location.id },
          hash: '#details',
        }"
        active-class="active-class-admin">
        <div
          class="cursor-pointer p-1 hover:bg-my-blue-primary hover:text-white">
          <span class="block">
            <b>{{ location.name }}</b>
          </span>
          <span>{{ location.zone.city }} ({{ location.zone.country }})</span>
        </div>
      </router-link>
    </ul>
    <div v-else>
      <LocationsListOrderVue :locationsList="locationsList" />
    </div>
  </div>
</template>

<script>
import LocationsListOrderVue from "./LocationsListOrder.vue";
export default {
  components: {
    LocationsListOrderVue,
  },
  props: {
    locationsList: {
      type: Array,
    },
  },
  data() {
    return {
      isEditingOrder: false,
    };
  },
};
</script>

<style></style>
