<template>
  <div class="mx-auto h-full w-full pt-4 flex flex-col">
    <div class="flex flex-col gap-4 items-start self-center">
      <h2
        class="text-2xl font-semibold my-14"
        v-if="locationsList.length === 0"
      >
        {{ $t("adminPanel.users.locationsList.noLocationsFound") }}
      </h2>

      <div v-else v-for="room in locationsList" :key="room.id">
        <RoomCard :room="room"></RoomCard>

        <button
          class="my-btn w-auto px-4 mx-1 py-1"
          @click="
            $router.push({ name: 'tenants-detail', params: { id: room.id } })
          "
        >
          ver detalles
        </button>

        <button
          class="my-btn w-auto px-4 mx-1 py-1"
          @click="
            $router.push({
              name: 'admin-locations-detail-info',
              params: { id: room.id },
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
import RoomCard from "../../../../Tenants/Components/RoomCard.vue";

export default {
  components: {
    RoomCard,
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
