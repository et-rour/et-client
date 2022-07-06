<template>
  <div class="my-btn w-auto rounded-sm px-4 py-1">
    <button
      @click="loadAllPayments"
      class=""
      v-if="isLoadingAllPayments === null"
    >
      {{ $t("adminPanel.payments.excel") }}
    </button>

    <font-awesome-icon
      v-else-if="isLoadingAllPayments"
      icon="spinner"
      class="ml-2 animate-spin"
    ></font-awesome-icon>

    <download-excel
      v-else
      class="my-btn w-auto px-4 py-1"
      :data="getAllPaymentsForExcel.payments"
      :fields="json_fields"
      worksheet="My Worksheet"
      :name="reportName"
    >
      {{ $t("adminPanel.payments.download") }}
      <font-awesome-icon icon="floppy-disk" class="ml-2"></font-awesome-icon>
    </download-excel>
  </div>
</template>

<script>
import { CustomErrorToast, CustomConfirmDialog } from "@/sweetAlert";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      json_fields: {
        miembro: "member",
        fecha: "date",
        pago: "paymentType",
        detalles: "paymentDetails",
        cantidad: "amount",
        divisa: "currency",
        estado: "status",
      },
      //json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],

      isLoadingAllPayments: null,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/payments", ["fetchAllPayments"]),
    async loadAllPayments() {
      const { isConfirmed } = await CustomConfirmDialog.fire({
        text: this.$t("adminPanel.payments.sweetAlert.confirmation"),
      });
      if (!isConfirmed) return;

      try {
        this.isLoadingAllPayments = true;
        await this.fetchAllPayments();
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
      this.isLoadingAllPayments = false;
    },
  },
  computed: {
    ...mapGetters("adminPanelStore/payments", ["getAllPaymentsForExcel"]),
    reportName() {
      return `report_payments_${moment(
        this.getAllPaymentsForExcel.created
      ).format("DD/MM/YYYY_HH:mm:ss")}.xls`;
    },
  },
};
</script>

<style></style>
