<template>
  <div class="container2 flex items-center justify-center mb-40 md:mb-0">
    <div class="container">
      <table
        class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"
      >
        <thead class="text-white sm:text-red-500">
          <tr
            class="bg-blue-400 flex flex-col flex-nowrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
            v-for="header in getAllUsers"
            :key="header.id"
          >
            <th class="p-3 text-left">{{ $t("adminPanel.users.name") }}</th>
            <th class="p-3 text-left">{{ $t("adminPanel.users.email") }}</th>
            <th class="p-3 text-left" width="110px">
              {{ $t("adminPanel.users.actions") }}
            </th>
          </tr>
        </thead>

        <tbody class="flex-1 sm:flex-none">
          <tr
            class="flex flex-col flex-nowrap sm:table-row mb-2 sm:mb-0"
            v-for="user in getAllUsers"
            :key="user.id"
          >
            <td class="border-grey-light border hover:bg-gray-100 p-3">
              {{ user.firstName }} {{ user.lastName }}
            </td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
              {{ user.email }}
            </td>
            <td
              class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer"
            >
              <span
                v-if="user.isActive"
                @click="changeIsActive(user.id, false)"
              >
                {{ $t("adminPanel.users.options.desactivate") }}
              </span>
              <span
                v-else
                class="text-green-400"
                @click="changeIsActive(user.id, true)"
              >
                {{ $t("adminPanel.users.options.activate") }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("adminPanelStore", ["getUsers", "changeIsActiveProperty"]),
    async changeIsActive(idUser, activeProperty) {
      await this.changeIsActiveProperty({ idUser, isActive: activeProperty });
    },
  },
  computed: {
    ...mapGetters("adminPanelStore", ["getAllUsers"]),
  },
  async mounted() {
    try {
      await this.getUsers();
    } catch (error) {
      alert(error.response.data.message);
    }
  },
};
</script>

<style scoped>
.container2 {
  height: 100%;
}

@media (min-width: 640px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

td:not(:last-child) {
  border-bottom: 0;
}

th:not(:last-child) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
</style>
