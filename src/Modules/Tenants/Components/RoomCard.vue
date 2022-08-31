<template>
  <div :id="`room_${room.id}`" class="flex flex-col items-center mb-10">
    <hr class="solid mb-8 w-full" />
    <div
      class="w-full flex flex-row gap-4 items-center"
      :class="isSelectedRoom ? 'bg-green-300' : ''"
    >
      <div
        class="w-6/12 lg:w-1/4 h-32 bg-gray-200 flex-shrink-0"
        :class="isSelectedRoom ? 'bg-green-300' : 'bg-gray-200'"
      >
        <img
          :src="room.image"
          class="w-full h-full object-cover"
          alt="project"
        />
      </div>
      <div class="flex flex-col justify-between w-full">
        <span class="text-gray-400">{{ room.squareMeter }} mts&sup2;</span>
        <p class="text-2xl sm:text-3xl">{{ price }}</p>
        <p class="text-2xl sm:text-3xl">{{ room.name }}</p>
        <!-- <p class="align-middle">{{ room.description }}</p> -->
      </div>
    </div>
    <hr class="solid mt-8 w-full" />

    <CalendarComponent
      @rangeChage="getDateRange"
      @correctRange="changeisCorrectRange"
      :range="range"
      :reservations="room.reservations"
      :locationLeaseRange="{
        start: room.startLease ? room.startLease : locationLeaseRange.start,
        end: room.endLease ? room.endLease : locationLeaseRange.end,
      }"
      :showDetailsCard="false"
      :isPopOver="true"
    >
    </CalendarComponent>

    <button
      v-if="room.stripePriceId"
      class="my-btn text-white w-full sm:w-80 py-2 rounded-lg my-4"
      @click="goToBuyLink"
    >
      <a class="uppercase">{{ $t("tenants.details.payRoom") }}</a>
    </button>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import CalendarComponent from "./CalendarComponent.vue";
import { CustomErrorToast } from "@/sweetAlert";
export default {
  props: {
    room: {
      type: Object,
      required: true,
    },
    locationLeaseRange: {
      type: Object,
    },
  },
  data() {
    return {
      range: {
        start: new Date(2020, 9, 12),
        end: new Date(2020, 9, 16),
      },
      isCorrectRange: false,
    };
  },
  methods: {
    ...mapActions(["goToRoomCheckoutSession"]),
    async goToBuyLink() {
      if (!this.isCorrectRange) {
        CustomErrorToast.fire({
          icon: "warning",
          text: this.$t("tenants.details.datesValidationMessage"),
        });
        return;
      }
      try {
        await this.goToRoomCheckoutSession({
          roomId: this.room.id,
          userId: this.user.user.id,
          range: this.dates,
        });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    getDateRange({ range }) {
      this.range = range;
    },
    changeisCorrectRange(isCorrect) {
      this.isCorrectRange = isCorrect;
    },
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    price() {
      return this.room.value === 0
        ? `${this.$t("tenants.details.included")}`
        : `$${this.room.value} ${this.$t("tenants.details.monthly")}`;
    },
    isSelectedRoom() {
      return this.$route.hash === `#room_${this.room.id}`;
    },
    dates() {
      return {
        start: moment(this.range.start).valueOf(),
        end: moment(this.range.end).valueOf(),
      };
    },
  },
  components: { CalendarComponent },
};
</script>

<style></style>
