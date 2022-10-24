<template>
  <PartTemplateVue>
    <template v-slot:title>
      <h3 class="font-black text-2xl my-5">
        {{ $t("tenants.calendar.Paso2") }}
      </h3>
      <!-- <pre>{{ JSON.stringify(user, null, "\t") }}</pre> -->
    </template>
    <template v-slot:button>
      <button
        class="my-btn w-auto rounded-full py-1 px-5 bg-gray-500 mr-4"
        @click="$emit('navigate', 'back')"
      >
        {{ $t("general.previus") }}
      </button>
      <button class="my-btn w-auto rounded-full py-1 px-5" @click="goNextPart" :disabled="formData.signature===''" :class="formData.signature===''&&'bg-opacity-50'">
        {{ $t("general.next") }}
      </button>
    </template>
    <template v-slot:content>
      <div class="p-4">
        <p class="font-semibold cursor-pointer mb-10" @click="seePDF">
          <font-awesome-icon icon="file-contract" class="mr-1" />
          {{ $t("tenants.calendar.see") }}
        </p>
        <button class="my-btn py-1 px-2 w-auto rounded-lg mb-4" @click="showModal = true">{{$t('tenants.calendar.changeContract')}}</button>

        <div>
          <input
            v-model="formData.signature"
            type="text"
            :placeholder="$t(`tenants.calendar.form.signature`)"
            class="my-input bg-white border-b border-black signature w-full uppercase"
          />
        </div>
      </div>
      <ModelGlobal :showModal="showModal">
        <div class="p-8 bg-white rounded-xl max-h-screen overflow-y-scroll">
          <ValidationObserver v-slot="{ handleSubmit, invalid }">
            <form
              @submit.prevent="handleSubmit(onSubmit)"
              class=""
              >
              <div class="grid grid-cols-2  gap-y-4 gap-x-8">
                <!-- company -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="relative"
                >
                  <label class="block">{{
                    $t("tenants.calendar.form.company")
                  }}</label>
                  <input
                    v-model="formData.company"
                    type="text"
                    class="my-input bg-gray-300 w-full"
                  />
                  <span class="my-error block relative top-0 left-0">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                
                <!-- identity -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="relative"
                >
                  <label class="block">{{
                    $t("tenants.calendar.form.identity")
                  }}</label>
                  <input
                    v-model="formData.identity"
                    type="text"
                    class="my-input bg-gray-300 w-full"
                  />
                  <span class="my-error block relative top-0 left-0">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
  
                <!-- location_usesr -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="relative"
                >
                  <label class="block">{{
                    $t("tenants.calendar.form.location_uses")
                  }}</label>
                  <textarea
                    class="my-input bg-gray-300 w-full h-20"
                    v-model="formData.location_uses"
                  ></textarea>
                  <span class="my-error block relative top-0 left-0">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                
                <!-- people_fix -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="relative"
                >
                  <label class="block">{{
                    $t("tenants.calendar.form.people_fix")
                  }}</label>
                  <input
                    v-model="formData.people_fix"
                    type="number"
                    min="0"
                    class="my-input bg-gray-300 w-full"
                  />
                  <span class="my-error block relative top-0 left-0">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                
                <!-- people_prox -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="relative"
                >
                  <label class="block">{{
                    $t("tenants.calendar.form.people_prox")
                  }}</label>
                  <input
                    v-model="formData.people_prox"
                    type="number"
                    min="0"
                    class="my-input bg-gray-300 w-full"
                  />
                  <span class="my-error block relative top-0 left-0">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                
                <!-- represent -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="relative"
                >
                  <label class="block">{{
                    $t("tenants.calendar.form.represent")
                  }}</label>
                  <input
                    v-model="formData.represent"
                    type="text"
                    class="my-input bg-gray-300 w-full"
                  />
                  <span class="my-error block relative top-0 left-0">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                
                <!-- rut -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="relative"
                >
                  <label class="block">{{
                    $t("tenants.calendar.form.rut")
                  }}</label>
                  <input
                    v-model="formData.rut"
                    type="text"
                    class="my-input bg-gray-300 w-full"
                  />
                  <span class="my-error block relative top-0 left-0">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                
                <!-- subContractor_email_1 -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|email"
                  class="relative"
                >
                  <label class="block">{{
                    $t("tenants.calendar.form.subContractor_email_1")
                  }}</label>
                  <input
                    v-model="formData.subContractor_email_1"
                    type="text"
                    class="my-input bg-gray-300 w-full"
                  />
                  <span class="my-error block relative top-0 left-0">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                
                <!-- subContractor_email_2 -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|email"
                  class="relative"
                >
                  <label class="block">{{
                    $t("tenants.calendar.form.subContractor_email_2")
                  }}</label>
                  <input
                    v-model="formData.subContractor_email_2"
                    type="text"
                    class="my-input bg-gray-300 w-full"
                  />
                  <span class="my-error block relative top-0 left-0">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
              </div>

              <div class="flex gap-2 justify-end">
                <button
                  class="my-btn w-auto px-2 py-1 rounded-md bg-red-600"
                  type="submit"
                  @click="$router.go(-1)"
                >
                  {{ $t("general.cancel") }}
                </button>
                <button
                  class="my-btn w-auto px-2 py-1 rounded-md"
                  type="submit"
                  :class="invalid ? ' bg-opacity-70' : ''"
                >
                  {{ didExtraDataChanged ?$t("general.update") :$t("general.continue")  }}
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </ModelGlobal>
    </template>
  </PartTemplateVue>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from "vuex";
