<template>
  <PartTemplateVue>
    <template v-slot:title>
      <h3 class="font-black text-2xl my-5">
        {{ $t("tenants.calendar.Paso3") }}
      </h3>
    </template>
    <template v-slot:button>
      <button
        class="my-btn w-auto rounded-full py-1 px-5 bg-gray-500 mr-4"
        @click="$emit('navigate', 'back')"
      >
        {{ $t("general.previus") }}
      </button>
      <button class="my-btn w-auto rounded-full py-1 px-5" @click="goToPayment">
        {{ $t("general.finish") }}
      </button>
    </template>
    <template v-slot:content>
      <div class="p-4 grid grid-cols-2">
        <p class="font-semibold">
          {{ reservationData.reservationName }}
        </p>
        <p class="text-sm font-bold text-center">
          <span class="bg-yellow-300 p-1">
            TOTAL: $
            <NumberMaskComponent
              :number="`${reservationData.reservationValue}`"
            />
          </span>
        </p>
        <!-- <p>{{ dates }}</p> -->
      </div>
    </template>
  </PartTemplateVue>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";
import { mapActions, mapGetters } from "vuex";
import { CustomErrorToast } from "../../../sweetAlert";
import PartTemplateVue from "./PartTemplate.vue";
import NumberMaskComponent from "../../../components/NumberMaskComponent.vue";

export default {
  components: {
    PartTemplateVue,
    NumberMaskComponent,
  },
  methods: {
    ...mapActions(["goToLocationCheckoutSession", "goToRoomCheckoutSession"]),
    async goToPayment() {
      if (!this.reservationData.correctReservationDateRange) {
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
          locationId: this.$route.params.id,
          roomId: this.$route.params.idRoom,
          range: this.dates,
          ...this.reservationData.contractData,
        });
        
        Swal.hideLoading();
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
  },
  computed: {
    ...mapGetters("propertiesStore/reservationStorage", ["reservationData"]),
    dates() {
      return {
        start: moment(
          this.reservationData.reservationDateRange.start
        ).valueOf(),
        end: moment(this.reservationData.reservationDateRange.end).valueOf(),
      };
    },
  },
};
</script>

<style></style>
