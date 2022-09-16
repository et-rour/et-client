<template>
  <div class="w-full h-full bg-gray-100 overflow-y-scroll" id="details">
    <div v-if="!publication">
      <h1>{{ $t("adminPanel.publications.select") }}</h1>
    </div>

    <div v-else class="flex items-center flex-col">
      <div class="mx-auto h-full w-2/3 py-4 flex flex-col gap-3">
        <h1 class="my-title mb-6">{{ $t("adminPanel.publications.title") }}</h1>

        <p class="flex justify-between items-center gap-3">
          {{ $t("adminPanel.publications.publicationTitle") }}:
          <span class="text-my-blue-primary">{{ publication.title }}</span>
        </p>

        <p class="flex justify-between gap-3">
          {{ $t("adminPanel.publications.description") }}:
          <span class="text-my-blue-primary">{{
            publication.description
          }}</span>
        </p>

        <p class="flex justify-between items-center gap-3">
          {{ $t("adminPanel.publications.user") }}:
          <span class="text-my-blue-primary"
            >{{ publication.user.firstName }}
            {{ publication.user.lastName }}</span
          >
        </p>
        <div class="flex justify-between items-center">
          <label for="isverified" class="mr-3"
            >{{ $t("adminPanel.publications.isVerified") }}
          </label>
          <SwitchComponentVue
            :value="publication.isVerified"
            v-on:toogle="toogleIsVerified"
          />
        </div>
        <div class="flex justify-between gap-3 flex-wrap">
          <p>{{ $t("adminPanel.publications.image") }}:</p>
          <p v-if="publication.images && publication.images.length < 1">
            {{ $t("adminPanel.publications.noImage") }}:
          </p>
          <div
            v-else
            class="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <!-- <img
              v-for="image in publication.images"
              :key="image.id"
              class="w-56 h-56 object-cover"
              :src="image.image"
              :alt="`publication${image.id}`"
            /> -->
            <ImageVisibility
              class="w-56"
              v-for="image in publication.imagesPublication"
              :key="image.id"
              :image="image"
            />
          </div>
        </div>
        <p class="flex justify-between items-center gap-3">
          {{ $t("adminPanel.publications.webSite") }}:
          <a
            class="text-my-blue-primary"
            :href="publication.webSite"
            target="_blank"
            v-if="publication.webSite && publication.webSite.length > 0"
            >{{ publication.webSite }}</a
          >

          <span v-else>{{ $t("adminPanel.publications.notRegistered") }}</span>
        </p>
        <p class="flex justify-between items-center gap-3">
          {{ $t("adminPanel.publications.instagram") }}:
          <a
            class="text-my-blue-primary"
            :href="publication.instagram"
            target="_blank"
            v-if="publication.instagram && publication.instagram.length > 0"
            >{{ $t("adminPanel.publications.profile") }}</a
          >
          <span v-else>{{ $t("adminPanel.publications.notRegistered") }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SwitchComponentVue from "../../../../../components/SwitchComponent.vue";
import {
  CustomErrorToast,
  CustomToast,
  CustomConfirmDialog,
} from "@/sweetAlert";
import ImageVisibility from "../../../../../components/ImageVisibility.vue";
export default {
  props: {
    idPublication: {
      type: String,
      requird: true,
    },
  },
  components: {
    SwitchComponentVue,
    ImageVisibility,
  },
  computed: {
    ...mapGetters("adminPanelStore/publications", ["getPublicationById"]),
  },
  data() {
    return {
      publication: null,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/publications", [
      "changeIsVerifiedPublication",
    ]),
    loadPublication() {
      this.publication = this.getPublicationById(this.idPublication);
    },
    toogleIsVerified(value) {
      const changeIsverifiedPublicationTextAcction = !this.publication
        .isVerified
        ? this.$t("adminPanel.publications.confiramtionMessages.activate")
        : this.$t("adminPanel.publications.confiramtionMessages.desactivate");
      CustomConfirmDialog.fire({
        text: changeIsverifiedPublicationTextAcction,
      }).then(async (result) => {
        if (!result.isConfirmed) return;
        try {
          await this.changeIsVerifiedPublication({
            id: this.publication.id,
            isVerifiedStatus: value,
          });
          CustomToast.fire({
            title: this.$t("sweetAlertMessages.saved"),
            icon: "success",
          });
          this.publication.isVerified = value;
        } catch (error) {
          CustomErrorToast.fire({
            text: error.response.data.message,
          });
        }
      });
    },
  },
  created() {
    this.loadPublication();
  },
  watch: {
    idPublication() {
      this.loadPublication();
    },
  },
};
</script>

<style></style>
