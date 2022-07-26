<template>
  <GeneralLayoutComponent :showSidebar="false">
    <template v-slot:main>
      <div class="flex flex-col w-full h-full" id="details">
        <TableComponent :dataTable="rowData" />
      </div>
    </template>
  </GeneralLayoutComponent>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableComponent from "../../../Components/Table.vue";
import { CustomErrorToast } from "@/sweetAlert.js";
import GeneralLayoutComponent from "../../../Layouts/GeneralLayout.vue";
export default {
  components: {
    TableComponent,
    GeneralLayoutComponent,
  },
  data() {
    return {
      rowData: null,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/reservations", ["getReservations"]),
  },
  computed: {
    ...mapGetters("adminPanelStore/reservations", [
      "getAllReservationsCorrectDataStructure",
    ]),
  },
  async mounted() {
    try {
      await this.getReservations();
      if (this.getAllReservationsCorrectDataStructure.length > 0) {
        this.rowData = this.getAllReservationsCorrectDataStructure;
      }
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message || error,
      });
    }
  },
};
</script>
