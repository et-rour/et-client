<template>
  <PartTemplateVue>
    <template v-slot:title>
      <h3 class="font-black text-2xl my-5">
        {{ $t("tenants.calendar.Paso2") }}
      </h3>
    </template>
    <template v-slot:button>
      <button
        class="my-btn w-auto rounded-full py-1 px-5 bg-gray-500 mr-4"
        @click="$emit('navigate', 'back')"
      >
        {{ $t("general.previus") }}
      </button>
      <button class="my-btn w-auto rounded-full py-1 px-5" @click="goNextPart">
        {{ $t("general.next") }}
      </button>
    </template>
    <template v-slot:content>
      <div class="p-4">
        <p class="font-semibold cursor-pointer" @click="seePDF">
          <font-awesome-icon icon="file-contract" class="mr-1" />
          {{ $t("tenants.calendar.see") }}
        </p>
        <input
          type="text"
          v-model="signature"
          placeholder="Firma aqui"
          class="signature my-8 w-full"
          @change="onChangeSignature"
        />
      </div>
    </template>
  </PartTemplateVue>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import PartTemplateVue from "./PartTemplate.vue";
import { CustomErrorToast, CustomConfirmWarningDialog } from "@/sweetAlert";
import moment from "moment";
export default {
  components: {
    PartTemplateVue,
  },
  data() {
    return {
      signature: "",
    };
  },
  methods: {
    ...mapMutations("propertiesStore/reservationStorage", ["changeSignature"]),
    ...mapActions("propertiesStore/reservationStorage", ["fetchContractPFD"]),
    onChangeSignature() {
      this.changeSignature(this.signature);
    },
    async goNextPart() {
      if (this.signature.trim().length === 0) {
        await CustomConfirmWarningDialog.fire({
          text: this.$t("tenants.details.signatureValidationMessage"),
        });
        return;
      }
      this.$emit("navigate", "next");
      return;
    },
    async seePDF() {
      const { idRoom, id } = this.$route.params;

      try {
        const pdfData = await this.fetchContractPFD({
          locationId: id,
          roomId: idRoom,
          range: {
            start: moment(this.reservationData.start).valueOf(),
            end: moment(this.reservationData.end).valueOf(),
          },
        });

        console.log("Success", pdfData.data);
        const blob = new Blob([pdfData.data], { type: "application/pdf" });
        const objectUrl = window.URL.createObjectURL(blob);
        window.open(objectUrl);
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    ...mapGetters("propertiesStore/reservationStorage", ["reservationData"]),
  },
};
</script>

<style scoped>
.signature {
  font-family: "Rock Salt", cursive;
  border: none;
  border-bottom: 1px solid rgb(231, 231, 231);
}
signature:focus,
input:focus {
  outline: none;
}
</style>
