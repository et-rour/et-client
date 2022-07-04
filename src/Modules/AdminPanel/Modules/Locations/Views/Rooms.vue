<template>
  <div class="w-2/3 mx-auto h-full">
    <ul class="flex flex-col gap-4" v-if="listLocationRooms.length > 0">
      <RoomEditableCardVue
        class="w-full h-40 my-4 flex gap-4"
        v-for="room in listLocationRooms"
        :key="room.id"
        :room="room"
        :idLocation="idLocation"
      >
      </RoomEditableCardVue>
    </ul>
    <h2 class="my-title-2" v-else>
      {{ $t("adminPanel.locations.roomsList.noRooms") }}
    </h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RoomEditableCardVue from "../Components/RoomEditableCard.vue";

export default {
  components: {
    RoomEditableCardVue,
  },
  props: {
    idLocation: {
      type: String,
      requird: true,
    },
  },

  computed: {
    ...mapGetters("adminPanelStore", ["getAllLocationRooms"]),
    listLocationRooms() {
      return this.getAllLocationRooms(Number(this.idLocation));
    },
  },
};
</script>

<style></style>
