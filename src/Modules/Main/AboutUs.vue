<template>
  <div class="mb-24 md:mb-0 w-full">
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
  metaInfo: {
    title: "Nosotros",
  },
  components: { PersonalCard },
};
</script>

<style></style>
