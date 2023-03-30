<template>
  <div class="w-full">
    <h1 class="my-title-2">{{ $t("admin.payments.title") }}</h1>

    <PaymentsTable />
    <!-- <div class="flex flex-col" v-else>
      <div
        v-for="(payment, index) in paymentsList"
        :key="`payment_${index}`"
        class="border shadow-xl qw"
      >
        <pre>{{ JSON.stringify(payment.id, null, "\t") }}</pre>
        <pre>{{ JSON.stringify(payment.amount, null, "\t") }}</pre>
        <pre>{{ JSON.stringify(payment.currency, null, "\t") }}</pre>
        <pre>{{ JSON.stringify(payment.charges, null, "\t") }}</pre>
        <pre>{{ JSON.stringify(payment.created, null, "\t") }}</pre>
        <pre>{{ JSON.stringify(payment.status, null, "\t") }}</pre>
      </div>
    </div>
    <pre>{{ JSON.stringify(paymentsList, null, "\t") }}</pre> -->
  </div>
</template>

<script>
import PaymentsTable from "@/components/PaymentsTable.vue";

export default {
  components: { PaymentsTable },
  data() {
    return {
      isLoadingpaymentsList: false,
      paymentsList: [],
    };
  },
  methods: {},
  mounted() {},
};
</script>
