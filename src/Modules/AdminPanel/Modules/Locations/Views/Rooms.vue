<template>
  <div class="w-2/3 mx-auto h-full">
    <div class="py-4 flex flex-col items-center gap-3">
      <ul class="m-0 flex flex-col gap-5" v-if="listLocationRooms.length > 0">
        <RoomEditableCardVue
          class="w-full h-40 my-4 flex gap-4"
          v-for="room in listLocationRooms"
          :key="room.id"
          :room="room"
        >
        </RoomEditableCardVue>
      </ul>
      <h2 class="my-title-2" v-else>
        {{ $t("adminPanel.locations.roomsList.noRooms") }}
      </h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RoomEditableCardVue from "../Components/RoomEditableCard.vue";

export default {
  components: {
    RoomEditableCardVue,
  },
  computed: {
    ...mapGetters("adminPanelStore/locations", ["getAllLocationRooms"]),
    listLocationRooms() {
      return this.getAllLocationRooms;
    },
  },
};
</script>

<style></style>
