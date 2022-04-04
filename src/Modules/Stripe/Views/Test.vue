<template>
  <div class="my-container">
    <h1>Buy product</h1>
    <button class="my-btn" @click="buyProduct">BUY</button>
  </div>
</template>

<script>
import EspacioTemporalAPI from "@/Api/index.js";
export default {
  methods: {
    async buyProduct() {
      const res = await EspacioTemporalAPI.post(
        "/locations/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("%cTest.vue line:22 res", "color: #007acc;", res);
      // window.location.href = res.url;
      window.open(res.data.url, "_blank");
    },
  },
};
</script>

<style></style>
