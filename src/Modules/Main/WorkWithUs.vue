<template>
  <div class="mb-24 md:mb-0 w-full">
    <div class="my-container">
      <h2 class="my-title-2 mb-10">{{ $t("workWithus.title") }}</h2>

      <div class="w-full my-5">
        <p class="font-bold mb-4">{{ $t("workWithus.jobTitle") }}</p>
        <div
          class="w-full flex flex-col md:flex-row justify-between md:items-center"
        >
          <p>{{ $t("workWithus.jobDescription") }}</p>
          <button
            class="my-btn mt-4 font-semibold uppercase tracking-widest text-xl md:text-base md:w-auto px-4 py-2 rounded-md"
          >
            {{ $t("workWithus.postulate") }}
          </button>
        </div>
      </div>
      <hr />
      <div class="w-full my-5">
        <p class="font-bold mb-4">{{ $t("workWithus.jobTitle2") }}</p>
        <div
          class="w-full flex flex-col md:flex-row justify-between md:items-center"
        >
          <p>{{ $t("workWithus.jobDescription2") }}</p>
          <button
            class="my-btn mt-4 font-semibold uppercase tracking-widest text-xl md:text-base md:w-auto px-4 py-2 rounded-md"
          >
            {{ $t("workWithus.postulate") }}
          </button>
        </div>
      </div>
      <hr />
    </div>

    <div class="w-full bg-my-blue-primary py-16 text-white mt-28">
      <div class="my-container">
        <div class="w-full md:w-7/12 lg:w-6/12">
          <h2 class="my-title-2 mb-14">{{ $t("workWithus.earn") }}</h2>
          <p>{{ $t("workWithus.earnDescription") }}</p>

          <button
            class="my-btn w-full bg-white text-my-blue-primary mt-14 py-1 px-1 font-semibold rounded-md hidden md:block"
          >
            {{ $t("workWithus.button") }}
          </button>
          <button
            class="my-btn w-full bg-white text-my-blue-primary mt-14 py-1 px-1 font-semibold rounded-md md:hidden"
          >
            {{ $t("workWithus.buttonMovile") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
