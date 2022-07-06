<template>
  <div :id="`room_${room.id}`">
    <div
      class="w-full my-4 flex gap-4 items-center"
      :class="isSelectedRoom ? 'bg-green-300' : ''"
    >
      <div
        class="w-9/12 sm:w-6/12 lg:w-1/3 h-40 bg-gray-200 flex-shrink-0"
        :class="isSelectedRoom ? 'bg-green-300' : 'bg-gray-200'"
      >
        <img
          :src="room.image"
          class="w-80 h-full object-contain"
          alt="project"
        />
      </div>
      <div class="flex flex-col justify-between w-full">
        <span class="text-gray-400">{{ room.squareMeter }} mts&sup2;</span>
        <p class="align-middle text-lg font-bold">{{ room.name }}</p>
        <p class="align-middle text-lg font-bold text-green-400">{{ price }}</p>
        <p class="align-middle">{{ room.description }}</p>
        <button
          v-if="room.stripePriceId"
          class="my-btn text-white w-40 self-end"
          @click="goToBuyLink"
        >
          <a>{{ $t("tenants.details.pay") }}</a>
        </button>
      </div>
    </div>
    <hr class="solid my-4" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(["goToCheckoutSession"]),
    goToBuyLink() {
      this.goToCheckoutSession({
        locationId: this.room.id,
        userId: this.user.user.id,
        isLocation: false,
      });
    },
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    price() {
      return this.room.value === 0
        ? `${this.$t("tenants.details.included")}`
        : `${this.$t("tenants.details.notIncluded")} $${this.room.value}`;
    },
    isSelectedRoom() {
      return this.$route.hash === `#room_${this.room.id}`;
    },
  },
};
</script>

<style></style>
