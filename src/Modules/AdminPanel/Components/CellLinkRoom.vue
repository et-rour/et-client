<template>
  <button @click="goToDetails">
    <span>
      <span class="font-semibold mx-2"> {{ idRoom }} </span>
      <font-awesome-icon
        icon="fa-solid fa-bed"
        v-if="isValidIdRoom"
      ></font-awesome-icon>
    </span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      idLocation: null,
      idRoom: null,
    };
  },
  methods: {
    refresh(params) {
      this.params = params;
      this.setIdRoom(params);
    },
    setIdRoom(params) {
      this.idRoom = params.data.room;
      this.idLocation = params.data.location;
    },
    goToDetails() {
      if (!this.isValidIdRoom) return;
      this.$router.push({
        name: "tenants-detail",
        params: { id: this.idLocation },
        hash: `#room_${this.idRoom}`,
      });
    },
  },
  computed: {
    isValidIdRoom() {
      return this.idRoom && this.idLocation;
    },
  },
  created() {
    this.setIdRoom(this.params);
  },
};
</script>

<style></style>
