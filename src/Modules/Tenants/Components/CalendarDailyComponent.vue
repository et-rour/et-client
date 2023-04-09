<template>
  <div class="flex gap-8 flex-col md:flex-row flex-wrap">
    <div class="flex-grow">
      <div class="flex flex-col gap-2 items-center">
        <!-- <pre>{{ JSON.stringify(date,null,'\t') }}</pre>
        <div v-for="(date, index) in disabledDatesForReservations" :key="`date_${index}`" class="">
          <p>{{ $moment(date.start) }}</p>
          <p>{{ $moment(date.end) }}</p>
        </div> -->
        <vc-date-picker
          ref="calendar"
          :attributes="attrs"
          :min-date="minDateBetweenNowAndStartLease"
          :max-date="locationLeaseRange.end"
          v-model="date"
          :model-config="modelConfig">
        </vc-date-picker>
      </div>

      <div class="flex flex-col items-center gap-2" v-if="date">
        <button
          v-for="(hour, index) in hoursDay"
          class="my-btn py-2 px-6 rounded-md"
          :key="`hours_${index}`"
          @click="onClickSelectHour(hour)"
          :disabled="!isValidReservationHour(hour)"
          :class="
            (!isValidReservationHour(hour) && 'bg-gray-600 my-disabled') ||
            (!isPosibleToSelect(hour) && 'bg-red-400')
          ">
          {{ hour.value }}
          <!-- {{ `${$moment(date).set("hours",index).format("YYYY-MM-DD kk:mm:ss")} _ ${isValidReservationHour($moment(date).set("hours",index))}` }} -->
        </button>
      </div>
      <!-- <pre>{{ JSON.stringify(hoursSelected,null,'\t') }}</pre> -->
    </div>
  </div>
</template>

<script>
import moment from "moment";
import hoursDay from "../utils/hoursDay";
export default {
  props: {
    reservations: {
      type: Array,
    },
    locationLeaseRange: {
      type: Object,
    },
    range: {
      type: Object,
    },
  },
  data() {
    return {
      calendar: null,
      attrs: [],
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
        timeAdjust: "12:00:00",
      },

      date: null,
      hoursSelected: [],
      isRangeHoursValid: false,
    };
  },
  computed: {
    disabledDatesForReservations() {
      const dates = this.reservations.map((reservation) => {
        return {
          start: reservation.start,
          end: reservation.end,
        };
      });
      return dates;
    },
    hoursDay() {
      return hoursDay;
    },
    // get the min date betwhen now and start lease
    minDateBetweenNowAndStartLease() {
      var now = moment(new Date());
      var startLease = moment(this.locationLeaseRange.start);
      if (now.isAfter(startLease)) {
        return now.toDate();
      }
      return startLease.toDate();
    },
    isValidHourRange() {
      if (this.hoursSelected.length < 2) {
        return false;
      }

      let firstIndex = this.hoursSelected[0].index;
      let isValid = true;
      this.hoursSelected.forEach((hourSelected) => {
        if (hourSelected.index != firstIndex) {
          isValid = false;
        }
        firstIndex++;
      });

      return isValid;
    },
  },
  methods: {
    isPosibleToSelect(hour) {
      if (!this.date) return false;
      if (
        this.hoursSelected.some(
          (hourSelected) => hourSelected.index === hour.index
        )
      )
        return false;

      // if (this.hoursSelected.pop() + 1 )) return false
      return true;
    },
    loadReservationDates() {
      this.reservations.forEach((reservation) => {
        this.attrs.push({
          highlight: {
            color: "purple",
            fillMode: "light",
          },
          dates: {
            start: reservation.start,
            end: reservation.end,
          },
          popover: {
            label: `Inicio: ${moment(reservation.start).format(
              "HH:mm a"
            )} - Fin: ${moment(reservation.end).format("HH:mm a")}`,
          },
        });
      });
    },
    onClickSelectHour(hour) {
      // DELETE HOUR FROM THE ARRAY IF SELECTED
      if (
        this.hoursSelected.some(
          (hourSelected) => hourSelected.index === hour.index
        )
      ) {
        this.hoursSelected = this.hoursSelected.filter(
          (elementHour) => elementHour.index !== hour.index
        );
      } else {
        // ADD HOUR TO THE ARRAY
        this.hoursSelected.push(hour);
        this.hourSelected = [
          ...this.hoursSelected.sort((a, b) => a.index - b.index),
        ];
      }

      if (!this.isValidHourRange) {
        this.$emit("rangeChage", {
          range: {
            start: null,
            end: null,
          },
        });
        this.$emit("correctRange", false);
        return;
      }

      const firstHour = this.hoursSelected[0];
      const lastHour = this.hoursSelected[this.hoursSelected.length - 1];

      const start = moment(this.date).hours(firstHour.index).format();
      const end = moment(this.date).hours(lastHour.index).format();

      console.log(
        "%cCalendarDailyComponent.vue line:149 {start,start}",
        "color: #26bfa5;",
        { start, end }
      );
      this.$emit("rangeChage", {
        range: {
          start: start,
          end: end,
        },
      });
      this.$emit("correctRange", true, this.hoursSelected.length);
    },
    isValidReservationHour(hour) {
      let validHour = true;
      const formatDate = moment(this.date).set("hours", hour.index);
      this.disabledDatesForReservations.forEach((reservation) => {
        if (
          formatDate.isSame(reservation.start) ||
          formatDate.isSame(reservation.end) ||
          formatDate.isBetween(reservation.start, reservation.end)
        ) {
          validHour = false;
        }
      });
      return validHour;
    },
  },

  mounted() {
    this.loadReservationDates();
    // Get reference to the calendar component
    this.calendar = this.$refs.calendar;
  },
};
</script>

<style></style>
