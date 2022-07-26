<template>
  <div
    class="flex items-center justify-center my-container py-10 mb-40 md:mb-0"
  >
    <div class="flex flex-col items-center justify-evenly w-full h-4/5">
      <h1 class="my-title text-center my-3">{{ $t("createResult.title") }}:</h1>
      <div class="w-full flex flex-col items-center justify-evenly">
        <div class="text-white bg-my-blue-primary text-4xl font-sans p-4">
          <Spiner
            spinerColor="#ffffff"
            bgColor="rgb(30, 64, 175 )"
            v-if="loadingResult"
          />
          <b v-else
            >{{ parsedResult.symbol }} {{ parsedResult.min }} -
            {{ parsedResult.symbol }} {{ parsedResult.max }}</b
          >
        </div>
        <div class="text-2xl">{{ $t("createResult.periodicity") }}</div>
      </div>
      <div class="flex flex-col items-center justify-evenly">
        <button
          class="bg-my-blue-primary text-white p-2 rounded-lg"
          @click="goToSchedule"
        >
          {{ $t("createResult.vistit") }}
        </button>
        <p class="text-center text-xs mt-4">
          {{ $t("createResult.description_1") }}<br />{{
            $t("createResult.description_2")
          }}<br />{{ $t("createResult.description_3") }}
        </p>
        <p class="text-center text-xs mt-4 font-semibold">
          {{ $t("createResult.confirm") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import EspacioTemporalAPI from "@/Api/index.js";
import { mapGetters } from "vuex";
import Spiner from "../../../components/Spiner.vue";

export default {
  components: {
    Spiner,
  },
  data() {
    return {
      result: 0,
      loadingResult: true,
    };
  },
  computed: {
    ...mapGetters("propertiesStore", ["createdProperty"]),
    parsedResult() {
      if (this.result === 0) return 0;
      return {
        min: Math.round(this.result.min * this.result.currencyType.value),
        max: Math.round(this.result.max * this.result.currencyType.value),
        symbol: this.result.currencyType.symbol,
      };
    },
  },
  async mounted() {
    const requestData = {
      locationId: this.createdProperty.location.id,
      zoneId: this.createdProperty.location.zone.id,
      time: this.createdProperty.calculatorData.time,
      expectedValue: this.createdProperty.calculatorData.expectedValue,
      currencyData: this.createdProperty.calculatorData.currencyData,
    };
    try {
      const response = await EspacioTemporalAPI.post(
        "/calculator/",
        requestData
      );
      console.log(response);
      this.result = response.data;
      this.loadingResult = false;
    } catch (error) {
      alert(`error: ${error.response.data}`);
    }
  },
  methods: {
    goToSchedule() {
      this.$router.push({
        name: "schedule",
        params: {
          location: {
            name: this.createdProperty.location.name,
            address: this.createdProperty.location.address,
            zone: this.createdProperty.location.zone.zone,
            city: this.createdProperty.location.zone.city,
            country: this.createdProperty.location.zone.country,
            state: this.createdProperty.location.zone.state,
          },
        },
      });
    },
  },
  metaInfo: {
    title: "Cargar Propiedad Resultado",
  },
};
</script>

<style></style>
