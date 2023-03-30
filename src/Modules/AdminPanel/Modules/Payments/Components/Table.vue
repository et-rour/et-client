<template>
  <div class="w-full flex-grow">
    <template>
      <AgGridVue
        class="ag-theme-alpine-dark h-10"
        :columnDefs="columnDefs"
        :rowData="dataTable"
      >
      </AgGridVue>
      <div v-if="false">
        <RecipeLinkPaymentComponent />
      </div>
    </template>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import RecipeLinkPaymentComponent from "./RecipeLinkPayment.vue";
export default {
  components: {
    AgGridVue,
    RecipeLinkPaymentComponent,
  },
  props: {
    dataTable: {
      required: true,
    },
  },
  data() {
    return {
      columnDefs: null,
    };
  },
  methods: {},
  beforeMount() {
    this.columnDefs = [
      { headerName: "Member", field: "member" },
      { headerName: "Date", field: "date", flex: 1 },
      { headerName: "Payment Type", field: "paymentType", width: 100 },
      {
        headerName: "Payment Details",
        field: "paymentDetails",
        cellRendererSelector: () => {
          const recipeLinkPaymentComponent = {
            component: "RecipeLinkPaymentComponent",
          };
          return recipeLinkPaymentComponent;
        },
        flex: 1,
      },
      { headerName: "Amount", field: "amount", width: 100 },
      { headerName: "Currency", field: "currency", width: 100 },
      {
        headerName: "Status",
        field: "status",
        cellClass: "font-bold",
        cellClassRules: {
          "green-label": "x === 'succeeded'",
          "yellow-label": "x === 'processing'",
          "red-label": "x === 'canceled'",
        },
      },
    ];
  },
};
</script>
