<template>
  <GeneralLayoutVue>
    <template v-slot:sidebar>
      <div class="sticky -top-4 left-0 z-40 bg-white">
        <div class="w-full">
          <div class="w-full flex justify-center">
            <span class="text-center"
              ><b>{{ $t("adminPanel.users.search") }}</b></span
            >
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
            <span class="text-center"
              ><b>{{ $t("adminPanel.users.filters") }}</b></span
            >
          </div>
          <div class="w-full flex justify-between px-2">
            <label for="verified">{{
              $t("adminPanel.users.isVerified")
            }}</label>
            <select name="verified" v-model="isVerified">
              <option selected value="unselect">
                {{ $t("adminPanel.any") }}
              </option>
              <option :value="true">{{ $t("adminPanel.yes") }}</option>
              <option :value="false">{{ $t("adminPanel.no") }}</option>
            </select>
          </div>
          <div class="w-full flex justify-between px-2">
            <label for="active">{{ $t("adminPanel.users.isActive") }}</label>
            <select name="active" v-model="isActive">
              <option selected value="unselect">
                {{ $t("adminPanel.any") }}
              </option>
              <option :value="true">{{ $t("adminPanel.yes") }}</option>
              <option :value="false">{{ $t("adminPanel.no") }}</option>
            </select>
          </div>
          <div class="w-full flex justify-between px-2">
            <label for="owner">{{ $t("adminPanel.users.isOwner") }}</label>
            <select name="owner" v-model="isOwner">
              <option selected value="unselect">
                {{ $t("adminPanel.any") }}
              </option>
              <option :value="true">{{ $t("adminPanel.yes") }}</option>
              <option :value="false">{{ $t("adminPanel.no") }}</option>
            </select>
          </div>
          <div class="w-full flex justify-between px-2">
            <label for="admin">{{ $t("adminPanel.users.isAdmin") }}</label>
            <select name="admin" v-model="isAdmin">
              <option selected value="unselect">
                {{ $t("adminPanel.any") }}
              </option>
              <option :value="true">{{ $t("adminPanel.yes") }}</option>
              <option :value="false">{{ $t("adminPanel.no") }}</option>
            </select>
          </div>
          <div class="w-full flex flex-col px-2 gap-2">
            <div class="w-full flex items-center gap-5">
              <label for="admin">{{ $t("adminPanel.users.from") }}:</label>
              <input
                type="date"
                class="my-input border-b flex-grow"
                v-model="dateStart"
              />
            </div>

            <div class="w-full flex items-center gap-5">
              <label for="admin">{{ $t("adminPanel.users.until") }}:</label>
              <input
                type="date"
                class="my-input border-b flex-grow"
                v-model="dateEnd"
              />
            </div>
            <ExcelUsersVue
              :usersList="filteredData"
              :dateRange="{ start: dateStart, end: dateEnd }"
              v-if="filteredData.length > 0"
            />
          </div>
        </div>
      </div>

      <SpinerComponent v-if="isLoadingUsersList" />

      <UsersListComponent v-else :usersList="filteredData" />
    </template>
    <template v-slot:main>
      <p
        v-if="$router.currentRoute.path === '/users'"
        class="my-title text-3xl"
      >
        <font-awesome-icon icon="fa-solid fa-user-pen" id="userIcon" />
      </p>
      <div v-if="deletedProp" class="w-full h-full overflow-y-scroll bg-gray-100 py-5" id="details">
        <h1 class="my-title mb-3 text-center">
          {{ $t("adminPanel.users.title") }}
        </h1>
        <p class="mb-3 text-center">
          {{ $t("adminPanel.users.sentToTrash") }}
        </p>
      </div>
      <router-view v-else></router-view>
    </template>
  </GeneralLayoutVue>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { CustomErrorToast } from "@/sweetAlert";
import GeneralLayoutVue from "../../../Layouts/GeneralLayout.vue";
import UsersListComponent from "../Components/UsersList.vue";
import SpinerComponent from "../../../../../components/Spiner.vue";
import moment from "moment";
import ExcelUsersVue from "../Components/ExcelUsers.vue";
export default {
  components: {
    GeneralLayoutVue,
    UsersListComponent,
    SpinerComponent,
    ExcelUsersVue,
  },
  data() {
    return {
      isLoadingUsersList: true,
      filterWord: "",
      isVerified: "unselect",
      isActive: "unselect",
      isOwner: "unselect",
      isAdmin: "unselect",
      dateStart: "",
      dateEnd: "",
      deletedProp: false,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/users", ["getUsers"]),
  },
  computed: {
    ...mapGetters("adminPanelStore/users", ["getFilteredUsers", "getAllUsers"]),
    dateFormat() {
      return moment(this.date).format();
    },
    users() {
      return this.getAllUsers.length;
    },
    idUser() {
      return this.$route.params.id;
    },
    filteredData() {
      let filtered = this.getFilteredUsers(this.filterWord);
      if (this.isVerified !== "unselect") {
        if (this.isVerified === true) {
          filtered = filtered.filter((user) => user.isVerified);
        } else if (this.isVerified === false) {
          filtered = filtered.filter((user) => !user.isVerified);
        }
      }
      if (this.isActive !== "unselect") {
        if (this.isActive === true) {
          filtered = filtered.filter((user) => user.isActive);
        } else if (this.isActive === false) {
          filtered = filtered.filter((user) => !user.isActive);
        }
      }
      if (this.isOwner !== "unselect") {
        if (this.isOwner === true) {
          filtered = filtered.filter((user) => user.isOwner);
        } else if (this.isOwner === false) {
          filtered = filtered.filter((user) => !user.isOwner);
        }
      }
      if (this.isAdmin !== "unselect") {
        if (this.isAdmin === true) {
          filtered = filtered.filter((user) => user.isAdmin);
        } else if (this.isAdmin === false) {
          filtered = filtered.filter((user) => !user.isAdmin);
        }
      }
      if (this.dateStart !== "" && this.dateEnd !== "") {
        filtered = filtered.filter((user) => {
          if (this.dateStart < user.created && this.dateEnd > user.created) {
            return user;
          }
        });
      }
      return filtered;
    },
  },
  async mounted() {
    try {
      this.isLoadingUsersList = true;
      await this.getUsers();
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message,
      });
    }
    this.isLoadingUsersList = false;
  },
  watch: {
    users() {
      const idx = this.getAllUsers.findIndex(user => user.id == this.idUser);
      if (idx === -1) this.deletedProp = true;
    },
    idUser() {
      this.deletedProp = false;
    }
  }
};
</script>

<style>
#userIcon {
  font-size: 192px;
  color: #d3d3d3;
}
</style>
