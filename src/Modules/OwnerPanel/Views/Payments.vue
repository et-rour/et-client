<template>
  <div class="w-full">
    <h1 class="my-subtitle">{{ $t("admin.locations.payments.title") }}</h1>
    <table
      class="w-full flex flex-row flex-no-wrap xs:bg-white rounded-lg overflow-hidden my-5"
    >
      <tbody class="flex-1 xs:flex-none">
        <tr
          class="flex flex-col flex-no wrap xs:table-row mb-2 xs:mb-0 border-b"
        >
          <td
            class="border-grey-light border-b hover:bg-gray-100 p-3 text-center sm:text-left"
          >
            Diciembre
          </td>
          <td
            class="border-grey-light border-b hover:bg-gray-100 p-3 text-center sm:text-left truncate"
          >
            Dirección #1
          </td>
          <td
            class="border-grey-light border-b hover:bg-gray-100 p-3 text-center sm:text-left"
          >
            <p class="bg-blue-800 inline-block text-white p-1 px-3">$500.00</p>
          </td>
        </tr>
        <tr
          class="flex flex-col flex-no wrap xs:table-row mb-2 xs:mb-0 border-b"
        >
          <td
            class="border-grey-light border-b hover:bg-gray-100 p-3 text-center sm:text-left"
          >
            Noviembre
          </td>
          <td
            class="border-grey-light border-b hover:bg-gray-100 p-3 text-center sm:text-left truncate"
          >
            Dirección #2
          </td>
          <td
            class="border-grey-light border-b hover:bg-gray-100 p-3 text-center sm:text-left"
          >
            <p class="bg-blue-800 inline-block text-white p-1 px-3">$500.00</p>
          </td>
        </tr>
        <tr
          class="flex flex-col flex-no wrap xs:table-row mb-2 xs:mb-0 border-b"
        >
          <td
            class="border-grey-light border-b hover:bg-gray-100 p-3 text-center sm:text-left"
          >
            Octubre
          </td>
          <td
            class="border-grey-light border-b hover:bg-gray-100 p-3 text-center sm:text-left truncate"
          >
            Dirección #3
          </td>
          <td
            class="border-grey-light border-b hover:bg-gray-100 p-3 text-center sm:text-left"
          >
            <p class="bg-blue-800 inline-block text-white p-1 px-3">$500.00</p>
          </td>
        </tr>
        <tr
          class="flex flex-col flex-no wrap xs:table-row mb-2 xs:mb-0 border-b"
        >
          <td
            class="border-grey-light border-b hover:bg-gray-100 p-3 text-center sm:text-left"
          >
            Septiembre
          </td>
          <td
            class="border-grey-light border-b hover:bg-gray-100 p-3 text-center sm:text-left truncate"
          >
            Dirección #3
          </td>
          <td
            class="border-grey-light border-b hover:bg-gray-100 p-3 text-center sm:text-left"
          >
            <p class="bg-blue-800 inline-block text-white p-1 px-3">$500.00</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@media (min-width: 475px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

td:not(:last-child) {
  border-bottom: 0;
}

th:not(:last-child) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
</style>
