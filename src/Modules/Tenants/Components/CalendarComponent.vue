<template>
  <div class="flex gap-8 flex-col md:flex-row flex-wrap">
    <div class="flex-grow">
      <vc-date-picker
        :masks="masks"
        ref="calendar"
        v-model="dateRange"
        is-range
        is-expanded
        :columns="$screens({ default: 1, lg: 2 })"
        :step="1"
        :disabledDates="disabledDatesForReservations"
        :attributes="attrs"
        :min-date="minDateBetweenNowAndStartLease"
        :max-date="locationLeaseRange.end"
        :select-attribute="selectDragAttribute"
        :drag-attribute="selectDragAttribute"
        @drag="dranHandler"
        @dayclick="dayClick"
        :popover="{ visibility: 'hover-focus' }">
        <template v-slot="{ inputValue, inputEvents }" v-if="isPopOver">
          <div
            class="flex items-center justify-between sm:justify-center sm:gap-8">
            <div class="relative">
              <label class="mr-2" for="start"
                >{{ $t("tenants.details.start") }}:
              </label>
              <input
                :value="inputValue.start"
                v-on="inputEvents.start"
                class="border px-2 py-1 w-32 focus:outline-none bg-gray-200" />
              <font-awesome-icon
                icon="caret-down"
                class="absolute top-2 right-1" />
            </div>

            <div class="relative">
              <label class="mr-2" for="end"
                >{{ $t("tenants.details.end") }}:
              </label>
              <input
                :value="inputValue.end"
                v-on="inputEvents.end"
                class="border px-2 py-1 w-32 focus:outline-none bg-gray-200" />
              <font-awesome-icon
                icon="caret-down"
                class="absolute top-2 right-1" />
            </div>
          </div>
        </template>
        <template v-slot:day-popover="{}">
          <div>
            <p>1 - mes minimo</p>
            <p v-if="validEndDates.length === 0" class="text-red-300">
              No hay fechas validas
            </p>
            <template v-else>
              <p class="text-green-200">Fechas validas</p>
              <p
                v-for="date in validEndDates"
                :key="date"
                class="text-green-300">
                {{ date }}
              </p>
            </template>
          </div>
        </template>
      </vc-date-picker>
    </div>

    <div
      v-if="showDetailsCard"
      class="my-4 px-6 py-4 rounded-2xl flex-shrink w-full md:w-80 grid grid-cols-2 gap-2">
      <div class="text-sm">
        <p class="font-bold">{{ $t("tenants.details.start") }}:</p>
        <p v-if="range.start">{{ dateRange.start }}</p>
        <p v-else>{{ $t("tenants.details.select") }}</p>
        <p class="font-bold">{{ $t("tenants.details.end") }}:</p>
        <p v-if="range.end">{{ dateRange.end }}</p>
        <p v-else>{{ $t("tenants.details.select") }}</p>
      </div>

      <div>
        <template v-if="validEndDates.length > 0">
          <p class="mb-4">
            {{ $t("tenants.details.validDates") }} {{ dateRange.start }}
          </p>
          <p
            class="text-green-300 text-sm"
            v-for="(date, index) in validEndDates"
            :key="`list_valid_date_${index}`">
            {{ date }}
          </p>
        </template>
        <p v-else class="text-sm">{{ $t("tenants.details.selectToSee") }}</p>
      </div>
    </div>

    <!-- <pre>{{ JSON.stringify(validEndDates,null,'\t') }}</pre> -->
    <!-- <pre>{{ JSON.stringify(monthsValidCount,null,'\t') }}</pre> -->
  </div>
</template>

<script>
import moment from "moment";
// import moment from "moment";

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
    showDetailsCard: {
      type: Boolean,
      default: true,
    },
    isPopOver: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      calendar: null,
      dragValue: null,
      validEndDates: [],
      monthsValidCount: [],
      attrs: [],
      masks: {
        input: "MMMM DD",
      },
    };
  },
  computed: {
    selectDragAttribute() {
      return {
        popover: {
          visibility: "hover",
          isInteractive: false, // Defaults to true when using slot
        },
      };
    },
    disabledDatesForReservations() {
      const dates = this.reservations.map((reservation) => {
        return {
          start: reservation.start,
          end: reservation.end,
        };
      });
      return dates;
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
    dateRange: {
      set(val) {
        // action after date change here
        console.log(
          "%cCalendarComponent.vue line:57 val",
          "color: #007acc;",
          val
        );
      },
      get() {
        let range = {
          start: moment(this.range.start).format("DD-MM-YYYY"),
          end: moment(this.range.end).format("DD-MM-YYYY"),
        };
        // action after receives date from props
        return range;
      },
    },
  },
  methods: {
    dranHandler(e) {
      this.dragValue = e;
    },
    dayClick(day) {
      if (day.isDisabled) return;
      this.validEndDates = [];

      // update valid dates the user  can select,
      // between the minimun lease date and
      // and the end lease
      const startSelectedRange = moment(this.calendar.dragTrackingValue.start);
      const endSelectedRange = moment(this.calendar.dragTrackingValue.end);
      if (startSelectedRange.isAfter(endSelectedRange)) {
        this.$emit("rangeChage", {
          range: {
            start: null,
            end: null,
          },
        });
        return;
      }

      const validMonths = [];

      this.getMonthsValidCount();

      for (let index = 0; index < this.monthsValidCount; index++) {
        const startSelectedRangeAux = moment(
          this.calendar.dragTrackingValue.start
        );
        const newDate = startSelectedRangeAux
          .add(index + 1, "months")
          .format("Do MMMM YYYY");
        validMonths.push(newDate);
      }
      this.validEndDates = validMonths;

      this.$emit("rangeChage", {
        range: {
          start: startSelectedRange.format("MM-DD-YYYY"),
          end:
            startSelectedRange === endSelectedRange
              ? null
              : endSelectedRange.format("MM-DD-YYYY"),
        },
      });

      const monthsQuantity = this.validEndDates.indexOf(
        endSelectedRange.format("Do MMMM YYYY")
      );
      if (monthsQuantity != -1) {
        this.$emit("correctRange", true, monthsQuantity + 1);
      } else {
        this.$emit("correctRange", false);
      }
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
    getMonthsValidCount() {
      if (!this.calendar || !this.calendar.dragTrackingValue.start) return;
      var startRangeSelectedSimpleDateFormat = moment(
        this.calendar.dragTrackingValue.start
      ).format("MM-DD-YYYY");
      var endLeaseSimpleDateFormat = moment(this.locationLeaseRange.end).format(
        "MM-DD-YYYY"
      );

      var startRangeSelected = moment(startRangeSelectedSimpleDateFormat);
      var endLease = moment(endLeaseSimpleDateFormat);

      this.monthsValidCount = endLease.diff(startRangeSelected, "months");
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
