<template>
  <div class="flex flex-col gap-4" v-if="selectedZone">
    <div class="flex justify-between items-center">
      <label>{{ $t("adminPanel.locations.zoneId") }}</label>
      <div class="flex items-center gap-2">
        <p>{{selectedZone.zone}} {{selectedZone.city}} {{selectedZone.state}}, {{selectedZone.country}} </p>
        <button class="my-btn w-auto px-4 py-1 rounded-none" @click="isEditing=!isEditing">
          <font-awesome-icon icon="pen" v-if="!isEditing"/>
          <font-awesome-icon icon="close" v-else/>
        </button>
      </div>
    </div>
    <div class="overflow-hidden bg-blue-300 flex flex-col gap-4" v-if="isEditing">
      <select
        class="my-input border"
        v-model="countryFilterSelected"
      >
        <option disabled selected value="">
          {{ $t("createForm.opcionDefault") }}
        </option>
        <option
          v-for="(item, index) in countries"
          :value="item"
          :key="`contry_${index}`"
        >
          {{ item }}
        </option>
      </select>
  
      <select
        class="my-input border"
        v-model="stateFilterSelected"
      >
        <option disabled selected value="">
          {{ $t("createForm.opcionDefault") }}
        </option>
        <option
          v-for="(item, index) in states"
          :value="item"
          :key="`state_${index}`"
        >
          {{ item }}
        </option>
      </select>
      
      <select
        class="my-input border"
        v-model="cityFilterSelected"
      >
        <option disabled selected value="">
          {{ $t("createForm.opcionDefault") }}
        </option>
        <option
          v-for="(item, index) in cities"
          :value="item"
          :key="`city_${index}`"
        >
          {{ item }}
        </option>
      </select>
  
      <select
        class="my-input border"
        v-model="zoneFilterSelected"
      >
        <option disabled selected value="">
          {{ $t("createForm.opcionDefault") }}
        </option>
        <option
          v-for="(item, index) in zones"
          :value="item.id"
          :key="`zone_${index}`"
        >
          {{ item.id }}.- {{item.zone}}
        </option>
      </select>

      <button class="my-btn" 
        @click="onUpdateZone"
        :class="isUploadingZone?'bg-gray-400':'bg-my-blue-primary'"
        :disabled="isUploadingZone"
      >
        {{$t('general.save')}}
      </button>
    </div>
    <!-- <p class=" text-red-400">{{`
    ${countryFilterSelected}
    ${stateFilterSelected}
    ${cityFilterSelected}
    ${zoneFilterSelected}
    `}}</p>
    <pre>{{JSON.stringify({countries,states,cities,zones},null,"\t")}}</pre> -->
  </div>
</template>

