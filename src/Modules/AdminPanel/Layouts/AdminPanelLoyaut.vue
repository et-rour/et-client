<template>
  <div class="my-container">
    <h1 class="my-title">{{ $t("adminPanel.title") }}</h1>

    <ul class="flex justify-center items-center gap-4">
      <li>
        <router-link :to="{ name: 'admin-users' }">{{
          $t("adminPanel.navbar.users")
        }}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'admin-zones' }">{{
          $t("adminPanel.navbar.zones")
        }}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'admin-locations' }">{{
          $t("adminPanel.navbar.locations")
        }}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'admin-cuartos' }">{{
          $t("adminPanel.navbar.rooms")
        }}</router-link>
      </li>
    </ul>

    <div class="w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
