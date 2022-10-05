<template>
  <div
    class="my-container my-container-mobile min-h-screen"
    v-if="getPropertyDetails"
  >
    <div class="">
      <div class="border-b flex gap-4">
        <span
          v-for="(step, index) in steps"
          :key="`step_${index}`"
          class="cursor-default"
          :class="partSelected !== step && 'text-gray-400'"
          >Paso {{ step }}</span
        >
      </div>
      <!-- <div>
        <p>{{ reservationData.reservationDateRange }}</p>
        <p>{{ reservationData.correctReservationDateRange }}</p>
        <p>{{ reservationData.contract }}</p>
        <p></p>
      </div> -->

      <div class="grid grid-cols-3 text-center md:text-left">
        <Part1
          v-if="calendarData"
          class="col-span-3"
          :class="partSelected === 1 ? 'order-first' : 'hidden'"
          @navigate="(stepDirection) => navigatePrevNext(stepDirection)"
          :reservations="calendarData.reservations"
          :leaseRange="calendarData.leaseRange"
        />
        <Part2
          class="col-span-3"
          :class="partSelected === 2 ? 'order-first' : 'hidden'"
          @navigate="(stepDirection) => navigatePrevNext(stepDirection)"
        />
        <Part3
          class="col-span-3"
          :class="partSelected === 3 ? 'order-first' : 'hidden'"
          @navigate="(stepDirection) => navigatePrevNext(stepDirection)"
        />
      </div>
      <!-- {{ JSON.stringify(reservationData, null, "\t") }} -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import Part1 from "../Components/Part1.vue";
import Part2 from "../Components/Part2.vue";
import Part3 from "../Components/Part3.vue";
export default {
  components: {
    Part1,
    Part2,
    Part3,
  },
  props: {
    idRoom: { required: true, type: String },
  },
  data() {
    return {
      partSelected: 1,
      steps: [1, 2, 3],
      calendarData: null,
    };
  },
  methods: {
    ...mapMutations("propertiesStore/reservationStorage", [
      "changeReservationData",
    ]),
    navigatePrevNext(stepDirection) {
      console.log(
        "%cerror Calendar.vue line:68 ",
        "color: red; display: block; width: 100%;",
        stepDirection
      );
      if (stepDirection === "next") {
        this.partSelected = this.partSelected + 1;
        return;
      }
      this.partSelected = this.partSelected - 1;
    },
    loadCalendarData() {
      const { idRoom } = this.$route.params;
      console.log(
        "%cPart1.vue line:95 this.$route",
        "color: white; background-color: #007acc;",
        this.$route
      );
      const isEntire = idRoom === "entire" ? "entire" : "room";
      const { reservations, leaseRange, value, name, address } =
        this.getCaledarData({
          type: isEntire,
          id: idRoom,
        });
      this.calendarData = {
        reservations,
        leaseRange,
        value,
      };
      this.changeReservationData({
        start: null,
        end: null,
        correctDate: false,
        value,
        name,
        address,
      });
    },
  },
  computed: {
    ...mapGetters("propertiesStore", ["getPropertyDetails", "getCaledarData"]),
    ...mapGetters("propertiesStore/reservationStorage", ["reservationData"]),
  },
  mounted() {
    this.loadCalendarData();
  },
};
</script>

<style></style>
