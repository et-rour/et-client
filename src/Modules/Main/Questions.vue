<template>
  <div class="my-container mb-40 md:mb-0">
    <h2 class="my-title mb-8 text-center md:text-left">
      {{ $t("questions.title") }}
    </h2>

    <div class="flex flex-col gap-4">
      <p class="text-xl font-bold">{{ $t("questions.question1") }}</p>
      <p>{{ $t("questions.response1") }}</p>
      <p class="text-xl font-bold">{{ $t("questions.question2") }}</p>
      <p>{{ $t("questions.response2") }}</p>
      <p class="text-xl font-bold">{{ $t("questions.question3") }}</p>
      <p>{{ $t("questions.response3") }}</p>
    </div>

    <hr class="my-14" />

    <form class="w-full sm:w-11/12 md:w-4/6 lg:w-3/6 mx-auto md:mx-0 mb-10">
      <h3 class="my-title mb-8 text-center md:text-left">
        {{ $t("questions.help") }}
      </h3>

      <div class="my-3 flex items-center w-full md:w-2/3">
        <label for="name" class="mr-4 w-20 inline-block">{{
          $t("questions.name")
        }}</label>
        <input type="text" class="my-input bg-gray-300 flex-grow" />
      </div>
      <div class="my-3 flex items-center w-full md:w-2/3">
        <label for="email" class="mr-4 w-20 inline-block">{{
          $t("questions.email")
        }}</label>
        <input type="email" class="my-input bg-gray-300 flex-grow" />
      </div>
      <div class="my-3 flex items-start w-full">
        <label for="message" class="mr-4 w-20 inline-block">{{
          $t("questions.message")
        }}</label>
        <textarea
          type="text"
          class="my-input bg-gray-300 flex-grow h-28"
        ></textarea>
      </div>
      <div class="w-full flex justify-between">
        <p class="w-20 mr-4"></p>
        <button
          class="my-btn py-1 flex-grow lg:flex-grow-0 lg:w-auto rounded-md px-8 uppercase"
        >
          {{ $t("questions.send") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
