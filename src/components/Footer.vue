<template>
  <div
    class="w-full h-96 bg-gray-900 flex-col justify-center items-center text-white hidden md:flex"
  >
    <div class="w-9/12 grid grid-cols-3 grid-rows-2 px-20">
      <img src="@/assets/icons/logoFooter.png" alt="logotipo footer" />
      <ul>
        <li>FAQS</li>
        <li>{{ $t("footer.nav.owner") }}</li>
        <li>{{ $t("footer.nav.tenants") }}</li>
        <li>{{ $t("footer.nav.howWorks") }}</li>
        <li>{{ $t("footer.nav.us") }}</li>
        <li>{{ $t("footer.nav.terms") }}</li>
        <select v-model="$i18n.locale" class="w-full text-black">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
            {{ lang }}
          </option>
        </select>
      </ul>
      <div class="row-start-2 col-start-1 col-end-4 flex flex-col border-b">
        <p>{{ $t("footer.form.Contact") }}</p>
        <div class="w-full grid grid-cols-3 gap-8">
          <div class="flex gap-2 flex-col">
            <input
              type="text"
              class="my-input text-black"
              :placeholder="$t('footer.form.name')"
            />
            <input
              type="text"
              class="my-input text-black"
              :placeholder="$t('footer.form.email')"
            />
          </div>
          <div>
            <textarea
              name=""
              cols="30"
              class="my-input text-black h-full p-1"
              :placeholder="$t('footer.form.message')"
            ></textarea>
          </div>
          <div>
            <h2 class="text-4xl font-bold text-center">CAPTCHA</h2>
          </div>
        </div>
        <button
          class="border border-white text-white py-1 px-12 my-2 rounded-md self-end"
        >
          {{ $t("footer.form.send") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { langs: ["es", "en"] };
  },
};
</script>

<style></style>
