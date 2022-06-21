<template>
  <GeneralLayoutVue>
    <template v-slot:sidebar>
      <div class="w-full">
        <div class="w-full flex justify-center">
          <span class="text-center"><b>{{$t("adminPanel.users.search")}}</b></span>
        </div>
        <div class="w-full flex justify-center">
          <input
            type="text"
            v-model="filterWord"
            class="my-input w-full mx-4 border"
            placeholder="Juan Pérez"
          />
        </div> 
      </div>
      <div class="w-full mt-4 pb-4 border-b-2 border-black">
        <div class="w-full flex justify-center">
          <span class="text-center"><b>{{$t("adminPanel.users.filters")}}</b></span>
        </div>
        <div class="w-full flex justify-between px-2">
          <label for="verified">{{$t("adminPanel.users.isVerified")}}</label>
          <select name="verified" v-model="isVerified">
            <option selected value="unselect">{{$t("adminPanel.any")}}</option>
            <option :value="true">{{$t("adminPanel.yes")}}</option>
            <option :value="false">{{$t("adminPanel.no")}}</option>
          </select>
        </div>
         <div class="w-full flex justify-between px-2">
          <label for="active">{{$t("adminPanel.users.isActive")}}</label>
          <select name="active" v-model="isActive">
            <option selected value="unselect">{{$t("adminPanel.any")}}</option>
            <option :value="true">{{$t("adminPanel.yes")}}</option>
            <option :value="false">{{$t("adminPanel.no")}}</option>
          </select>
        </div>
         <div class="w-full flex justify-between px-2">
          <label for="owner">{{$t("adminPanel.users.isOwner")}}</label>
          <select name="owner" v-model="isOwner">
            <option selected value="unselect">{{$t("adminPanel.any")}}</option>
            <option :value="true">{{$t("adminPanel.yes")}}</option>
            <option :value="false">{{$t("adminPanel.no")}}</option>
          </select>
        </div>
         <div class="w-full flex justify-between px-2">
          <label for="admin">{{$t("adminPanel.users.isAdmin")}}</label>
          <select name="admin" v-model="isAdmin">
            <option selected value="unselect">{{$t("adminPanel.any")}}</option>
            <option :value="true">{{$t("adminPanel.yes")}}</option>
            <option :value="false">{{$t("adminPanel.no")}}</option>
          </select>
        </div>
      </div>
      <ul class="flex flex-col h-40 md:h-auto relative">
        <router-link
          :to="{
            name: 'admin-users-detail',
            params: { id: user.id },
            hash: '#details',
          }"
          active-class="active-class-admin "
          v-for="user in filteredData"
          :key="user.id"
        >
          <div class="cursor-pointer p-1 hover:bg-my-blue-primary hover:text-white">
            <span class="block"><b>{{ user.firstName }} {{ user.lastName }}</b></span>
            <span>{{ user.email }}</span>
          </div>
          <!-- <div class="absolute top-4 right-0 hidden">
            <font-awesome-icon icon="times"></font-awesome-icon>
          </div> -->
        </router-link>
      </ul>
    </template>
    <template v-slot:main>
      <p
        v-if="$router.currentRoute.path === '/users'"
        class="my-title text-3xl"
      >
        <font-awesome-icon icon="fa-solid fa-user-pen" id="userIcon"/>
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
      filterWord: '',
      isVerified: 'unselect',
      isActive: 'unselect',
      isOwner: 'unselect',
      isAdmin: 'unselect',
    };
  },
  methods: {
    ...mapActions("adminPanelStore", ["getUsers", "changeIsActiveProperty"]),
  },
  computed: {
    ...mapGetters("adminPanelStore", ["getFilteredUsers"]),
    filteredData() {
      let filtered = this.getFilteredUsers(this.filterWord);
      if (this.isVerified !== 'unselect') {
        if (this.isVerified === true) {
          filtered = filtered.filter(user => user.isVerified);
        } else if (this.isVerified === false) {
          filtered = filtered.filter(user => !user.isVerified);
        }
      }
      if (this.isActive !== 'unselect') {
        if (this.isActive === true) {
          filtered = filtered.filter(user => user.isActive);
        } else if (this.isActive === false) {
          filtered = filtered.filter(user => !user.isActive)
        }
      }
      if (this.isOwner !== 'unselect') {
        if (this.isOwner === true) {
          filtered = filtered.filter(user => user.isOwner);
        } else if (this.isOwner === false) {
          filtered = filtered.filter(user => !user.isOwner)
        }
      }
      if (this.isAdmin !== 'unselect') {
        if (this.isAdmin === true) {
          filtered = filtered.filter(user => user.isAdmin);
        } else if (this.isAdmin === false) {
          filtered = filtered.filter(user => !user.isAdmin)
        }
      } 
      return filtered;
    }
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

<style>
#userIcon {
  font-size: 192px;
  color: #d3d3d3;
}
</style>
