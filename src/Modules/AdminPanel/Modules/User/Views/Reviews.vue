<template>
  <div class="mx-auto h-full w-full pt-4 flex flex-col">
    <div class="flex flex-col gap-4 items-start">
      <h2 class="text-2xl font-semibold my-14" v-if="reviewsList.length === 0">
        {{ $t("adminPanel.users.reviewsList.noReviewsFound") }}
      </h2>

      <div class="flex flex-col w-full gap-3" v-else>
        <ReviewCard
          v-for="review in reviewsList"
          :key="review.id"
          :review="review"
          :isCreator="isCreator"
        ></ReviewCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ReviewCard from "../Components/ReviewCard.vue";

export default {
  components: {
    ReviewCard,
  },
  props: {
    isCreator: {
      type: Boolean,
      requird: true,
    },
  },
  computed: {
    ...mapGetters("adminPanelStore/users", ["getUserDetails"]),
    reviewsList() {
      return this.isCreator
        ? this.getUserDetails.createdReviews
        : this.getUserDetails.receivedReviews;
    },
  },
};
</script>

<style></style>
