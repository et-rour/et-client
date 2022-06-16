<template>
  <div class="w-full h-full bg-gray-100 overflow-y-scroll" id="details">
    <div v-if="!review">
      <h1>{{ $t("adminPanel.review.select") }}</h1>
    </div>

    <div v-else class="flex items-center flex-col">
      <div class="mx-auto h-full w-2/3 py-4 flex flex-col gap-3">
        <h1 class="my-title mb-6">{{ $t("adminPanel.reviews.title") }}</h1>

        <p class="flex items-center gap-3">
          {{ $t("adminPanel.reviews.reviewTitle") }}:
          <span class="text-my-blue-primary">{{ review.title }}</span>
        </p>

        <p class="flex items-center gap-3">
          {{ $t("adminPanel.reviews.commment") }}:
          <span class="text-my-blue-primary">{{ review.comment }}</span>
        </p>
        <p class="flex items-center gap-3">
          {{ $t("adminPanel.reviews.creator") }}:
          <span class="text-my-blue-primary"
            >{{ review.creator.firstName }} {{ review.creator.lastName }}</span
          >
        </p>
        <p class="flex items-center gap-3">
          {{ $t("adminPanel.reviews.reciver") }}:
          <span class="text-my-blue-primary"
            >{{ review.receiver.firstName }} {{ review.creator.lastName }}</span
          >
        </p>
        <p class="flex items-center gap-3">
          {{ $t("adminPanel.reviews.calification") }}:
          <span class="text-my-blue-primary">
            <font-awesome-icon
              icon="fa fa-star"
              v-for="(star, index) in 5"
              :key="index"
              class="mx-1"
              :class="
                index < review.review ? 'text-yellow-400' : ' text-gray-400'
              "
            />
          </span>
        </p>

        <div class="flex items-center">
          <label for="isverified" class="mr-3"
            >{{ $t("adminPanel.reviews.isActive") }}
          </label>
          <SwitchComponentVue
            :value="review.isActive"
            v-on:toogle="toogleIsActive"
          />
        </div>
        <div class="flex items-center">
          <label for="isverified" class="mr-3"
            >{{ $t("adminPanel.reviews.isVerified") }}
          </label>
          <SwitchComponentVue
            :value="review.isVerified"
            v-on:toogle="toogleIsVerified"
          />
        </div>

        <!-- <div class="w-full flex justify-end">
          <button class="my-btn" @click="submitReview">
            {{ $t("general.update") }}
          </button>
        </div> -->
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
export default {
  props: {
    idReview: {
      type: String,
      requird: true,
    },
  },
  components: {
    SwitchComponentVue,
  },
  computed: {
    ...mapGetters("adminPanelStore", ["getReviewById"]),
    isNewZone() {
      return this.$route.params.id === "new";
    },
  },
  data() {
    return {
      review: null,
      fistValueLocation: null,
    };
  },
  methods: {
    ...mapActions("adminPanelStore", [
      "changeIsActiveReview",
      "changeIsVerifiedReview",
    ]),
    loadReview() {
      this.review = this.getReviewById(this.idReview);
    },
    async submitReview() {},
    toogleIsActive(value) {
      const changeIsActiveReviewTextAcction = !this.review.isActive
        ? this.$t("adminPanel.reviews.confiramtionMessages.activate")
        : this.$t("adminPanel.reviews.confiramtionMessages.desactivate");

      CustomConfirmDialog.fire({ text: changeIsActiveReviewTextAcction }).then(
        async (result) => {
          if (!result.isConfirmed) return;
          try {
            await this.changeIsActiveReview({
              id: this.review.id,
              activeStatus: value,
            });
            CustomToast.fire({
              title: this.$t("sweetAlertMessages.saved"),
              icon: "success",
            });
            this.review.isActive = value;
          } catch (error) {
            CustomErrorToast.fire({
              text: error.response.data.message,
            });
          }
        }
      );
    },
    toogleIsVerified(value) {
      const changeIsVerifiedReviewTextAcction = !this.review.isVerified
        ? this.$t("adminPanel.reviews.confiramtionMessages.verify")
        : this.$t("adminPanel.reviews.confiramtionMessages.unverify");
      CustomConfirmDialog.fire({
        text: changeIsVerifiedReviewTextAcction,
      }).then(async (result) => {
        if (!result.isConfirmed) return;
        try {
          await this.changeIsVerifiedReview({
            id: this.review.id,
            isVerifiedStatus: value,
          });
          CustomToast.fire({
            title: this.$t("sweetAlertMessages.saved"),
            icon: "success",
          });
          this.review.isVerified = value;
        } catch (error) {
          CustomErrorToast.fire({
            text: error.response.data.message,
          });
        }
      });
    },
  },
  created() {
    this.loadReview();
  },
  watch: {
    idReview() {
      this.loadReview();
    },
  },
};
</script>

<style></style>
