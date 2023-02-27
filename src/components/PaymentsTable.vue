<template>
  <div>
    <div class="w-full bg-my-blue-primary text-white px-2 py-1" v-if="isLoadingpaymentsList">
      {{ $t("admin.payments.loading") }}
      <font-awesome-icon icon="fa-solid fa-spinner" spin/>
    </div>
    <AgGridVue
      class="ag-theme-material h-screen"
      :columnDefs="columnDefs"
      :rowData="paymentsList"
    ></AgGridVue>

    <!-- <pre>{{ JSON.stringify(paymentsList, null, "\t") }}</pre> -->
    <div v-if="false">
      <medalCellRenderer></medalCellRenderer>
      <amountCellRenderer></amountCellRenderer>
    </div>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import { CustomErrorToast } from "@/sweetAlert";
import { GET_PAYMENTS_BY_CLIENT } from "@/Services/owner_services";
import MomentComponent from "@/components/PaymentsTableDateCell.vue";
import AmountComponent from "@/components/PaymentsTableAmountCell.vue";
export default {
  components: {
    AgGridVue,
    medalCellRenderer: MomentComponent,
    amountCellRenderer: AmountComponent,

  },
  data() {
    return {
      columnDefs: null,

      isLoadingpaymentsList: false,
      paymentsList: [],
    };
  },
  methods: {
    async fetchPayments() {
      try {
        this.isLoadingpaymentsList = true;
        const { data } = await GET_PAYMENTS_BY_CLIENT();
        this.paymentsList = data;
        this.isLoadingpaymentsList = false;
      } catch (error) {
        this.isLoadingpaymentsList = false;
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
  },
  beforeMount() {
    this.columnDefs = [
      { 
        headerName: "Cantidad", 
        field: "amount", 
        width: 100,
        cellRenderer: "amountCellRenderer",
      },
      { headerName: "", field: "currency", width: 100 },
      {
        headerName: "Estado",
        field: "status",
        cellClass: "font-bold",
        cellClassRules: {
          "green-label": "x === 'succeeded'",
          "yellow-label": "x === 'processing'",
          "red-label": "x === 'canceled'",
        },
      },
      {
        headerName: "Fecha",
        field: "created",
        cellRenderer: "medalCellRenderer",
        flex: 1,
      },
      { headerName: "Detalles del pago", field: "id", flex: 1, },
    ];
  },
  mounted() {
    this.fetchPayments();
  },
};
</script>
