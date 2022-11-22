<template>
  <div :id="`room_${room.id}`" class="flex flex-col items-center mb-10">
    <hr class="solid mb-8 w-full" />

    <div class="w-full grid grid-cols-1 md:grid-cols-4">
      <div class="flex flex-row gap-4 items-center md:col-span-3"
        :class="isSelectedRoom ? 'bg-green-300' : ''"
      >
        <div
          class="h-32 w-4/12 md:w-56 md:h-44 bg-gray-200 flex-shrink-0 relative rounded-2xl overflow-hidden"
          :class="isSelectedRoom ? 'bg-green-300' : 'bg-gray-200'"
        >
          <img
            :src="room.imagesRoom[0] && room.imagesRoom[0].image"
            class="w-full h-full object-cover"
            alt="room cover"
          />
          <button
            class="py-2 px-3 rounded-lg flex items-center absolute right-2 bottom-2 text-xs shadow-xl border bg-white truncate"
            @click="showModalImages = true"
            v-if="room.imagesRoom.length > 0"
          >
            <img
              src="@/assets/icons/menupoints.png"
              class="w-3 h-3 mr-1 "
              alt="menu"
            />
            {{ $t("tenants.details.pictures") }}
          </button>
          <AvailabilityImageComponent :isActive="room.isActive"/>


        </div>
        <div class="ml-10 flex flex-col justify-between w-full gap-1">
          
          <p class="text-2xl font-bold ">{{ room.name }}</p>
          <span class="text-gray-400">{{ room.squareMeter }} mts&sup2;</span>

          <p class="text-2xl ">
            ${{ price.format }} 
            <span v-if="price.value">{{ room.isDaily? $t("tenants.details.daily"): $t("tenants.details.monthly") }}</span>
          </p>

          <!-- <p class="align-middle">{{ room.description }}</p> -->
        </div>
      </div>

      <div class=" flex md:flex-col gap-2 justify-center md:justify-end items-end col-span-4 md:col-span-1 mt-2 md:mt-0">
        <button
          v-if="room.stripePriceId"
          class="font-bold block my-btn w-full py-2 rounded-xl uppercase tracking-widest"
          @click="goToCalendar"
          
          :disabled="!isActive"
          :class="!isActive&&'my-disabled'"
        >
          {{ $t("tenants.details.payRoom") }}
        </button>
        <button
          class="bg-my-green-primary font-bold block my-btn w-full py-2 rounded-xl uppercase tracking-widest"
          @click="goToSchedule"
          
          :disabled="!isActive"
          :class="!isActive&&'my-disabled'"
        >
          {{ $t("tenants.details.vistitRoom") }}
        </button>
      </div>
    </div>

    <SwiperImagesComponent
      v-if="room.imagesRoom.length>0"
      :showModal="showModalImages"
      v-on:toogle="showModalImages = !showModalImages"
      :images="room.imagesRoom"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AvailabilityImageComponent from "./AvailabilityImageComponent.vue";
import SwiperImagesComponent from './SwiperImagesComponent.vue';
export default {
  components: {
    AvailabilityImageComponent,
    SwiperImagesComponent
  },

  props: {
    room: {
      type: Object,
      required: true,
    },
    isActive:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      showModalImages: false,
    };
  },
  methods: {
    ...mapActions(["goToRoomCheckoutSession"]),
    async goToCalendar() {
      this.$router.push({
        name: "tenants-calendar",
        params: { idRoom: this.room.id },
      });
    },
    goToSchedule(e) {
      e.preventDefault();
      this.$router.push({ name: "tenants-schedule" });
    },
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    ...mapGetters("postsStore", ["currencies"]),
    price() {
      if (!this.isActive) {
        return {
          format:this.$t("general.agotada"),
          value:null
        }
      }

      if (!this.room.value) {
        return {
          format: this.$t("landing.propertyCard.noValue"),
          value:null
        }
      }

      const value = this.room.value

      const selectedCurrency = this.currencies.find(currency => currency.country === this.siteCountry)
      let valueFormat = 0

      if (this.siteCountry !== "" && selectedCurrency) {
        valueFormat = (selectedCurrency.value * parseInt(value)).toFixed(0)
      } else {
        valueFormat = value
      }

      const newValueFormat = valueFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      
      return {
        format:newValueFormat,
        value,
      }
    },
    isSelectedRoom() {
      return this.$route.hash === `#room_${this.room.id}`;
    },
  },
};
</script>

<style></style>
