<template>
  <div class="flex flex-col relative cursor-pointer " @click="$router.push({ name: 'tenants-detail', params: { id: property.id }})">
    <div class="h-60 w-full rounded-3xl overflow-hidden">
      <img
        @click="
          $router.push({ name: 'tenants-detail', params: { id: property.id } })
        "
        :src="image"
        alt="location_image"
        :class="!property.image ? 'object-contain h-full w-full' : 'object-cover h-full w-full'"
      />
    </div>
    
    <div class="bg-white p-4 pr-12 h-1/3 w-full ">
      <p class="font-semibold">{{property.name}}, {{ property.zone.zone }}</p>
      <p>{{ property.zone.city }}</p>
      <p class="my-2">{{type}}/ 
        <span class="font-bold">
          <span v-if="priceAndTime.isRoom" class="uppercase">{{$t('tenants.details.start')}} </span> 
          <span v-if="priceAndTime.value">$</span>{{ priceAndTime.format }}
        </span>
      </p>
      

    </div>
    <AvailabilityImageComponent :isActive="property.isActive"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AvailabilityImageComponent from '../Modules/Tenants/Components/AvailabilityImageComponent.vue';


export default {
  components:{
    AvailabilityImageComponent
  },
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("postsStore", ["currencies"]),
    ...mapGetters("authStore", ["siteCountry"]),
    image() {
      return this.property.image ?? require('../assets/images/house_placeholder512.png');
    },
    priceAndTime() {
      if (!this.property.isActive) {
        return {
          format: this.$t("general.agotada"),
          value:null
        }
      }

      let value = this.property.value;
      let isRoom = false;
      if (this.property.propertyType === 'room') {
        // [90000,20000]
        const roomPrices = this.property.roomsDetails.filter(room => room.isActive && room.value!==0&& !room.isDeleted).map(room => room.value)
        if (roomPrices.length === 0){
          return{
            isRoom:false,
            format:this.$t("landing.propertyCard.noRooms"),
            value: null
          }
        } else{
          isRoom = true
          value = Math.min(...roomPrices)
        }
      }

      if (!value || value==="0") {
        return {
          format: this.$t("landing.propertyCard.noValue"),
          value:null
        }
      }

      const selectedCurrency = this.currencies.find(currency => currency.country === this.siteCountry)
      let valueFormat = 0
      if (this.siteCountry !== "" && selectedCurrency) {
        valueFormat = (selectedCurrency.value * parseInt(value)).toFixed(0)
      } else {
        valueFormat = value
      }

      valueFormat = valueFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      return {
        format:valueFormat,
        value,
        isRoom
      }
    },
    type(){
      switch (this.property.propertyType) {
        case "entire":
          return "Propiedad completa"
        case "room":
          return "Espacio privado"
      
        default:
          return this.property.propertyType
      }
    }
  },
  mounted() {
    // console.log("PROPERTY DATA", this.property);
  },
};
</script>
