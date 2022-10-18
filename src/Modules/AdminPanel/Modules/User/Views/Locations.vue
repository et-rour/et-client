<template>
  <div class="mx-auto h-full w-full pt-4 flex flex-col">
    <div class="flex flex-col gap-4 items-start self-center">
      <h2
        class="text-2xl font-semibold my-14"
        v-if="locationsList.length === 0"
      >
        {{ $t("adminPanel.users.locationsList.noLocationsFound") }}
      </h2>
      <div v-else v-for="location in locationsList" :key="location.id">
        <p class=" font-bold text-center">Id:{{location.id}} - {{location.name}} {{location.address}}</p>
        <button
          class="my-btn w-auto px-4 mx-1 py-1"
          @click="
            $router.push({ name: 'tenants-detail', params: { id: location.id } })
          "
        >
          ver detalles
        </button>

        <button
          class="my-btn w-auto px-4 mx-1 py-1"
          @click="
            $router.push({
              name: 'admin-locations-detail-info',
              params: { id: location.id },
            })
          "
        >
          editar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
  },
  computed: {
    ...mapGetters("adminPanelStore/users", ["getUserDetails"]),
    userName() {
      return `${this.getUserDetails.firstName} ${this.getUserDetails.lastName}`;
    },
    locationsList() {
      return this.getUserDetails.locations;
    },
  },
};
</script>

<style></style>
