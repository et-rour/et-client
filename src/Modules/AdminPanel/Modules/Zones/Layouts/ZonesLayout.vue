<template>
  <GeneralLayoutVue>
    <template v-slot:sidebar>
      <!-- <div class="w-full sticky -top-4 left-0 z-30 bg-white h-10">
        <input
          type="text"
          v-model="filterWord"
          class="my-input border w-full"
          placeholder="nombre"
        />
      </div> -->
      <ul class="flex flex-col gap-2 h-40 md:h-auto relative">
        <router-link
          :to="{
            name: 'admin-zones-detail',
            params: { id: 'new' },
            hash: '#details',
          }"
          active-class="active-class-admin "
          class="cursor-pointer border p-1"
        >
          <span class="w-full flex justify-between items-center"
            ><span>create new zone</span><font-awesome-icon icon="plus" />
          </span>
        </router-link>
        <router-link
          :to="{
            name: 'admin-zones-detail',
            params: { id: user.id },
            hash: '#details',
          }"
          active-class="active-class-admin "
          v-for="user in getAllZones"
          :key="user.id"
          class="cursor-pointer border p-1"
        >
          <span class="block">{{ user.zone }}</span>
          <span class="text-gray-500"
            >{{ user.country }} {{ user.state }} {{ user.city }}</span
          >
        </router-link>
      </ul>
    </template>
    <template v-slot:main>
      <p
        v-if="$router.currentRoute.path === '/zones'"
        class="my-title text-3xl"
      >
        Select a zone
      </p>
      <router-view></router-view>
    </template>
  </GeneralLayoutVue>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { CustomErrorToast } from "@/sweetAlert";
import GeneralLayoutVue from "../../../Layouts/GeneralLayout.vue";

export default {
  components: {
    GeneralLayoutVue,
  },
  data() {
    return {
      filterWord: "",
    };
  },
  methods: {
    ...mapActions("adminPanelStore", ["getZones", "changeIsActiveProperty"]),
    async changeIsActive(idUser, activeProperty) {
      try {
        await this.changeIsActiveProperty({ idUser, isActive: activeProperty });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
  },
  computed: {
    ...mapGetters("adminPanelStore", ["getAllZones"]),
  },
  async mounted() {
    try {
      await this.getZones();
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message,
      });
    }
  },
};
</script>

<style></style>
