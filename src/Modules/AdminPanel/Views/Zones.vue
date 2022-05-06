<template>
  <div class="container2 flex items-center justify-center mb-40 md:mb-0">
    <div class="container">
      <table
        class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"
      >
        <thead class="text-white sm:text-red-500">
          <tr
            class="bg-blue-400 flex flex-col flex-nowrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
            v-for="header in getAllZones"
            :key="header.id"
          >
            <th class="p-3 text-left">{{ $t("adminPanel.zones.city") }}</th>
            <th class="p-3 text-left">{{ $t("adminPanel.zones.rate") }}</th>
            <th class="p-3 text-left">{{ $t("adminPanel.zones.zone") }}</th>
            <th class="p-3 text-left">{{ $t("adminPanel.zones.state") }}</th>
            <th class="p-3 text-left">{{ $t("adminPanel.zones.country") }}</th>
            <th class="p-3 text-left">
              {{ $t("adminPanel.zones.averageValue") }}
            </th>
            <th class="p-3 text-left">
              {{ $t("adminPanel.zones.centerCoordinates") }}
            </th>
          </tr>
        </thead>

        <tbody class="flex-1 sm:flex-none">
          <tr
            class="flex flex-col flex-nowrap sm:table-row mb-2 sm:mb-0"
            v-for="zone in getAllZones"
            :key="zone.id"
          >
            <td class="border-grey-light border hover:bg-gray-100 p-3">
              {{ zone.data.city }}
            </td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
              {{ zone.data.rate }}
            </td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
              {{ zone.data.zone }}
            </td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
              {{ zone.data.state }}
            </td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
              {{ zone.data.country }}
            </td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
              {{ zone.data.averageValue }}
            </td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
              {{ zone.data.centerCoordinates }}
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
    ...mapActions("adminPanelStore", ["getZones"]),
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
