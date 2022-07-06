<template>
  <GeneralLayoutVue>
    <template v-slot:sidebar>
      <div class="w-full border-b-2 border-black pb-5">
        <div class="w-full flex justify-center">
          <span class="text-center"
            ><b>{{ $t("adminPanel.publications.search") }}</b></span
          >
        </div>
        <div class="w-full flex justify-center">
          <input
            type="text"
            v-model="filterWord"
            class="my-input w-full mx-4 border"
            placeholder="Reseña"
          />
        </div>
        <div class="w-full flex justify-center flex-col mt-4">
          <span class="text-center"
            ><b>{{ $t("adminPanel.publications.filters") }}</b></span
          >
          <!-- IS vERIFIED -->
          <div class="w-full flex justify-between px-2 items-center mb-2">
            <label for="verified">{{
              $t("adminPanel.publications.isVerifiedFilter")
            }}</label>
            <select v-model="isVerified" class="my-input border">
              <option selected value="">
                {{ $t("adminPanel.any") }}
              </option>
              <option :value="true">{{ $t("adminPanel.yes") }}</option>
              <option :value="false">{{ $t("adminPanel.no") }}</option>
            </select>
          </div>
        </div>
      </div>

      <SpinerComponent v-if="isLoadingPublicationsList" />
      <PublicationsListComponent
        v-else
        :publicationsList="filteredPublications"
      />
    </template>
    <template v-slot:main>
      <p
        v-if="$router.currentRoute.path === '/publications'"
        class="my-title text-3xl"
      >
        <font-awesome-icon icon="fa-solid fa-pen" id="penIcon" />
      </p>
      <router-view></router-view>
    </template>
  </GeneralLayoutVue>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { CustomErrorToast } from "@/sweetAlert";
import GeneralLayoutVue from "../../../Layouts/GeneralLayout.vue";
import PublicationsListComponent from "../Components/PublicationsList.vue";
import SpinerComponent from "../../../../../components/Spiner.vue";
export default {
  components: {
    GeneralLayoutVue,
    PublicationsListComponent,
    SpinerComponent,
  },
  data() {
    return {
      isLoadingPublicationsList: true,
      filterWord: "",
      isVerified: "",
    };
  },
  methods: {
    ...mapActions("adminPanelStore/publications", ["getPublications"]),
  },
  computed: {
    ...mapGetters("adminPanelStore/publications", ["getFilteredPublications"]),
    filteredPublications() {
      let filtered = this.getFilteredPublications(this.filterWord);

      if (this.isVerified !== "unselect") {
        if (this.isVerified === true) {
          filtered = filtered.filter((publication) => publication.isVerified);
        } else if (this.isVerified === false) {
          filtered = filtered.filter((publication) => !publication.isVerified);
        }
      }
      return filtered;
    },
  },
  async mounted() {
    try {
      this.isLoadingPublicationsList = true;
      await this.getPublications();
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message,
      });
    }
    this.isLoadingPublicationsList = false;
  },
};
</script>

<style>
#penIcon {
  font-size: 192px;
  color: #d3d3d3;
}
</style>
