<template>
  <div class="my-container my-container-mobile w-full">
    <h2 class="text-myheader1 font-bold text-center mt-3 uppercase">{{$t('navbar.usOption2')}}</h2>

    <div class="w-full flex justify-center flex-wrap gap-4">
      <PersonalCard
        v-for="person in getPersonalMembers"
        :key="person.id"
        :person="person"
      />
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
    title: "Equipo",
  },
  components: { PersonalCard },
};
</script>

<style></style>
