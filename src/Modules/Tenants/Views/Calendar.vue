<template>
  <div
    class="my-container my-container-mobile min-h-screen"
    v-if="getPropertyDetails">
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
      <div>
        <!-- <pre class=" bg-blue-300">{{ JSON.stringify(calendarData, null, "\t") }}</pre> -->
        <!-- <pre class="bg-red-300">{{ JSON.stringify(reservationData, null, "\t") }}</pre> -->
        <!-- <pre>{{ JSON.stringify(isDaily, null, "\t") }}</pre> -->
      </div>

      <div
        class="grid grid-cols-3 text-center md:text-left"
        v-if="calendarData">
        <Part1
          class="col-span-3"
          :isDaily="isDaily"
          :class="partSelected === 1 ? 'order-first' : 'hidden'"
          @navigate="(stepDirection) => navigatePrevNext(stepDirection)"
          :calendarData="calendarData" />
        <Part2
          class="col-span-3"
          :class="partSelected === 2 ? 'order-first' : 'hidden'"
          @navigate="(stepDirection) => navigatePrevNext(stepDirection)"
          :calendarData="calendarData" />
        <Part3
          class="col-span-3"
          :class="partSelected === 3 ? 'order-first' : 'hidden'"
          @navigate="(stepDirection) => navigatePrevNext(stepDirection)"
          :calendarData="calendarData" />
      </div>
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
  data() {
    return {
      partSelected: 1,
      steps: [1, 2, 3],
      calendarData: null,
    };
  },
  methods: {
    ...mapMutations("propertiesStore/reservationStorage", [
      "initRasarvationStorage",
    ]),
    navigatePrevNext(stepDirection) {
      if (stepDirection === "next") {
        this.partSelected = this.partSelected + 1;
        return;
      }
      this.partSelected = this.partSelected - 1;
    },
    loadCalendarData() {
      this.calendarData = this.getCaledarData(this.$route.params.idRoom);

      this.initRasarvationStorage({
        value: this.calendarData.value,
        name: this.calendarData.name,
        address: this.calendarData.address,
      });
    },
  },
  computed: {
    ...mapGetters("propertiesStore", ["getPropertyDetails", "getCaledarData"]),
    ...mapGetters("propertiesStore/reservationStorage", ["reservationData"]),
    isDaily() {
      return this.$route.params.isDaily === "daily";
    },
  },
  mounted() {
    this.loadCalendarData();
  },
};
</script>

<style></style>
