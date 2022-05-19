<template>
  <div class="w-11/12 mx-auto">
    <AgGridVue
      class="ag-theme-alpine"
      style="height: 600px"
      :columnDefs="columnDefs"
      :rowData="rowData"
      rowSelection="multiple"
      animateRows="true"
    >
    </AgGridVue>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";

export default {
  components: {
    AgGridVue,
  },
  data() {
    return {
      reservation: null,
      columnDefs: null,
      rowData: null,
    };
  },
  methods: {
    ...mapActions("adminPanelStore", ["getReservations"]),
  },
  computed: {
    ...mapGetters("adminPanelStore", [
      "getAllReservationsCorrectDataStructure",
    ]),
    data() {
      return this.getAllReservationsCorrectDataStructure;
    },
  },
  beforeMount() {
    this.columnDefs = [
      { field: "id", sortable: true },
      { field: "start", sortable: true },
      { field: "end", sortable: true },
      {
        field: "price",
        sortable: true,
      },
      {
        field: "status",
        sortable: true,
        cellClassRules: {
          "green-label": "x === 'created'",
          "red-label": "x === 'finished'",
          "yellow-label": "x === 'in progres'",
        },
      },
    ];

    this.rowData = [];
  },
  async mounted() {
    await this.getReservations();
    if (this.getAllReservationsCorrectDataStructure.length > 0) {
      this.rowData = this.getAllReservationsCorrectDataStructure;
    }
  },
};
</script>

<style>
.red-label {
  color: rgb(255, 138, 138);
}
.green-label {
  color: rgb(138, 255, 138);
}
.yellow-label {
  color: rgb(255, 173, 20);
}
</style>
