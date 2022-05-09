<template>
  <!-- CONTACT MODAL -->
  <div
    v-if="isModalOpen"
    class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
    @click="toogleLoginModalOpen"
  >
    <div
      class="bg-white my-container w-2/3 px-4 relative"
      @click="stopPropagation"
    >
      <div
        class="absolute top-3 left-3 p-2 cursor-pointer"
        @click="closePopup"
      >
        <font-awesome-icon
          icon="fa-solid fa-times"
          class="text-2xl"
        ></font-awesome-icon>
      </div>
      <h2 class="my-title-2 my-4 text-center">
        <!-- {{ $t("login.welcome") }} -->
        {{ $t("tenants.details.modalTitle") }}
      </h2>
      <p class="text-center">
        <!-- {{ $t("login.welcome") }} -->
        {{ $t("tenants.details.modalText1") }} <b>{{ this.locationName }}</b>{{ $t("tenants.details.modalText2") }} <b>{{ this.locationAddress }}.</b>
      </p>
      <p class="text-center">
        <!-- {{ $t("login.welcome") }} -->
        {{ $t("tenants.details.modalText3") }} <b>espacio@rour.dev</b>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
      isModalOpen: {
        type: Boolean,
        required: true,
      },
      locationName: {
        type: String,
        required: true,
      },
      locationAddress: {
        type: String,
        required: true,
      },
  },
  data() {
    return {};
  },
  methods: {
      closePopup() {
          this.$emit('closePopup')
      }
  }
};
</script>

<style></style>
