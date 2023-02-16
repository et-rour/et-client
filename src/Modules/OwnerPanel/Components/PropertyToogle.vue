<template>
  <div class="w-full flex flex-col">
    <!-- @click="showModal=true" -->
    <div
      @click="toogleIsOpen"
      class="flex justify-between items-center cursor-pointer mb-2"
    >
      <p class="font-bold text-xl" :class="location.isActive?'text-black':'text-gray-400'">
        {{ location.name }}
      </p>
      <div>
        <font-awesome-icon
          v-if="isOpen"
          icon="minus"
          class="w-5 h-5 bg-gray-200 p-1"
        ></font-awesome-icon>
        <font-awesome-icon
          v-else
          icon="plus"
          class="w-5 h-5 bg-gray-200 cursor-pointer p-1"
        ></font-awesome-icon>
      </div>
    </div>
    <div
      class="overflow-hidden transition-all duration-500"
      :class="openDropdown"
    >
      <div class="w-full">
        <div class="w-full h-56 relative bg-gray-100">
          <img
            :src="location.image"
            alt="loactionImage"
            class="w-full h-full object-contain"
          />
        </div>
        <div class="flex justify-between items-center flex-wrap mt-1">
          <p>
            <span class="font-bold"
              >{{ $t("admin.locations.property.leaseTerm") }}:</span
            >
            <MomentComponent :date="location.startLease" />
            {{ $t("admin.locations.property.until") }} 
            <MomentComponent :date="location.endLease" />
          </p>
          <button class="bg-my-blue-primary px-3 py-1 rounded-none text-white">
            {{ $t("admin.locations.property.download") }}
          </button>
        </div>
        <div
          class="w-full flex justify-between items-center my-2 gap-3 flex-col xs:flex-row"
        >
          <button
            class="my-btn w-full rounded-none"
            :disabled="isLoading"
            @click="toggleShowModal"
          >
            {{ $t("admin.locations.property.extend") }}
          </button>

          <button 
            class="my-btn w-full rounded-none"
            :disabled="isLoading"
            @click="onClickFinishLeasePeriod"
            :class="location.isActive?'bg-red-500':'bg-my-green-primary'"
          >
            {{ location.isActive?$t("admin.locations.property.disable") : $t("admin.locations.property.enable") }}
          </button>
        </div>
      </div>
    </div>

    <!-- CALENDAR MODAL -->
    <ModelGlobalVue :showModal="showModal">
      <div
        class="w-11/12 h-5/6 bg-white text-center p-4 text-sm overflow-y-auto relative md:w-6/12"
      >
        <h2 class="my-title-2">{{ $t("admin.locations.calendar.title") }}</h2>
        <p class="my-1">
          {{ $t("admin.locations.calendar.descriptionPart1") }}
          <span class="font-bold">{{ location.name }}</span>
          {{ $t("admin.locations.calendar.descriptionPart2") }}
        </p>

        <p class="font-bold"> <MomentComponent :date="location.startLease" /> - <MomentComponent :date="location.endLease" /> </p>
        
        <p class="my-2">{{ $t("admin.locations.calendar.select") }}:</p>
        <div>
          <vc-date-picker
            :attributes="attributes"
            is-range
            v-model="newLeaseRange"
          ></vc-date-picker>
        </div>
        <p>{{ $t("admin.locations.calendar.extendInfo") }}</p>
        <p class="font-bold"> <MomentComponent :date="newLeaseRange.start" /> - <MomentComponent :date="newLeaseRange.end" /> </p>
        <br />
        <button
          class="my-btn bg-my-blue-primary rounded-none w-full md:w-6/12"
          @click="submitNewLeaseRange"
        >
          {{ $t("admin.locations.calendar.btn") }}
        </button>

        <button
          class="bg-gray-300 w-10 h-10 absolute top-0 right-0"
          @click="toggleShowModal"
        >
          <font-awesome-icon icon="times"></font-awesome-icon>
        </button>

        <pre>{{ JSON.stringify(newLeaseRange,null,'\t') }}</pre>

      </div>
    </ModelGlobalVue>
  </div>
</template>

<script>
import ModelGlobalVue from "../../../components/ModelGlobal.vue";
import { CustomErrorToast,CustomToast } from "@/sweetAlert";
import { PUT_UPDATE_LEASE_DATES, PUT_UPDATE_LOCATION } from "../Services/owner_services";
import MomentComponent from "../../../components/MomentComponent.vue";

export default {
  props: {
    locationNumber: {
      type: Number,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
  },
  components: {
    ModelGlobalVue,
    MomentComponent
},
  data() {
    return {
      isOpen: false,

      showModal: false,
      attributes: [
        {
          key: 1,
          highlight: {
            start: { fillMode: "outline", color: "red" },
            base: { fillMode: "light", color: "red" },
            end: { fillMode: "outline", color: "red" },
          },
          dates: {
            start: this.location.startLease ? this.location.startLease : new Date(),
            end: this.location.endLease ? this.location.endLease : new Date(),
          },
        },
      ],
      newLeaseRange: {
        start: new Date(),
        end: new Date(),
      },

      isLoading:false
    };
  },
  methods: {
    toogleIsOpen() {
      this.isOpen = !this.isOpen;
    },

    toggleShowModal() {
      this.showModal = !this.showModal;
    },
    async submitNewLeaseRange() {
      try {
        this.isLoading = true;
        const newLocationData = await PUT_UPDATE_LEASE_DATES({
          start: this.newLeaseRange.start,
          end: this.newLeaseRange.end,
          locationId: this.location.id,
        });
        
        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
        this.location.startLease = newLocationData.startLease
        this.location.endLease = newLocationData.endLease
        this.isLoading = false;
        
      } catch (error) {
        this.isLoading = false;
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },

    async onClickFinishLeasePeriod(){
      try {
        this.isLoading = true
        this.location.isActive = !this.location.isActive 
        await PUT_UPDATE_LOCATION(this.location)
        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.location.isActive = !this.location.isActive
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    }
  },
  computed: {
    openDropdown() {
      return this.isOpen ? "h-96 sm:h-80" : "h-0";
    },
  }
};
</script>

<style>
#calendarContainer {
  position: relative;
  z-index: 1;
  width: 50%;
  height: 50%;
}
.inTrip {
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}

.start {
  border-radius: 20px;
  border-left: 1px solid gray;
  border-right: none;
  background-color: #2e9cff;
  color: white;
}
.end {
  border-radius: 20px;
  border-right: 1px solid gray;
  border-left: none;
  background-color: #2e9cff;
  color: white;
}

.arrowBtnsLeft {
  position: absolute;
  top: 0.8em;
  left: 12em;
  background-color: #afd7f78e;
  color: #2e9cff;
  border: none;
  margin-left: 0.5em;
  margin-right: 0.5em;
  border-radius: 5px;
  text-align: center;
}
.arrowBtnsRight {
  position: absolute;
  top: 0.8em;
  left: 14em;
  background-color: #afd7f78e;
  color: #2e9cff;
  border: none;
  margin-left: 0.5em;
  margin-right: 0.5em;
  border-radius: 5px;
  text-align: center;
}
</style>
