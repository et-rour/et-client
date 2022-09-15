<template>
  <PartTemplateVue>
    <template v-slot:title>
      <h3 class="font-black text-2xl my-5">
        {{ $t("tenants.calendar.Paso1") }}
      </h3>
    </template>
    <template v-slot:button>
      <button
        class="my-btn w-auto rounded-full py-1 px-5"
        @click="$emit('navigate', 'next')"
      >
        {{ $t("general.next") }}
      </button>
    </template>
    <template v-slot:content>
      <div v-if="getPropertyDetails">
        <CalendarComponent
          class="bg-white py-8 px-4"
          @rangeChage="getDateRange"
          @correctRange="changeisCorrectRange"
          :range="range"
          :reservations="reservations"
          :locationLeaseRange="leaseRange"
          :isPopOver="true"
          :showDetailsCard="false"
        />
      </div>
    </template>
  </PartTemplateVue>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import moment from "moment";
import CalendarComponent from "./CalendarComponent.vue";
import PartTemplateVue from "./PartTemplate.vue";
export default {
  components: { CalendarComponent, PartTemplateVue },
  props: {
    reservations: {
      required: true,
    },
    leaseRange: {
      required: true,
    },
  },
  data() {
    return {
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
    ...mapMutations("propertiesStore/reservationStorage", [
      "changeReservationDateRange",
    ]),
    changeisCorrectRange(isCorrect) {
      this.isCorrectRange = isCorrect;
      if (isCorrect) {
        this.changeReservationDateRange({
          start: this.range.start,
          end: this.range.end,
          correctDate: true,
        });
        return;
      }
      this.changeReservationDateRange({
        start: null,
        end: null,
        correctDate: false,
      });
    },
    getDateRange({ range }) {
      this.range = range;
    },
  },
  computed: {
    ...mapGetters("propertiesStore", ["getPropertyDetails"]),
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