<script>
import { CustomErrorToast, CustomToast } from "@/sweetAlert";
import { mapActions } from 'vuex';
import { PUT_ADMIN_LOCATION } from "@/Services/Admin/admin_location_services";
export default {
  props:["idLocation","selectedZoneId","listZones"],
  data(){
    return{
      // listZones:[
      //   {
      //   "id": 1,
      //   "isActive": true,
      //   "country": "Chile",
      //   "state": "Santiago",
      //   "city": "Santiago",
      //   "zone": "Providencia",
      //   "centerCoordinates": "122",
      //   "rate": "0.01051664051617851",
      //   "averageValue": "500"
      //   },
      //   {
      //   "id": 2,
      //   "isActive": true,
      //   "country": "Chile",
      //   "state": "Santiago",
      //   "city": "Viña del Mar",
      //   "zone": "Otras comunas",
      //   "centerCoordinates": "122",
      //   "rate": "0.4415787464220282",
      //   "averageValue": "500"
      //   },
      //   {
      //   "id": 4,
      //   "isActive": true,
      //   "country": "Mexico",
      //   "state": "Zacatecas",
      //   "city": "Rio Grande",
      //   "zone": "Las esperanzas",
      //   "centerCoordinates": "122",
      //   "rate": "0.2581831893976205",
      //   "averageValue": "480"
      //   },
      //   {
      //   "id": 5,
      //   "isActive": true,
      //   "country": "Mexico",
      //   "state": "Zacatecas",
      //   "city": "Rio Grande",
      //   "zone": "Centro",
      //   "centerCoordinates": "122",
      //   "rate": "0.4779724600890458",
      //   "averageValue": "380"
      //   },
      //   {
      //   "id": 6,
      //   "isActive": true,
      //   "country": "Chile",
      //   "state": "Santiago",
      //   "city": "Santiago",
      //   "zone": "La Dehesa",
      //   "centerCoordinates": "122",
      //   "rate": "0.35142557402144026",
      //   "averageValue": "385"
      //   },
      //   {
      //   "id": 7,
      //   "isActive": true,
      //   "country": "Chile",
      //   "state": "Santiago",
      //   "city": "Santiago",
      //   "zone": "Otra comina",
      //   "centerCoordinates": "122",
      //   "rate": "0.44107667508267356",
      //   "averageValue": "380"
      //   },
      //   {
      //   "id": 8,
      //   "isActive": true,
      //   "country": "Mexico",
      //   "state": "Monterrey",
      //   "city": "Monterrey",
      //   "zone": "Centro",
      //   "centerCoordinates": "122",
      //   "rate": "0.9135192338163836",
      //   "averageValue": "320"
      //   },
      //   {
      //   "id": 9,
      //   "isActive": true,
      //   "country": "Mexico",
      //   "state": "Monterrey",
      //   "city": "Monaco",
      //   "zone": "Centro",
      //   "centerCoordinates": "122",
      //   "rate": "0.2275908754475804",
      //   "averageValue": "290"
      //   },
      //   {
      //   "id": 10,
      //   "isActive": true,
      //   "country": "Chile",
      //   "state": "Santiago1",
      //   "city": "Santiago",
      //   "zone": "Otras comunas",
      //   "centerCoordinates": "122",
      //   "rate": "0.08783719217733599",
      //   "averageValue": "250"
      //   },
      // ],
      
      isEditing:false,
      isUploadingZone:false,
      countryFilterSelected:null,
      stateFilterSelected:null,
      cityFilterSelected:null,
      zoneFilterSelected:null,
    }
  },
  methods:{
    ...mapActions("adminPanelStore/locations", ["updateZone"]),
    async onUpdateZone(){
      try {
        this.isUploadingZone = true;
        await PUT_ADMIN_LOCATION({
          id:this.idLocation,
          zone:this.zoneFilterSelected
        });

        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });

        location.reload();
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    }
  },
  computed:{
    selectedZone(){
      return this.listZones.find(zone => zone.id == this.selectedZoneId)
    },
    countries(){
      const filteredContries = this.listZones.map(zone => zone.country)
      return [...new Set(filteredContries)]
    },
    states(){
      if (!this.countryFilterSelected) {
        return []
      } 
      const filteredStates = this.listZones
      .filter(zone => zone.country === this.countryFilterSelected)
      .map(zone => zone.state)

      return [...new Set(filteredStates)]
    },
    cities(){ 
      if (!this.stateFilterSelected) {
        return []
      } 
      const filteredCities = this.listZones
      .filter(zone => zone.state === this.stateFilterSelected)
      .map(zone => zone.city)

      return [...new Set(filteredCities)]
    },
    zones(){ 
      if (!this.cityFilterSelected) {
        return []
      } 
      const filteredZones = this.listZones
      .filter(zone => zone.city === this.cityFilterSelected)
      .map(zone => {
        return {zone:zone.zone,id:zone.id}
      })

      return [...new Set(filteredZones)]
    },
  },
  watch:{
    countryFilterSelected(){
      this.stateFilterSelected = null
      this.cityFilterSelected = null
      this.zoneFilterSelected = null
    },
    stateFilterSelected(){
      this.cityFilterSelected = null
      this.zoneFilterSelected = null
    },
    cityFilterSelected(){
      this.zoneFilterSelected = null
    },
  }
}
</script>

<style>

</style>