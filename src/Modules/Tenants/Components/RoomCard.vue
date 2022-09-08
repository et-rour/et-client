<template>
  <div :id="`room_${room.id}`" class="flex flex-col items-center mb-10">
    <hr class="solid mb-8 w-full" />
    <div
      class="w-full flex flex-row gap-4 items-center"
      :class="isSelectedRoom ? 'bg-green-300' : ''"
    >
      <div
        class="w-6/12 lg:w-1/4 h-32 bg-gray-200 flex-shrink-0 qw relative"
        :class="isSelectedRoom ? 'bg-green-300' : 'bg-gray-200'"
      >
        <img
          :src="room.imagesRoom[0] && room.imagesRoom[0].image"
          class="w-full h-full object-cover"
          alt="room cover"
        />
        <button
          class="py-2 px-3 rounded-lg flex items-center absolute right-2 bottom-2 text-xs shadow-xl border bg-white"
          @click="showModalImages = true"
          v-if="room.imagesRoom.length > 0"
        >
          <img
            src="@/assets/icons/menupoints.png"
            class="w-3 h-3 mr-1"
            alt="menu"
          />
          {{ $t("tenants.details.pictures") }}
        </button>
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
    <ModelGlobal
      v-if="showModalImages && room.imagesRoom.length > 0"
      :showModal="showModalImages"
      v-on:toogle="showModalImages = !showModalImages"
    >
      <div class="w-2/3 h-96 bg-white relative" @click.stop>
        <SwiperVue :images="room.imagesRoom" class="h-full"></SwiperVue>
        <button
          class="bg-gray-500 w-10 h-10 absolute top-0 right-0 z-50"
          @click="showModalImages = false"
        >
          <font-awesome-icon icon="times"></font-awesome-icon>
        </button>
      </div>
    </ModelGlobal>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import CalendarComponent from "./CalendarComponent.vue";
import { CustomErrorToast } from "@/sweetAlert";
import ModelGlobal from "../../../components/ModelGlobal.vue";
import SwiperVue from "./Swiper.vue";
export default {
  components: { CalendarComponent, ModelGlobal, SwiperVue },

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

      // images
      showModalImages: false,
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
};
</script>

<style></style>
