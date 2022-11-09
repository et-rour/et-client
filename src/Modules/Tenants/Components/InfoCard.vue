<template>
  <div class="w-full h-60 lg:h-80 border relative cursor-pointer"
    @click="
      $router.push({ name: 'tenants-detail', params: { id: property.id } })
    "
  >
    <img
      :src="image"
      alt="location image"
      class="h-32 lg:h-48 w-full object-cover"
    />
    <div class="py-4 px-2 flex flex-col">
      <p>{{ property.name }}</p>
      <p class="">{{type}} <span class=" text-gray-400">/ {{ property.zone.city }}, {{ property.zone.zone }}</span></p>
      
      <p class=" mt-6" >
        <span v-if="priceAndTime.isRoom" class=" uppercase">{{$t('tenants.details.start')}} </span>
        <span>{{ priceAndTime.format }}</span>
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

export default {
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("postsStore", ["currencies"]),
    ...mapGetters("authStore", ["siteCountry"]),
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

      valueFormat = valueFormat.replaceAll(".", "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")

      return {
        format:valueFormat,
        value,
        isRoom
      }
    },
    image() {
      return this.property.image ?? require('@/assets/images/house_placeholder512.png');
    },
    availabilityImage() {
      return this.property.isActive ? require('@/assets/images/DISPONIBLE_CUT.png'):require('@/assets/images/AGOTADA_CUT.png');
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
};
</script>

<style></style>
