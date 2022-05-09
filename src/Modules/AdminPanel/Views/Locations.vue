<template>
  <div
    class="container2 flex items-center justify-center mb-40 md:mb-0 overflow-y-auto"
  >
    <div class="container">
      <table
        class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"
      >
        <thead class="text-white sm:text-red-500">
          <tr
            class="bg-blue-400 flex flex-col flex-nowrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
            v-for="header in getAllLocations"
            :key="header.id"
          >
            <th class="p-3 text-left h-13">id</th>
            <th class="p-3 text-left h-13">
              {{ $t("adminPanel.locations.name") }}
            </th>
            <th class="p-3 text-left h-13">
              {{ $t("adminPanel.locations.address") }}
            </th>
            <th class="p-3 text-left h-13">
              {{ $t("adminPanel.locations.coords") }}
            </th>
            <th class="p-3 text-left h-13">
              {{ $t("adminPanel.locations.rooms") }}
            </th>
            <th class="p-3 text-left h-13">
              {{ $t("adminPanel.locations.bathrooms") }}
            </th>
            <th class="p-3 text-left h-13">
              {{ $t("adminPanel.locations.painting") }}
            </th>
            <th class="p-3 text-left h-13">
              {{ $t("adminPanel.locations.floor") }}
            </th>
            <th class="p-3 text-left h-13">
              {{ $t("adminPanel.locations.actions") }}
            </th>
          </tr>
        </thead>

        <tbody class="flex-1 sm:flex-none">
          <tr
            class="flex flex-col flex-nowrap sm:table-row mb-2 sm:mb-0"
            v-for="location in getAllLocations"
            :key="location.id"
          >
            <td
              class="border-grey-light border hover:bg-gray-100 p-3 truncate h-13"
            >
              {{ location.id }}
            </td>
            <td
              class="border-grey-light border hover:bg-gray-100 p-3 truncate h-13"
            >
              {{ location.name }}
            </td>
            <td
              class="border-grey-light border hover:bg-gray-100 p-3 truncate h-13"
            >
              {{ location.address }}
            </td>
            <td
              class="border-grey-light border hover:bg-gray-100 p-3 truncate h-13"
            >
              {{ location.coords }}
            </td>
            <td
              class="border-grey-light border hover:bg-gray-100 p-3 truncate h-13"
            >
              {{ location.rooms }}
            </td>
            <td
              class="border-grey-light border hover:bg-gray-100 p-3 truncate h-13"
            >
              {{ location.bathrooms }}
            </td>
            <td
              class="border-grey-light border hover:bg-gray-100 p-3 truncate h-13"
            >
              {{ location.painting }}
            </td>
            <td
              class="border-grey-light border hover:bg-gray-100 p-3 truncate h-13"
            >
              {{ location.floor }}
            </td>

            <td
              class="border-grey-light border hover:bg-gray-100 p-3 truncate h-13"
            >
              <span
                v-if="!location.isActive"
                @click="changeIsActive(location.id, true)"
                class="text-green-400 cursor-pointer"
              >
                {{ $t("adminPanel.locations.options.activate") }}
              </span>
              <span
                v-else
                @click="changeIsActive(location.id, false)"
                class="text-red-400 cursor-pointer"
              >
                {{ $t("adminPanel.locations.options.desactivate") }}
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
import { CustomErrorToast } from "@/sweetAlert";
export default {
  methods: {
    ...mapActions("adminPanelStore", [
      "getLocations",
      "changeIsActivePropertyInLocation",
    ]),
    async changeIsActive(idLocation, activeLocation) {
      try {
        await this.changeIsActivePropertyInLocation({
          idLocation,
          isActive: activeLocation,
        });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
  },
  computed: {
    ...mapGetters("adminPanelStore", ["getAllLocations"]),
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

th {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
</style>
