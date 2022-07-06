<template>
  <div class="w-full pt-4">
    <div class="flex flex-col w-full items-center custom-height">
      <SwitchReservationsComponents
        :isCreatedReservations="isCreatedReservations"
        @toogleValue="toogleIsCreatedReservation"
      />

      <TableComponent :dataTable="dataTable"></TableComponent>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TableComponent from "../../../Components/Table.vue";
import SwitchReservationsComponents from "../Components/SwitchReservations.vue";

export default {
  components: {
    TableComponent,
    SwitchReservationsComponents,
  },
  data() {
    return {
      isCreatedReservations: true,
      dataTable: [],
    };
  },
  methods: {
    loadPaymentsInfo() {
      if (this.isCreatedReservations) {
        this.dataTable = this.getUserDetailsCreatedReservetions;
      } else {
        this.dataTable = this.getUserDetailsReceivedReservetions;
      }
    },
    toogleIsCreatedReservation: function (value) {
      this.isCreatedReservations = value;
      this.loadPaymentsInfo();
    },
  },
  computed: {
    ...mapGetters("adminPanelStore/users", [
      "getUserDetailsCreatedReservetions",
      "getUserDetailsReceivedReservetions",
    ]),
  },
  created() {
    this.loadPaymentsInfo();
  },
};
</script>

<style>
.custom-height {
  height: 29rem;
}
</style>
