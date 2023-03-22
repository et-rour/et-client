<template>
  <div class="flex gap-8 flex-col md:flex-row flex-wrap">
    <div class="flex-grow">
      <div class="qw flex flex-col gap-2 items-center">
        <pre>{{ JSON.stringify(date,null,'\t') }}</pre>
        <vc-date-picker
          :masks="masks"
          ref="calendar"
          :disabledDates="disabledDatesForReservations"
          :attributes="attrs"
          :min-date="minDateBetweenNowAndStartLease"
          :max-date="locationLeaseRange.end"
          @dayclick="dayClick"
          v-model="date"
        >
        </vc-date-picker>
      </div>

      <div class="qw flex flex-col gap-2 items-center">
        <button 
          v-for="(hour, index) in hoursDay" 
          class="my-btn" 
          :key="`hours_${index}`" 
          @click="onClickAddSelectHour(hour)"
            >{{hour}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import hoursDay from "../utils/hoursDay"
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
      masks: {
        input: "MMMM DD",
      },

      date: null,
      hoursSelected:[]
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
    hoursDay(){
      return hoursDay
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
  },
  methods: {
    loadReservationDates() {
      this.reservations.forEach((reservation) => {
        this.attrs.push({
          highlight: {
            color: "gray",
            fillMode: "light",
            contentClass: "italic line-through",
          },

          dates: {
            start: reservation.start,
            end: reservation.end,
          },
        });
      });
    },
    onClickAddSelectHour(hour){
      alert(hour)
    }
  },

  mounted() {
    this.loadReservationDates();
    // Get reference to the calendar component
    this.calendar = this.$refs.calendar;
  },
};
</script>

<style></style>
