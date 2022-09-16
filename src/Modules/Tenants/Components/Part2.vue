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
      <button
        class="my-btn w-auto rounded-full py-1 px-5"
        @click="$emit('navigate', 'next')"
      >
        {{ $t("general.next") }}
      </button>
    </template>
    <template v-slot:content>
      <div class="p-4">
        <p class="font-semibold">
          <font-awesome-icon icon="file-contract" class="mr-1" />
          {{ $t("tenants.calendar.see") }}
        </p>
      </div>
    </template>
  </PartTemplateVue>
</template>

<script>
import PartTemplateVue from "./PartTemplate.vue";

export default {
  components: {
    PartTemplateVue,
  },
};
</script>

<style></style>
