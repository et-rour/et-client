<template>
  <div
    class="my-container my-container-mobile"
    v-if="getPropertyDetails && calendarData"
  >
    <div class="w-full lg:w-1/2 h-80 mx-auto mb-10">
      <img
        :src="calendarData && calendarData.image"
        alt="cover image calendar"
        class="w-full h-full object-cover"
      />
    </div>

    <CalendarComponent
      class="bg-white shadow-2xl py-8 px-4"
      @rangeChage="getDateRange"
      @correctRange="changeisCorrectRange"
      :range="range"
      :reservations="calendarData.reservations"
      :locationLeaseRange="calendarData.leaseRange"
      :isPopOver="true"
    />

    <button
      class="w-full bg-green-500 mt-12 text-white font-bold my-btn"
      @click="goToPayment"
    >
      <a>{{ $t("tenants.details.pay") }}</a>
    </button>
  </div>
</template>

<script>
import { CustomErrorToast } from "@/sweetAlert";
import CalendarComponent from "../Components/CalendarComponent.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  components: { CalendarComponent },
  props: {
    idRoom: { required: true, type: String },
  },
  data() {
    return {
      calendarData: null,
      range: {
        start: null,
        end: null,
      },
      isCorrectRange: false,
    };
  },
  methods: {
    ...mapActions(["goToLocationCheckoutSession"]),
    ...mapMutations("authStore", ["changeShowLoginModal"]),

    async goToPayment() {
      if (!this.isCorrectRange) {
        CustomErrorToast.fire({
          icon: "warning",
          text: this.$t("tenants.details.datesValidationMessage"),
        });
        return;
      }
      try {
        new Swal({
          title: this.$t("sweetAlertMessages.wait"),
          allowOutsideClick: true,
        });
        Swal.showLoading();
        await this.goToLocationCheckoutSession({
          locationId: this.getPropertyDetails.id,
          userId: this.user.user.id,
          range: this.dates,
        });
        Swal.hideLoading();
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    changeisCorrectRange(isCorrect) {
      this.isCorrectRange = isCorrect;
    },
    getDateRange({ range }) {
      this.range = range;
    },
    loadCalendarData() {
      const isEntire = this.idRoom === "entire" ? "entire" : "room";
      const { reservations, leaseRange, image } = this.getCaledarData({
        type: isEntire,
        id: this.idRoom,
      });
      this.calendarData = {
        image,
        reservations,
        leaseRange,
      };
    },
  },
  computed: {
    ...mapGetters("propertiesStore", ["getPropertyDetails", "getCaledarData"]),
    ...mapGetters("authStore", ["user"]),
    dates() {
      return {
        start: moment(this.range.start).valueOf(),
        end: moment(this.range.end).valueOf(),
      };
    },
  },
  mounted() {
    this.loadCalendarData();
  },
};
</script>

<style></style>
