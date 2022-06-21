<template>
  <div class="w-full bg-white flex flex-col text-center py-2 px-4">
    <p class="font-bold">{{ review.title }}</p>
    <div>
      <font-awesome-icon
        icon="fa fa-star"
        v-for="(star, index) in 5"
        :key="index"
        class="mx-1"
        :class="index < review.review ? 'text-yellow-400' : ' text-gray-400'"
      />
    </div>
    <p>{{ review.comment }}</p>

    <div class="w-full flex items-center">
      <p class="mr-2">{{ $t("adminPanel.reviews.isActiveFilter") }}:</p>
      <SwitchComponentVue
        :value="review.isActive"
        v-on:toogle="toogleIsActive"
      />
    </div>
    <div class="w-full flex items-center">
      <p class="mr-2">{{ $t("adminPanel.reviews.isVerifiedFilter") }}:</p>
      <SwitchComponentVue
        :value="review.isVerified"
        v-on:toogle="toogleIsVerified"
      />
    </div>
    <p class="text-right">
      {{ isCreator ? receiverName : creatorName }}
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SwitchComponentVue from "../../../../../components/SwitchComponent.vue";
import {
  CustomErrorToast,
  CustomToast,
  CustomConfirmDialog,
} from "@/sweetAlert";
export default {
  components: {
    SwitchComponentVue,
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
    isCreator: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    receiverName() {
      if (!this.review.receiver.firstName) {
        return "NA";
      }
      return `${this.$t("adminPanel.users.reviewsList.to")}: ${
        this.review.receiver.firstName
      } ${this.review.receiver.lastName}`;
    },
    creatorName() {
      if (!this.review.creator.firstName) {
        return "NA";
      }
      return `${this.$t("adminPanel.users.reviewsList.from")}: ${
        this.review.creator.firstName
      } ${this.review.creator.lastName}`;
    },
  },
  methods: {
    ...mapActions("adminPanelStore", [
      "changeIsActiveReview",
      "changeIsVerifiedReview",
    ]),
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
};
</script>

<style></style>
