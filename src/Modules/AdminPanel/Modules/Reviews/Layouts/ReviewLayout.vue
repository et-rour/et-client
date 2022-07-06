<template>
  <GeneralLayoutVue>
    <template v-slot:sidebar>
      <div class="w-full border-b-2 border-black pb-5">
        <div class="w-full flex justify-center">
          <span class="text-center"
            ><b>{{ $t("adminPanel.reviews.search") }}</b></span
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
            ><b>{{ $t("adminPanel.reviews.filters") }}</b></span
          >
          <!-- STARS -->
          <div class="w-full flex flex-col gap-1">
            <div
              class="flex gap-1 hover:bg-gray-200 items-center px-6 cursor-pointer"
              @click="$refs.rating5.click()"
              :class="filterRating === '5' ? 'bg-gray-200' : ''"
            >
              <input
                type="radio"
                class="hidden"
                v-model="filterRating"
                ref="rating5"
                value="5"
              />
              <font-awesome-icon
                icon="fa fa-star"
                v-for="star in 5"
                :key="star"
                class="text-yellow-400"
              />
            </div>
            <div
              class="flex gap-1 hover:bg-gray-200 items-center px-6 cursor-pointer"
              @click="$refs.rating4.click()"
              :class="filterRating === '4' ? 'bg-gray-200' : ''"
            >
              <input
                type="radio"
                class="hidden"
                v-model="filterRating"
                value="4"
                ref="rating4"
              />
              <font-awesome-icon
                icon="fa fa-star"
                v-for="star in 4"
                :key="star"
                class="text-yellow-400"
              />
            </div>
            <div
              class="flex gap-1 hover:bg-gray-200 items-center px-6 cursor-pointer"
              @click="$refs.rating3.click()"
              :class="filterRating === '3' ? 'bg-gray-200' : ''"
            >
              <input
                type="radio"
                class="hidden"
                v-model="filterRating"
                value="3"
                ref="rating3"
              />
              <font-awesome-icon
                icon="fa fa-star"
                v-for="star in 3"
                :key="star"
                class="text-yellow-400"
              />
            </div>
            <div
              class="flex gap-1 hover:bg-gray-200 items-center px-6 cursor-pointer"
              @click="$refs.rating2.click()"
              :class="filterRating === '2' ? 'bg-gray-200' : ''"
            >
              <input
                type="radio"
                class="hidden"
                v-model="filterRating"
                value="2"
                ref="rating2"
              />
              <font-awesome-icon
                icon="fa fa-star"
                v-for="star in 2"
                :key="star"
                class="text-yellow-400"
              />
            </div>
            <div
              class="flex gap-1 hover:bg-gray-200 items-center px-6 cursor-pointer"
              @click="$refs.rating1.click()"
              :class="filterRating === '1' ? 'bg-gray-200' : ''"
            >
              <input
                type="radio"
                class="hidden"
                v-model="filterRating"
                value="1"
                ref="rating1"
              />
              <font-awesome-icon
                icon="fa fa-star"
                v-for="star in 1"
                :key="star"
                class="text-yellow-400"
              />
            </div>

            <div
              class="flex gap-1 hover:bg-gray-200 items-center px-6 cursor-pointer"
              @click="$refs.rating0.click()"
              :class="filterRating === '0' ? 'bg-gray-200' : ''"
            >
              <input
                type="radio"
                class="hidden"
                v-model="filterRating"
                value=""
                ref="rating0"
              />
              <p>{{ $t("adminPanel.reviews.All") }}</p>
            </div>
          </div>

          <!-- IS vERIFIED -->
          <div class="w-full flex justify-between px-2 items-center mb-2">
            <label for="verified">{{
              $t("adminPanel.reviews.isVerifiedFilter")
            }}</label>
            <select v-model="isVerified" class="my-input border">
              <option selected value="">
                {{ $t("adminPanel.any") }}
              </option>
              <option :value="true">{{ $t("adminPanel.yes") }}</option>
              <option :value="false">{{ $t("adminPanel.no") }}</option>
            </select>
          </div>
          <div class="w-full flex justify-between px-2 items-center">
            <label for="verified">{{
              $t("adminPanel.reviews.isActiveFilter")
            }}</label>
            <select v-model="isActive" class="my-input border">
              <option selected value="">
                {{ $t("adminPanel.any") }}
              </option>
              <option :value="true">{{ $t("adminPanel.yes") }}</option>
              <option :value="false">{{ $t("adminPanel.no") }}</option>
            </select>
          </div>
        </div>
      </div>

      <SpinerComponent v-if="isLoadingReviewsList"></SpinerComponent>
      <ReviewsListComponent v-else :reviewsList="filteredReviews" />
    </template>
    <template v-slot:main>
      <p
        v-if="$router.currentRoute.path === '/reviews'"
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
import ReviewsListComponent from "../Components/ReviewsList.vue";
import SpinerComponent from "../../../../../components/Spiner.vue";
export default {
  components: {
    GeneralLayoutVue,
    ReviewsListComponent,
    SpinerComponent,
  },
  data() {
    return {
      isLoadingReviewsList: true,
      filterWord: "",
      filterRating: "",
      isVerified: "",
      isActive: "",
    };
  },
  methods: {
    ...mapActions("adminPanelStore/reviews", ["getReviews"]),
  },
  computed: {
    ...mapGetters("adminPanelStore/reviews", ["getFilteredReviews"]),
    filteredReviews() {
      let filtered = this.getFilteredReviews(
        this.filterWord,
        this.filterRating
      );

      if (this.isVerified !== "unselect") {
        if (this.isVerified === true) {
          filtered = filtered.filter((user) => user.isVerified);
        } else if (this.isVerified === false) {
          filtered = filtered.filter((user) => !user.isVerified);
        }
      }
      if (this.isActive !== "unselect") {
        if (this.isActive === true) {
          filtered = filtered.filter((user) => user.isActive);
        } else if (this.isActive === false) {
          filtered = filtered.filter((user) => !user.isActive);
        }
      }
      return filtered;
    },
  },
  async mounted() {
    try {
      this.isLoadingReviewsList = true;
      await this.getReviews();
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message,
      });
    }
    this.isLoadingReviewsList = false;
  },
};
</script>

<style>
#penIcon {
  font-size: 192px;
  color: #d3d3d3;
}
</style>
