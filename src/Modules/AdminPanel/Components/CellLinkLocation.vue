<template>
  <button @click="goToDetails">
    <span>
      <span class="font-semibold mx-2">
        {{ idLocation }}
      </span>
      <font-awesome-icon
        icon="fa-solid fa-house"
        v-if="isValidIdLocation"
      ></font-awesome-icon>
    </span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      idLocation: "",
    };
  },
  methods: {
    refresh(params) {
      this.params = params;
      this.setIdLocation(params);
    },

    setIdLocation(params) {
      this.idLocation = params.data.location;
    },
    goToDetails() {
      if (!this.isValidIdLocation) {
        return;
      }
      this.$router.push({
        name: "tenants-detail",
        params: { id: this.idLocation },
      });
    },
  },
  computed: {
    isValidIdLocation() {
      return (
        !this.idLocation === "" ||
        this.idLocation ||
        !this.idLocation === undefined
      );
    },
  },
  created() {
    this.setIdLocation(this.params);
  },
};
</script>

<style></style>
