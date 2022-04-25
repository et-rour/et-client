<template>
  <div class="w-full flex flex-col">
    <div
      @click="toogleIsOpen"
      class="flex justify-between items-center cursor-pointer mb-2"
    >
      <p class="font-bold text-xl">
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
          <abbr :title="$t('admin.locations.property.images3d')">
            <router-link
              class="absolute bottom-2 right-4 bg-gray-300 text-xl px-1"
              :to="{ name: 'create-image-3d', params: { id: location.id } }"
            >
              <font-awesome-icon icon="panorama"></font-awesome-icon>
            </router-link>
          </abbr>
        </div>
        <div class="flex justify-between items-center flex-wrap mt-1">
          <p>
            <span class="font-bold"
              >{{ $t("admin.locations.property.leaseTerm") }}:</span
            >
            {{ startLease }}
            {{ $t("admin.locations.property.until") }} {{ endLease }}
          </p>
          <button class="bg-blue-700 px-3 py-1 rounded-none text-white">
            {{ $t("admin.locations.property.download") }}
          </button>
        </div>
        <div
          class="w-full flex justify-between items-center my-2 gap-3 flex-col xs:flex-row"
        >
          <button
            class="my-btn p-0 rounded-none py-1 w-full"
            @click="toggleShowModal"
          >
            {{ $t("admin.locations.property.extend") }}
          </button>

          <button class="my-btn bg-red-500 p-0 rounded-none py-1 w-full px-4">
            {{ $t("admin.locations.property.finish") }}
          </button>
        </div>
      </div>
    </div>

    <!-- CALENDAR MODAL -->
    <ModelGlobalVue v-show="showModal">
      <div
        class="w-11/12 h-5/6 bg-white text-center px-4 text-sm overflow-y-auto relative md:w-6/12"
      >
        <h2 class="my-subtitle">{{ $t("admin.locations.calendar.title") }}</h2>
        <p class="my-1">
          {{ $t("admin.locations.calendar.descriptionPart1") }}
          <span class="font-bold">{{ location.name }}</span>
          {{ $t("admin.locations.calendar.descriptionPart2") }}
        </p>
        <input
          type="text"
          v-model="endLease"
          class="my-input border border-gray-400 w-full md:w-6/12 text-center"
        />
        <p class="my-2">{{ $t("admin.locations.calendar.select") }}:</p>
        <div>
          <vc-date-picker
            :attributes="attributes"
            is-range
            v-model="newLeaseRange"
          ></vc-date-picker>
        </div>
        <p>{{ $t("admin.locations.calendar.extendInfo") }}</p>
        <input
          type="text"
          v-model="endNewEndLease"
          class="my-input border mb-3 border-gray-400 w-full md:w-6/12 text-center"
        />
        <br />
        <button
          class="my-btn bg-blue-700 rounded-none w-full md:w-6/12"
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
        <!-- <p>{{ this.location.startLease }} {{ this.location.endLease }}</p>
        <p>
          {{ this.newLeaseRange.start }}
          {{ this.newLeaseRange.end }}
        </p> -->
      </div>
    </ModelGlobalVue>
  </div>
</template>

<script>
import ModelGlobalVue from "../../../components/ModelGlobal.vue";
import moment from "moment";
import { mapActions } from "vuex";
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
            start: this.location.startLease
              ? this.location.startLease
              : new Date(),
            end: this.location.endLease ? this.location.endLease : new Date(),
          },
        },
      ],
      newLeaseRange: {
        start: new Date(),
        end: new Date(),
      },
    };
  },
  methods: {
    ...mapActions("adminStore", ["updateLocationLease"]),
    toogleIsOpen() {
      this.isOpen = !this.isOpen;
    },

    toggleShowModal() {
      this.showModal = !this.showModal;
    },
    async submitNewLeaseRange() {
      const data = {
        start: moment(this.newLeaseRange.start).format(""),
        end: moment(this.newLeaseRange.end).format(""),
        locationId: this.location.id,
      };
      await this.updateLocationLease(data);
    },
  },
  computed: {
    openDropdown() {
      return this.isOpen ? "h-96 sm:h-80" : "h-0";
    },
    startLease() {
      return moment(this.location.startLease).format("DD-MM-YYYY");
    },
    endLease() {
      return moment(this.location.endLease).format("DD-MM-YYYY");
    },
    endNewEndLease() {
      return moment(this.newLeaseRange.end).format("DD-MM-YYYY");
    },
  },
  watch: {
    location: function (value) {
      this.attributes = [
        {
          key: 1,
          highlight: {
            start: { fillMode: "outline", color: "red" },
            base: { fillMode: "light", color: "red" },
            end: { fillMode: "outline", color: "red" },
          },
          dates: {
            start: value.startLease ? value.startLease : new Date(),
            end: value.endLease ? value.endLease : new Date(),
          },
        },
      ];
      this.newLeaseRange = {
        start: new Date(),
        end: new Date(),
      };
    },
  },
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
