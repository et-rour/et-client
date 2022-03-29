<template>
  <div class="my-container">
    <!-- <h1 class="my-title">{{ $t("admin.locations.title") }}</h1>
    <div class="flex flex-col">
      <div v-if="propertiesList.length < 1">
        <h2 class="my-subtitle">{{ $t("admin.locations.notFound") }}</h2>
      </div>
      <div v-else v-for="location in propertiesList" :key="location.id">
        <RoomCard :property="location"></RoomCard>
        <router-link
          :to="{ name: 'create-image-3d', params: { id: location.id } }"
          >Images 3d</router-link
        >
      </div>
    </div> -->
    <h1 class="my-title">Panel de Administrador</h1>
    <div class="my-container w-4/5">
      <button class="px-5" @click="setCurrentPanel(1)">Usuarios</button>
      <button class="px-5" @click="setCurrentPanel(2)">Zonas</button>
      <button class="px-5" @click="setCurrentPanel(3)">Locaciones</button>
      <button class="px-5" @click="setCurrentPanel(4)">Cuartos</button>
    </div>
    <div v-if="userBox">user</div>
    <div v-if="zoneBox">
      <div v-for="zone in zonesList" :key="zone">
        <p>{{zone.data.city}}</p>
        <p>{{zone.data.zone}}</p>
        <p>{{zone.data.state}}</p>
        <p>{{zone.data.country}}</p>
        <input type="text" :placeholder="zone.data.city">
        <input type="text" :placeholder="zone.data.zone">
        <input type="text" :placeholder="zone.data.state">
        <input type="text" :placeholder="zone.data.country">
      </div>
    </div>
    <div v-if="locationBox">location</div>
    <div v-if="roomBox">rooms</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import RoomCard from "../../Tenants/Components/InfoCard.vue";

export default {
  components: {
    // RoomCard,
  },
  data() {
    return {
      userBox: true,
      zoneBox: false,
      locationBox: false,
      roomBox: false,
    }
  },
  computed: {
    ...mapGetters("propertiesStore", ["propertiesList", "zonesList"]),
  },
  methods: {
    setCurrentPanel(arg) {
      this.userBox = false;
      this.zoneBox = false;
      this.locationBox = false;
      this.roomBox = false;
      if(arg === 1) this.userBox = true;
      if(arg === 2) this.zoneBox = true;
      if(arg === 3) this.locationBox = true;
      if(arg === 4) this.roomBox = true;
    }
  },
};
</script>

<style></style>
