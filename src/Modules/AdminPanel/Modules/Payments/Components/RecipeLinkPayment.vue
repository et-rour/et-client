<template>
  <button>
    <span>
      <a :href="recipeUrl" target="_blank" class="font-semibold mx-2">
        {{ recipeUrl }}
      </a>
    </span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      recipeUrl: null,
    };
  },
  methods: {
    refresh(params) {
      this.params = params;
      this.setLinkRecipe(params);
    },

    setLinkRecipe(params) {
      this.recipeUrl = params.data.paymentDetails;
    },
    goToRecipeUrl() {
      if (!this.isValidRecipeUrl) {
        return;
      }
      let routeData = this.$router.resolve({ path: this.recipeUrl });
      window.open(routeData.href, "_blank");
    },
  },
  computed: {
    isValidRecipeUrl() {
      return !this.recipeUrl !== null;
    },
  },
  created() {
    this.setLinkRecipe(this.params);
  },
};
</script>

<style></style>
