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
      :rowClassRules="rowClassRules"
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
import { GET_RESERVATIONS_LIST } from "@/Services/owner_services";
import MomentComponent from "@/components/PaymentsTableDateCell.vue";
import AmountComponent from "@/components/PaymentsTableAmountCell.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    AgGridVue,
    medalCellRenderer: MomentComponent,
    amountCellRenderer: AmountComponent,

  },
  data() {
    return {
      columnDefs: null,
      rowClassRules : null,

      isLoadingpaymentsList: false,
      paymentsList: [],
    };
  },
  methods: {
    async fetchPayments() {
      try {
        this.isLoadingpaymentsList = true;
        const reservations = await GET_RESERVATIONS_LIST(this.user.user.id);
        
        const ownerReservations = reservations.ownerReservations.map(reservation => {return {...reservation,isOwnerReservations:true}})
        this.paymentsList = [
          ...reservations.clientReservations,
          ...ownerReservations,
        ];
        this.isLoadingpaymentsList = false;
      } catch (error) {
        this.isLoadingpaymentsList = false;
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
  },
  computed:{
    ...mapGetters("authStore",["user"])
  },
  beforeMount() {
    this.columnDefs = [
      { 
        headerName: "Cantidad", 
        field: "price", 
        flex: 1,
        cellRenderer: "amountCellRenderer",
      },
      {
        headerName: "Estado",
        field: "status",
        cellClass: "font-bold",
      },
      {
        headerName: "Fecha",
        field: "created",
        cellRenderer: "medalCellRenderer",
        flex: 1,
      },
      { headerName: "Contrato", field: "contractUrl", flex: 1, },
    ];
    this.rowClassRules = {
      'payment-green': '!data.isOwnerReservations',
      'payment-red': 'data.isOwnerReservations',
    };

  },
  mounted() {
    this.fetchPayments();
  },
};
</script>

<style>
.payment-green{
  background-color: rgb(254 202 202) !important;
}
.payment-red{
  background-color: rgb(187 247 208) !important;
}
</style>
