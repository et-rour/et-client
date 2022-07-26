<template>
  <div class="w-full h-full bg-gray-100" id="details">
    <div class="w-full h-full flex flex-col pb-4">
      <SpinerComponent v-if="isLoadingPayments" class="flex-grow" />
      <TableComponent
        v-else
        :dataTable="getAllPaymentsTableSctructure"
      ></TableComponent>
      <div class="flex justify-end mt-1 gap-3">
        <JsonToExelComponent />
        <template>
          <button
            class="my-btn p-1 px-6 w-auto rounded-sm"
            :class="getprevHasMore ? ' bg-my-blue-primary' : 'bg-gray-400'"
            :disabled="!getprevHasMore"
            @click="paginationPrev"
          >
            {{ $t("adminPanel.payments.prev") }}
          </button>
          <button
            class="my-btn p-1 px-6 w-auto rounded-sm"
            :class="getnextHasMore ? ' bg-my-blue-primary' : 'bg-gray-400'"
            :disabled="!getnextHasMore"
            @click="paginationNext"
          >
            {{ $t("adminPanel.payments.next") }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableComponent from "../Components/Table.vue";
import { CustomErrorToast } from "@/sweetAlert";
import SpinerComponent from "../../../../../components/Spiner.vue";
import JsonToExelComponent from "../Components/JsonToExel.vue";
export default {
  components: {
    TableComponent,
    SpinerComponent,
    JsonToExelComponent,
  },
  data() {
    return {
      isLoadingPayments: true,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/payments", [
      "fetchNextPayments",
      "fetchPrevPayments",
    ]),
    async paginationPrev() {
      try {
        this.isLoadingPayments = true;
        await this.fetchPrevPayments(this.getFirstPaymentId);
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
      this.isLoadingPayments = false;
    },
    async paginationNext() {
      try {
        this.isLoadingPayments = true;
        await this.fetchNextPayments(this.getLastPaymentId);
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
      this.isLoadingPayments = false;
    },
  },
  computed: {
    ...mapGetters("adminPanelStore/payments", [
      "getAllPaymentsTableSctructure",
      "getAllPaymentsTableSctructure",
      "getLastPaymentId",
      "getFirstPaymentId",
      "canFetchMore",
      "getPreviusLastPaymentId",
      "getprevHasMore",
      "getnextHasMore",
    ]),
  },
  watch: {},
  mounted() {
    this.paginationNext();
  },
};
</script>

<style></style>
