<template>
  <div class="my-container-mobile w-full">
    <div class="my-container hero-main rounded-3xl overflow-hidden relative">
      <img
        src="@/assets/images/OrgEspacioTemporal.jpeg"
        alt="Hero image"
        class="w-full h-full object-cover"
      />

      <!-- MASK -->
      <div
        class="w-full h-full absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-b-3xl mask"
      ></div>
    </div>

    <div class="my-container my-5 text-center mx-auto">
      <h2 class="my-title-2">{{ $t("about-us.who") }}</h2>
      <p class="lg:w-6/12 inline-block">{{ $t("about-us.description") }}</p>

      <div class="w-full flex justify-center flex-wrap gap-4 my-20">
        <PersonalCard
          v-for="person in getPersonalMembers"
          :key="person.id"
          :person="person"
        />
      </div>
    </div>
    
    <div class="my-container text-center">
      <h4 class="font-bold text-xl mb-4">Contacto</h4>
      <p class="flex justify-center mb-4">
        <span
          class="flex justify-center items-center border border-black w-8 h-8 rounded-full mr-2"
          ><font-awesome-icon icon="fa-regular fa-envelope" class=""
        /></span>
        <span> Email: info@espaciotemporal.cl </span>
      </p>
      <p class="flex justify-center">
        <span
          class="flex justify-center items-center border border-black w-8 h-8 rounded-full mr-2"
          ><font-awesome-icon icon="fa-brands fa-whatsapp" class=""
        /></span>
        <span> Whatsapp: +56 9 2181 1458 </span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { CustomErrorToast } from "@/sweetAlert";
import PersonalCard from "./Components/PersonalCard.vue";
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions(["fetchPersonalMembers"]),
    async fetchPersonalData() {
      this.loading = true;
      try {
        await this.fetchPersonalMembers();
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters(["getPersonalMembers"]),
  },
  mounted() {
    this.fetchPersonalData();
  },
  metaInfo: {title: "Equipo"},
  components: { PersonalCard },
};
</script>

<style></style>
