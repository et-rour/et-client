<template>
  <div class="w-2/3 mx-auto h-full">
    <div class="py-4 flex flex-col gap-3">
      <!-- <h1 class="my-title-2">
        {{ $t("adminPanel.locations.roomsList.create.title") }}
        {{ idLocation }}
      </h1> -->
      <RoomCreateCard
        class="w-full h-40 my-4 flex gap-4"
        :idLocation="idLocation"
      >
      </RoomCreateCard>
    </div>
  </div>
</template>

<script>
import RoomCreateCard from "../Components/RoomCreateCard.vue";
export default {
  components: {
    RoomCreateCard,
  },
  props: {
    idLocation: {
      tyoe: Number,
      required: true,
    },
  },
};
</script>

<style></style>