import PartTemplateVue from "./PartTemplate.vue";
import { CustomErrorToast,CustomToast } from "@/sweetAlert";
import { ValidationObserver } from "vee-validate";

import moment from "moment";
import ModelGlobal from "../../../components/ModelGlobal.vue";
export default {
  props: ["calendarData"],
  components: {
    PartTemplateVue,
    ValidationObserver,
    ModelGlobal,
  },
  data() {
    return {
      showModal: true,
      formData: {
        company: "",
        identity: "",
        location_uses: "",
        people_fix: "0",
        people_prox: "0",
        represent: "",
        rut: "",
        subContractor_email_1: "",
        subContractor_email_2: "",
        signature: "",
      },
    };
  },
  methods: {
    ...mapMutations("propertiesStore/reservationStorage", ["changeSignature"]),
    ...mapActions("propertiesStore/reservationStorage", ["fetchContractPFD"]),
    ...mapActions("authStore", ["updateUserExtraData"]),
    onChangeSignature() {
      this.changeSignature(this.formData);
    },
    async onSubmit() {
      this.showModal = false;
      if (this.didExtraDataChanged) {
        try {
          await this.updateUserExtraData({
            companyName:this.formData.company,
            identityCard:this.formData.identity,
            representativeName:this.formData.represent,
            rut:this.formData.rut,
          })
          CustomToast.fire({
            title: this.$t("sweetAlertMessages.saved"),
            icon: "success",
          });
        } catch (error) {
          CustomErrorToast.fire({
            text: error.response.data.message || error,
          });
        }
      }
    },
    async goNextPart() {
      this.onChangeSignature();
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
            start: moment(this.reservationData.reservationDateRange.start).valueOf(),
            end: moment(this.reservationData.reservationDateRange.end).valueOf(),
          },
          ...this.formData,
        });

        const blob = new Blob([pdfData.data], { type: "application/pdf" });
        const objectUrl = window.URL.createObjectURL(blob);
        window.open(objectUrl);
      } catch (error) {
        console.log('%cerror Part2.vue line:306 ', 'color: red; display: block; width: 100%;', {error:error.response.data});
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    ...mapGetters("propertiesStore/reservationStorage", ["reservationData"]),
    didExtraDataChanged(){
    return (
        this.formData.company != this.user.user.companyName ||
        this.formData.identity != this.user.user.identityCard ||
        this.formData.represent != this.user.user.representativeName ||
        this.formData.rut != this.user.user.rut
      )  
    }
  },
  mounted(){
    this.formData.company = this.user.user.companyName
    this.formData.identity = this.user.user.identityCard
    this.formData.location_uses = this.calendarData.landUse
    this.formData.represent = this.user.user.representativeName
    this.formData.rut = this.user.user.rut
    this.formData.subContractor_email_1 = this.user.user.email
  }
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
