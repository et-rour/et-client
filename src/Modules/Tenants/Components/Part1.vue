<template>
  <PartTemplateVue>
    <template v-slot:title>
      <h3 class="font-black text-2xl my-5">
        {{ $t("tenants.calendar.Paso1") }}
      </h3>
      <!-- <pre>{{ JSON.stringify(getPropertyDetails,null,'\t') }}</pre> -->
      <!-- <pre>{{ JSON.stringify(calendarData.reservations,null,'\t') }}</pre> -->
      <!-- <pre>{{ JSON.stringify(range,null,'\t') }}</pre> -->
    </template>
    <template v-slot:button>
      <button class="my-btn w-auto rounded-full py-1 px-5" @click="goNextPart">
        {{ $t("general.next") }}
      </button>
    </template>
    <template v-slot:content>
      <div v-if="getPropertyDetails">
        <CalendarDailyComponent
          v-if="isDaily"
          class="bg-white py-8 px-4"
          @rangeChage="getDateRange"
          @correctRange="changeisCorrectRange"
          :range="range"
          :reservations="calendarData.reservations"
          :locationLeaseRange="calendarData.leaseRange"
          :isPopOver="true"
          :showDetailsCard="false" />
        <CalendarComponent
          v-else
          class="bg-white py-8 px-4"
          @rangeChage="getDateRange"
          @correctRange="changeisCorrectRange"
          :range="range"
          :reservations="calendarData.reservations"
          :locationLeaseRange="calendarData.leaseRange"
          :isPopOver="true"
          :showDetailsCard="false" />
      </div>
    </template>
  </PartTemplateVue>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import moment from "moment";
import CalendarComponent from "./CalendarComponent.vue";
import CalendarDailyComponent from "./CalendarDailyComponent.vue";
import PartTemplateVue from "./PartTemplate.vue";
import { CustomConfirmWarningDialog } from "@/sweetAlert";
export default {
  components: { CalendarComponent, PartTemplateVue, CalendarDailyComponent },
  props: ["calendarData", "isDaily"],
  data() {
    return {
      range: {
        start: null,
        end: null,
      },
      isCorrectRange: false,
      reservations: [],
      leaseRange: null,
    };
  },
  methods: {
    ...mapMutations("propertiesStore/reservationStorage", [
      "changeReservationDateRange",
    ]),
    async goNextPart() {
      if (!this.isCorrectRange) {
        await CustomConfirmWarningDialog.fire({
          text: this.$t("tenants.details.datesValidationMessage"),
        });
        return;
      }
      this.$emit("navigate", "next");
      return;
    },
    changeisCorrectRange(isCorrect, timeQuantity) {
      console.log(
        "%cPart1.vue line:80 changeisCorrectRange(isCorrect,timeQuantity)",
        "color: white; background-color: #007acc;",
        isCorrect,
        timeQuantity
      );
      this.isCorrectRange = isCorrect;
      if (isCorrect) {
        this.changeReservationDateRange({
          start: this.range.start,
          end: this.range.end,
          correctDate: true,
          timeQuantity,
        });
        return;
      }
      this.changeReservationDateRange({
        start: null,
        end: null,
        correctDate: false,
        timeQuantity: 1,
      });
    },
    getDateRange({ range }) {
      this.range = range;
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
  metaInfo: {
    title: "Calendario",
  },
};
</script>

<style></style>
