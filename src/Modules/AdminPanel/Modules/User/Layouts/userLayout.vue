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
      <ul class="flex flex-col gap-2 mt-2 h-40 md:h-auto relative z-10">
        <router-link
          :to="{
            name: 'admin-users-detail',
            params: { id: user.id },
            hash: '#details',
          }"
          active-class="active-class-admin "
          v-for="user in getFilteredUsers(filterWord)"
          :key="user.id"
          class="cursor-pointer border p-1"
        >
          <span class="block">{{ user.firstName }} {{ user.lastName }}</span>
          <span class="text-gray-500">{{ user.email }}</span>

          <div class="absolute top-4 right-0 hidden">
            <font-awesome-icon icon="times"></font-awesome-icon>
          </div>
        </router-link>
      </ul>
    </template>
    <template v-slot:main>
      <p
        v-if="$router.currentRoute.path === '/users'"
        class="my-title text-3xl"
      >
        Select a user
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
    ...mapActions("adminPanelStore", ["getUsers", "changeIsActiveProperty"]),
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
    ...mapGetters("adminPanelStore", ["getFilteredUsers"]),
  },
  async mounted() {
    try {
      await this.getUsers();
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message,
      });
    }
  },
};
</script>

<style></style>
