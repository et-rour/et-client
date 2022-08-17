<template>
  <div class="mb-24 md:mb-0 w-full">
    <div class="my-container hero-main rounded-3xl overflow-hidden relative">
      <img
        src="@/assets/images/OrgEspacioTemporal.jpeg"
        alt="Hero image"
        class="w-full h-full object-cover"
      />

      <!-- MASK -->
      <div
        class="w-full h-full absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-b-3xl mask"
      ></div>
    </div>

    <div class="my-container my-5 text-center mx-auto">
      <h2 class="my-title-2">{{ $t("about-us.who") }}</h2>
      <p class="lg:w-6/12 inline-block">{{ $t("about-us.description") }}</p>

      <div class="w-full flex justify-center flex-wrap gap-4 my-20">
        <div
          class="w-48 flex flex-col items-center"
          v-for="person in listPersons"
          :key="person.id"
        >
          <img
            src="@/assets/icons/circle-user.png"
            alt="user-circle"
            class="w-24 h-24 object-cover"
          />
          <p class="font-bold mt-2">{{ person.name }}</p>
          <p>{{ person.charge }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listPersons: [
        {
          id: 1,
          image: "",
          name: "Valentin Soto",
          charge: "Fundador",
        },
        {
          id: 2,
          image: "",
          name: "Nombre",
          charge: "Cargo",
        },
        {
          id: 3,
          image: "",
          name: "Nombre",
          charge: "Cargo",
        },
        {
          id: 4,
          image: "",
          name: "Nombre",
          charge: "Cargo",
        },
        {
          id: 5,
          image: "",
          name: "Nombre",
          charge: "Cargo",
        },
        {
          id: 6,
          image: "",
          name: "Nombre",
          charge: "Cargo",
        },
        {
          id: 7,
          image: "",
          name: "Nombre",
          charge: "Cargo",
        },
        {
          id: 8,
          image: "",
          name: "Nombre",
          charge: "Cargo",
        },
      ],
    };
  },
};
</script>

<style></style>
