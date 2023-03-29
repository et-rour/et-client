<template>
  <div class="flex gap-8 flex-col md:flex-row flex-wrap">
    <div class="flex-grow">
      <div class="qw flex flex-col gap-2 items-center">
        <pre>{{ JSON.stringify(date,null,'\t') }}</pre>
        <pre>{{ isValidHourRange }}</pre>
        <vc-date-picker
          ref="calendar"
          :disabledDates="disabledDatesForReservations"
          :attributes="attrs"
          :min-date="minDateBetweenNowAndStartLease"
          :max-date="locationLeaseRange.end"
          v-model="date"
          :model-config="modelConfig"
        >
        </vc-date-picker>
      </div>

      <div class="qw flex gap-2 justify-center py-3 flex-wrap" v-show="date">
        <button 
          v-for="(hour, index) in hoursDay" 
          class="my-btn py-1 w-auto px-6 rounded-md"
          :key="`hours_${index}`" 
          @click="onClickSelectHour(hour)"
          :class="!isPosibleToSelect(hour)&&'bg-red-400'"
            >{{hour.value}}
        </button>
      </div>
      
      <pre>{{ JSON.stringify(hoursSelected,null,'\t') }}</pre>
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
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD',
        timeAdjust: '12:00:00',
      },

      date: null,
      hoursSelected:[],
      isRangeHoursValid:false,
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
    isValidHourRange(){
      if (this.hoursSelected.length < 2) {
        return false;
      }

      let firstIndex = this.hoursSelected[0].index
      let isValid = true
      this.hoursSelected.forEach(hoursSelected => {
        if (hoursSelected.index !== firstIndex) {
          isValid = false;
        }
        firstIndex++;
      })
      
      return isValid
    }
  },
  methods: {
    isPosibleToSelect(hour){
      if (!this.date) return false
      if (this.hoursSelected.some(hourSelected => hourSelected.index === hour.index)) return false

      // if (this.hoursSelected.pop() + 1 )) return false
      return true
    },
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
    onClickSelectHour(hour){
      // DELETE HOUR FROM THE ARRAY IF SELECTED
      if (this.hoursSelected.some(hourSelected => hourSelected.index === hour.index)) {
        this.hoursSelected = this.hoursSelected.filter(elementHour=> elementHour.index!==hour.index)
      }else {
        // ADD HOUR TO THE ARRAY
        this.hoursSelected.push(hour)
        this.hourSelected =  [...this.hoursSelected.sort((a,b) => a.index-b.index)]
      }

      if (!this.isValidHourRange) {
        this.$emit("correctRange", false);
        return
      }

      
      const firstHour = this.hoursSelected[0]
      const lastHour = this.hoursSelected[this.hoursSelected.length-1]

      const start = moment(this.date).hours(firstHour.index).format();
      const end = moment(this.date).hours(lastHour.index).format();
      
      console.log('%cCalendarDailyComponent.vue line:149 {start,start}', 'color: #26bfa5;', {start,end});
      this.$emit("correctRange", true,this.hoursSelected.length);
      this.$emit("rangeChage", {
        range: {
          start: start,
          end: end
        },
      });

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
