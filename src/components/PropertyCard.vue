<template>
  <div class="flex flex-col h-96 relative cursor-pointer" @click="$router.push({ name: 'tenants-detail', params: { id: property.id }})">
    <div class="h-2/3 w-full">
      <img
        @click="
          $router.push({ name: 'tenants-detail', params: { id: property.id } })
        "
        :src="image"
        alt="location_image"
        :class="!property.image ? 'object-contain h-full w-full' : 'object-cover h-full w-full'"
      />
    </div>
    <div class="bg-white p-3 pr-12 h-1/3 w-full border ">
      <p class="font-semibold">{{property.name}}</p>
      <p class="">{{type}} <span class=" text-gray-400">/ {{ property.zone.city }}, {{ property.zone.zone }}</span></p>
      <p><span v-if="priceAndTime.isRoom" class=" uppercase">{{$t('tenants.details.start')}}</span> {{ priceAndTime.format }}
        <span v-if="property.propertyType!=='room' && priceAndTime.value"> - 
          {{
            property.isDaily ?
            $t("tenants.details.daily") :
            $t("tenants.details.monthly")
          }}
        </span>
      </p>

    </div>
    <img :src="availabilityImage" alt="agotada" class="absolute top-0 left-0">

  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import HousePlaceholder from "../assets/images/house_placeholder.png"

export default {
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  components: {
    // HousePlaceholder,
  },
  computed: {
    ...mapGetters("postsStore", ["currencies"]),
    ...mapGetters("authStore", ["siteCountry"]),
    image() {
      return this.property.image ?? require('../assets/images/house_placeholder512.png');
    },
    availabilityImage() {
      return this.property.isActive ? require('../assets/images/DISPONIBLE_CUT.png'):require('../assets/images/AGOTADA_CUT.png');
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
        const roomPrices = this.property.roomsDetails.filter(room => room.isActive&&room.value!==0).map(room => room.value)
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
