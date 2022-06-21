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
    idUser: {
      type: String,
      requird: true,
    },
    isCreator: {
      type: Boolean,
      requird: true,
    },
  },
  computed: {
    ...mapGetters("adminPanelStore", ["getUserById"]),
    userName() {
      return `${this.getUserById(this.idUser).firstName} ${
        this.getUserById(this.idUser).lastName
      }`;
    },
    reviewsList() {
      return this.isCreator
        ? this.getUserById(this.idUser).createdReviews
        : this.getUserById(this.idUser).receivedReviews;
    },
  },
  mounted() {
    console.log("%cReviews.vue line:62 mounted", "color: #007acc;");
  },
};
</script>

<style></style>
