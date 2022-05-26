<template>
  <GeneralLayoutVue>
    <template v-slot:sidebar>
      <div class="w-full sticky -top-4 left-0 z-30 bg-white h-10">
        <input
          type="text"
          v-model="filterWord"
          class="my-input border w-full"
          placeholder="nombre"
        />
      </div>

      <ul class="flex flex-col gap-2 h-40 md:h-auto relative">
        <router-link
          :to="{ name: 'property' }"
          active-class="active-class-admin "
          class="cursor-pointer border p-1"
        >
          <span class="w-full flex justify-between items-center"
            ><span>create new location</span><font-awesome-icon icon="plus" />
          </span>
        </router-link>
        <router-link
          v-for="location in getFilteredLocations(filterWord)"
          :to="{
            name: 'admin-locations-detail',
            params: { id: location.id },
            hash: '#details',
          }"
          :key="location.id"
          active-class="active-class-admin "
          class="cursor-pointer border p-1"
        >
          <span class="block">{{ location.id }}.-{{ location.name }}</span>
          <span class="text-gray-500">{{ location.address }}</span>
        </router-link>
      </ul>
    </template>
    <template v-slot:main>
      <p
        v-if="$router.currentRoute.path === '/locations'"
        class="my-title text-3xl"
      >
        Select a location
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
    ...mapActions("adminPanelStore", [
      "getLocations",
      "changeIsActiveProperty",
    ]),
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
    ...mapGetters("adminPanelStore", ["getFilteredLocations"]),
  },
  async mounted() {
    try {
      await this.getLocations();
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message,
      });
    }
  },
};
</script>

<style></style>
