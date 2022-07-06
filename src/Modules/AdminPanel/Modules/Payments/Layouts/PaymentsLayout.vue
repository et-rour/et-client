<template>
  <GeneralLayoutVue :showSidebar="false">
    <template v-slot:main>
      <p
        v-if="$router.currentRoute.path === '/payments'"
        class="my-title text-3xl"
      >
        <font-awesome-icon icon="fa-solid fa-map-location-dot" id="zoneIcon" />
      </p>
      <router-view></router-view>
    </template>
  </GeneralLayoutVue>
</template>

<script>
import GeneralLayoutVue from "../../../Layouts/GeneralLayout.vue";

export default {
  components: {
    GeneralLayoutVue,
  },
};
</script>

<style>
#zoneIcon {
  font-size: 192px;
  color: #d3d3d3;
}
</style>
